<template>
  <div>
    <div class="label">Command Line</div>
    <el-input :readonly="true" v-model="commandLine"></el-input>
    <div class="label">Executable Path</div>
    <el-input v-model="execPath"></el-input>
    <div class="label">Available Inputs ({{inputPath}}) </div>
    <file-list :path="inputPath" @folder-selected="inputFolderSelected" @state-changed="inputChanged"></file-list>

    <div class="label">Existing Outputs ({{outputPath}}) </div>
    <file-list-with-add :path="outputPath" @folder-selected="outputFolderSelected" @state-changed="outputChanged"></file-list-with-add>
    <process-manager :execPath="commandLine" :allowLaunch="allowLaunch" @process-started="processStarted" @process-ended="processEnded"></process-manager>
  </div>
</template>

<script>
import FileList from "@/components/FileList/FileList.vue";
import FileListWithAdd from "@/components/FileList/FileListWithAdd.vue";
import ProcessManager from "@/components/process-manager/ProcessManager.vue";

const path = require("path");

export default {
  props: ["id", "path"],
    
  data() {
    return {
      inputPath: path.join(this.path, "modelling"),
      outputPath: path.join(this.path, "generation"),
      execPath: "C:\\Simulation_Orchestrator.exe",

      // The status of this tab
      // enabled: it means the component in this tab has enough inputs to be launched
      // running: it means the component has been launched and is still running 
      status: {
        enabled: true,
        done: false,
        running: false
      },

      // A helper variable to indicate if a process is running
      isProcessRunning: false,

      // It holds all the available input folders
      inputFolders: [],

      // It holds all the available output folders
      outputFolders: [],

      // The following are variables that are required for formulating the execution command line
      selectedInputFolder: null,
      selectedOutputFolder: null
    };
  },
  components: {
    FileList: FileList,
    FileListWithAdd: FileListWithAdd,
    ProcessManager: ProcessManager
  },
  methods: {
    inputChanged: function(folders) {
      this.inputFolders = folders;
      this.updateStatus();
    },

    outputChanged: function(folders) {
      this.outputFolders = folders;
      this.updateStatus();
    },

    processStarted: function() {
      this.isProcessRunning = true;
      this.updateStatus();
    },

    processEnded: function() {
      this.isProcessRunning = false;
      this.updateStatus();
    },

    inputFolderSelected: function(folder) {
      this.selectedInputFolder = folder;
    },

    outputFolderSelected: function(folder) {
      this.selectedOutputFolder = folder;
    },

    updateStatus: function() {
      // Update status and emit event to parent
      this.status.done = false;
      for (var i in this.outputFolders) {
        console.log(this.outputFolders[i].empty);
        if (!this.outputFolders[i].empty) {
          this.status.done = true;
          break;
        } 
      }

      this.status.enabled = false;
      for (var i in this.inputFolders) {
        console.log(this.inputFolders[i].empty);
        if (!this.inputFolders[i].empty) {
          this.status.enabled = true;
          break;
        } 
      }

      this.status.running = this.isProcessRunning;
      this.$emit("status-changed", this.id, this.status);
    },

  },

  computed: {
    commandLine: function(){
      var command = "";
      command += this.execPath;
      if(this.selectedInputFolder) command += " --src " + this.selectedInputFolder.name;
      if(this.selectedOutputFolder) command += " --target " + this.selectedOutputFolder.name;
      return command;
    },

    allowLaunch: function() {
      return this.selectedInputFolder && this.selectedOutputFolder ? false : true;
    }
  }
};
</script>

<style lang="scss" scoped>
.label {
  margin: 30px 0 10px 0;
}

.label:first-of-type {
  margin-top: 0px;
}

</style>
