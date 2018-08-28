<template>
  <div class="folder-container">
    
    
    <table>
      <tr v-for="(stat, fileName) in folders" v-bind:key="fileName" v-bind:class="['folder', { selected: selectedFiles[stat.path] === stat }]">
        <td class="cell name" @click="selectFolder(stat)">
          <img v-show="stat.type === 'dir' && !stat.valid" src="@/assets/empty-folder.png">
          <img v-show="stat.type === 'dir' && stat.valid" src="@/assets/non-empty-folder.png">
          <img v-show="stat.type === 'file'" src="@/assets/file.png">
          <div class="text">{{fileName}}</div>
        </td>
        <td class="cell actions">
          <action-menu class="action-menu" :name="fileName" :path="path" @delete-folder="deleteFolder" @rename-folder="renameFolder" @open-explorer="openExplorer"></action-menu>
        </td>
      </tr>
    </table>
    <div class="empty-indicator" v-show="isNoFiles"><img src="@/assets/empty.png"><span class="text">Empty Content...</span></div>
  </div>
</template>

<script>
import fw from '@/components/widgets/FileList/FileWatcher.js'
import ActionMenu from '@/components/widgets/FileList/ActionMenu.vue'

const rimraf = require('rimraf')
const events = require('events')
const path = require('path')
const { shell } = require('electron')
const fs = require('fs')

export default {
  // TODO: think whether it is necessary to propagate folder-deleted
  // This component emits three events:
  // 1. state-changed: when changes are detected in the watch dir; args: list of available folders after change
  // 2. folder-selected: when a folder is selected; args: the complete path of the selected folder
  // 3. folder-deleted; args: the complete path of the selected folder

  // This component receives 1 prop:
  // 1. path: the dir path to watch
  // 2. properties: an object, which contains the following properties:
  //    1) watchDir: boolean, whether to watch directory, default is true
  //    2) watchFile: boolean, whether to watch files, default is false
  //    3) multiSelect: boolean, whether to allow multiple selection, default is false
  props: ['path', 'enabled', 'watchDir', 'watchFile', 'multiSelect'],
  data () {
    // Determine the types of file (file/dir) to watch
    // Default is to watch dirs but not files
    var watchTypes = []
    if (typeof this.watchDir === 'undefined') {
      watchTypes.push('dir')
    } else {
      if (this.watchDir) watchTypes.push('dir')
    }

    if (typeof this.watchFile !== 'undefined') {
      if (this.watchFile) watchTypes.push('file')
    }

    var eventEmitter = new events.EventEmitter()
    // Initiallize watcher
    var fileWatcher = fw(eventEmitter, watchTypes)
    
    // Catch file change event
    eventEmitter.on('file', folders => {
      // Update file list
      this.folders = folders
      // Emit event
      var availableFilesArr = []
      for (let key in this.folders) {
        availableFilesArr.push(this.folders[key])
      }
      this.$emit('state-changed', availableFilesArr)
    })
    eventEmitter.on('error', err => {
      this.emitError(err)
    })

    // Start watching
    fileWatcher.watch(this.path)

    return {
      // The data field contain data local to one tab,
      // such as the currently selected input, etc.
      selectedFiles: {},
      fileWatcher: fileWatcher,
      folders: []
    }
  },

  components: {
    ActionMenu: ActionMenu
  },

  methods: {
    selectFolder: function (fileStat) {
      if (!fileStat) {
        this.selectedFiles = {}
      } else {
        if (this.selectedFiles[fileStat.path]) {
          // Must use this.$delete to force update on list
          this.$delete(this.selectedFiles, fileStat.path)
        } else {
          if (this.multiSelect) {
            // Must use this.$delete to force update on list
            this.$set(this.selectedFiles, fileStat.path, fileStat)
          } else {
            this.selectedFiles = {}
            this.selectedFiles[fileStat.path] = fileStat
          }
        }
      }
      // TODO: whether to expose an object or an array?
      var selectedFilesArr = []
      for (let key in this.selectedFiles) {
        selectedFilesArr.push(this.selectedFiles[key])
      }
      this.$emit('folder-selected', selectedFilesArr)
    },

    deleteFolder: function (folder) {
      this.$confirm(
        'This will delete the folder and all of its content. Continue?',
        'Warning',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }
      )
        .then(() => {
          var folderPath = path.join(this.path, folder)
          rimraf(folderPath, err => {
            if (err) {
              // Emit error message
              this.emitError(err)
              return
            }
            this.selectFolder(null)
            this.$emit('folder-deleted', folderPath)
            this.$message({
              type: 'success',
              message: 'Folder ' + folderPath + ' deleted'
            })
          })
        })
        .catch(() => {})
    },

    renameFolder: function (folder) {
      var originalFolderPath = path.join(this.path, folder)
      // TODO: implement the renaming
      this.$prompt('Original Name: ' + folder, 'Rename Folder', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        inputErrorMessage: 'Invalid Folder Name'
      })
        .then(value => {
          fs.rename(
            originalFolderPath,
            path.join(this.path, value.value),
            err => {
              if (err) {
                // Emit error message
                this.emitError(err)
                return
              }
              this.selectFolder(null)
              this.$message({
                type: 'success',
                message: 'Folder rename successful!'
              })
            }
          )
        })
        .catch(() => {})
    },

    openExplorer: function (folder) {
      var folderPath = path.join(this.path, folder)
      var success = shell.showItemInFolder(folderPath)
      if (!success) {
        this.emitError('Unable to open folder in file explorer.')
      }
    },

    emitError: function (err) {
      this.$emit('error', err)
    }
  },

  watch: {
    path: function (newPath, oldPath) {
      if (newPath === oldPath) {
        return
      }
      this.fileWatcher.unwatch()
      this.fileWatcher.watch(newPath)
    }
  },

  computed: {
    isNoFiles: function () {
      return Object.keys(this.folders).length === 0
    }
  }
}
</script>

<style lang="scss" scoped>
.folder-container {
  position: relative;
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: white;
    opacity: 0.5;
    z-index: 1;
  }

  .path-indicator {
    font-size: 0.9em;
    margin-bottom: 5px;
    color: #555555;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    color: #555555;
    .folder {

      &.selected {
        color: black;
        background-color: #f0f0f0;
      }

      &:hover {
        background-color: #eeeeee;
      }

      .cell {
        height: 2em;
        vertical-align: middle;
        border-bottom: 1px solid #ddd;
        border-top: 1px solid #ddd;

        &.name {
          width: 93%;
          img {
            height: 1.4em;
            display: inline-block;
            vertical-align: middle;
            margin: 0 10px;
          }
          .text {
            display: inline-block;
            vertical-align: middle;
          }
        }

        &.actions {
          width: 7%;
          text-align: right;
          .action-menu {
            cursor: pointer;
            margin: 0 10px;
          }
        }
      }
    }
  }

  .empty-indicator {
    img {
      height: 1.2em;
      display: inline-block;
      vertical-align: middle;
      margin: 0 10px;
    }
    .text {
      vertical-align: middle;
      color: #555555;
    }
  }
}
</style>
