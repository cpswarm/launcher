<template>
  <div>
    <div class="label">Executable Path</div>
    <el-input v-model="execPath"></el-input>
    <div class="label">Available Inputs ({{inputPath}}) </div>
    <file-list :path="inputPath" @folder-selected="folderSelected" @state-changed="inputChanged" @error="emitError"></file-list>
  </div>
</template>

<script>
// import FileList from "@/components/FileList/FileList.vue";
import FileList from '@/components/FileList/FileListWithAdd.vue'
const path = require('path')

export default {
  props: ['path'],

  data () {
    return {
      inputPath: path.join(this.path, 'modelling'),
      execPath: 'C:\\Monitoring.exe',

      // The status of this tab
      // enabled: it means the component in this tab has enough inputs to be launched
      // running: it means the component has been launched and is still running
      status: {
        enabled: true,
        done: false,
        allowLaunch: false,
        commandLine: ''
      },

      // It holds all the available input folders
      inputFolders: [],

      // The following are variables that are required for formulating the execution command line
      selectedInputFolder: null
    }
  },
  components: {
    FileList: FileList
  },
  methods: {
    inputChanged: function (folders) {
      this.inputFolders = folders
      this.emitStatus()
    },

    folderSelected: function (folder) {
      this.selectedInputFolder = folder
      this.emitStatus()
    },

    emitStatus: function () {
      // Update status and emit event to parent
      this.status.done = false
      for (var i in this.inputFolders) {
        if (!this.inputFolders[i].empty) {
          this.status.done = true
          break
        }
      }
      this.status.enabled = true // Always true
      this.status.allowLaunch = !!this.selectedInputFolder
      this.status.commandLine = this.getCommandLine()
      this.$emit('status-changed', this.status)
    },

    emitError: function (err) {
      this.$emit('error', err)
    },

    getCommandLine: function () {
      var command = ''
      command += this.execPath
      if (this.selectedInputFolder) {
        command += ' --src ' + this.selectedInputFolder.name
      }
      return command
    }
  }
}
</script>

<style lang="scss" scoped>
.label {
  margin: 30px 0 10px 0;
}

</style>
