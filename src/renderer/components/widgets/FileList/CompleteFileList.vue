<template>
  <div class="container">
    <div class="overlay" v-show="!enabled"></div>
    <div class="path-indicator">{{listProperties.watchPath}}</div>
    <add-file-box class="add-file-box" v-if="listProperties.allowAdd" :path="listProperties.watchPath" @error="emitError"></add-file-box>
    <file-list class="file-list" :path="listProperties.watchPath" :enabled="enabled" @state-changed="stateChanged" :watchFile="listProperties.watchFile" :watchDir="listProperties.watchDir" :multiSelect="listProperties.multiSelect" @folder-selected="folderSelected" @error="emitError"></file-list>
    <el-button title="Execute command against selected file" class="exec-btn" v-if="listProperties.execCommand" type="primary" size="medium" :disabled="!enabled" @click="exec">Send Task</el-button>
  </div>
</template>

<script>
import FileList from '@/components/widgets/FileList/FileList.vue'
import AddFileBox from '@/components/widgets/FileList/AddFileBox.vue'
const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process');

export default {
  // TODO: update this comment
  // This component emits the three events of FileList and an extra one:
  // 1. folder-created: when a new folder is created with this component; args: the complete path of the newly created folder

  // This component receives 1 prop:
  // 1. path: the dir path to watch
  // 2. properties: an object, which contains the following properties:
  //    1) watchDir: boolean, whether to watch directory, default is true
  //    2) watchFile: boolean, whether to watch files, default is false
  //    3) allowAdd: boolean, whether to allow creating new files on this widget
  //    4) multiSelect: boolean, whether to allow multiple selection, default is false
  props: ['rootPath', 'properties', 'enabled'],
  data() {
    // Default values for properties
    var {
      watchPath = '',
      allowAdd = false,
      watchDir = true,
      watchFile = false,
      multiSelect = false,
      execCommand = null
    } = this.properties

    watchPath = path.join(this.rootPath, watchPath)

    return {
      listProperties: { watchPath, allowAdd, watchDir, watchFile, multiSelect, execCommand },
      newFolder: null,
      errMsg: '',
      command: '',
      files: [],
      selectedFile: []
    }
  },
  components: {
    FileList: FileList,
    AddFileBox: AddFileBox
  },
  methods: {
    stateChanged(files) {
      this.files = files
      var state = { files: files, selectedFile: this.selectedFile }
      this.$emit('change', state)
    },

    folderSelected(file) {
      this.selectedFile = file
      var state = { files: this.files, selectedFile: file }
      this.$emit('change', state)
      if (this.listProperties.execCommand) {
        this.command = this.listProperties.execCommand(folder[0].path)
        console.log(this.command)
      }
    },

    createFolder() {
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

    exec() {
      if (!this.command) {
        this.emitError('No file selected yet.');
        return
      }
      const sp = spawn(this.command, {
        shell: true,
        detached: true,
        stdio: "pipe"
      });

      if (sp.stderr) {
        sp.stderr.on("data", data => {
          console.log("error")
          this.emitError(data.toString());
        });
      }
    },

    clearError() {
      this.errMsg = ''
    },

    emitError(err) {
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

  .path-indicator {
    margin-bottom: 5px;
    color: #888888;
    font-size: 0.9em;
  }

  .add-file-box {
    margin-top: 15px;
  }

  .exec-btn {
    margin-top: 15px;
  }
}
</style>
