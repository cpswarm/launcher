<template>
  <div class="container">
    <div class="overlay" v-show="!enabled"></div>
    <file-list class="file-list" :path="path" :enabled="enabled" @state-changed="stateChanged" :watchFile="listProperties.watchFile" :watchDir="listProperties.watchDir" :multiSelect="listProperties.multiSelect" @folder-selected="folderSelected" @folder-deleted="folderDeleted" @error="emitError"></file-list>
    <add-file-box class="add-file-box" v-if="listProperties.allowAdd" :path="path" @error="emitError"></add-file-box>
  </div>
</template>

<script>
import FileList from '@/components/widgets/FileList/FileList.vue'
import AddFileBox from '@/components/widgets/FileList/AddFileBox.vue'
const fs = require('fs')
const path = require('path')

export default {
  // This component emits the three events of FileList and an extra one:
  // 1. folder-created: when a new folder is created with this component; args: the complete path of the newly created folder

  // This component receives 1 prop:
  // 1. path: the dir path to watch
  // 2. properties: an object, which contains the following properties:
  //    1) watchDir: boolean, whether to watch directory, default is true
  //    2) watchFile: boolean, whether to watch files, default is false
  //    3) allowAdd: boolean, whether to allow creating new files on this widget
  //    4) multiSelect: boolean, whether to allow multiple selection, default is false
  props: ['path', 'enabled', 'properties'],
  data () {
    // Default values for properties
    var properties = {
      allowAdd: false,
      watchDir: true,
      watchFile: false,
      multiSelect: false
    }

    if (this.properties) {
      for (let key in this.properties) {
        properties[key] = this.properties[key]
      }
    }

    return {
      listProperties: properties,
      newFolder: null,
      errMsg: ''
    }
  },
  components: {
    FileList: FileList,
    AddFileBox: AddFileBox
  },
  methods: {
    stateChanged: function (folders) {
      this.$emit('state-changed', folders)
    },

    folderSelected: function (folder) {
      this.$emit('folder-selected', folder)
    },

    folderDeleted: function (folder) {
      this.$emit('folder-deleted', folder)
    },

    createFolder: function () {
      if (!this.newFolder) {
        this.errMsg = "Folder name can't be empty!"
        return
      }

      var newFolderPath = path.join(this.path, this.newFolder)
      if (fs.existsSync(newFolderPath)) {
        this.errMsg = 'Folder already exists!'
        return
      }

      fs.mkdir(newFolderPath, err => {
        if (err) {
          this.errMsg =
            'Error while creating folder in path ' +
            newFolderPath +
            ', cause: ' +
            err
          return
        }
        this.errMsg = ''
        this.newFolder = null
        this.$emit('folder-created', newFolderPath)
      })
    },

    clearError: function () {
      this.errMsg = ''
    },

    emitError: function (err) {
      this.$emit('error', err)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
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

  .add-file-box {
    margin-top: 15px;
  }
}
</style>
