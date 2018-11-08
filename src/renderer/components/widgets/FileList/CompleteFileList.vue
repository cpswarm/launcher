<template>
  <div class="container">
    <div class="overlay" v-show="!isEnabled"></div>
    <div class="path-indicator">{{path}}</div>
    <add-file-box class="add-file-box" v-if="listProperties.allowAdd" :path="path" @error="emitError"></add-file-box>
    <file-list class="file-list" :path="path" :enabled="isEnabled" @state-changed="stateChanged" :watchFile="listProperties.watchFile" :watchDir="listProperties.watchDir" :multiSelect="listProperties.multiSelect" @folder-selected="folderSelected" @error="emitError"></file-list>
    <el-button title="Execute command against selected file" class="exec-btn" v-if="listProperties.execCommand" type="primary" size="medium" :disabled="!isEnabled" @click="exec">Send Task</el-button>
  </div>
</template>

<script>
import FileList from '@/components/widgets/FileList/FileList.vue'
import AddFileBox from '@/components/widgets/FileList/AddFileBox.vue'
const fs = require('fs')
const path = require('path')
const { spawn } = require("child_process");

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
  props: ['path', 'properties', 'varId', 'tabId'],
  data () {
    // Default values for properties
    var properties = {
      allowAdd: false,
      watchDir: true,
      watchFile: false,
      multiSelect: false,
      execCommand: null
    }

    if (this.properties) {
      for (let key in this.properties) {
        properties[key] = this.properties[key]
      }
    }

    return {
      listProperties: properties,
      newFolder: null,
      errMsg: '',
      command: ''
    }
  },
  components: {
    FileList: FileList,
    AddFileBox: AddFileBox
  },
  methods: {
    stateChanged: function (folders) {
      var prevState = this.$store.state[this.tabId]['vars'][this.varId] || {}
      prevState.files = folders
      this.$store.commit('updateVar', {tabId: this.tabId, varId: this.varId, value: prevState})
    },

    folderSelected: function (folder) {
      var prevState = this.$store.state[this.tabId]['vars'][this.varId] || {}
      prevState.selectedFile = folder
      this.$store.commit('updateVar', {tabId: this.tabId, varId: this.varId, value: prevState})
      if (this.listProperties.execCommand) {
        this.command = this.listProperties.execCommand(folder[0].path)
        console.log(this.command)
      }
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

    exec: function() {
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

    clearError: function () {
      this.errMsg = ''
    },

    emitError: function (err) {
      this.$emit('error', err)
    }
  },

  computed: {
    isEnabled: function () {
      return this.$store.getters.getWidgetEnabled(this.tabId, this.varId)
    },

    isVisible: function () {
      return this.$store.getters.getWidgetVisible(this.tabId, this.varId)
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
