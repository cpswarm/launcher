<template>
  <div>
    <div class="label">Command Line</div>
    <el-input :readonly="true" v-model="commandLine"></el-input>
    <div class="label">Executable Path</div>
    <el-input v-model="execPath"></el-input>
    <div class="label">Available Inputs ({{inputPath}}) </div>
    <file-list :path="inputPath" @folder-selected="folderSelected" @state-changed="inputChanged" @error="handleError"></file-list>
    <process-manager :execPath="commandLine" :allowLaunch="allowLaunch" @process-started="processStarted" @process-ended="processEnded"></process-manager>
  </div>
</template>

<script>
//import FileList from "@/components/FileList/FileList.vue";
import FileList from "@/components/FileList/FileListWithAdd.vue";
import ProcessManager from "@/components/process-manager/ProcessManager.vue";

const path = require("path");

export default {
  props: ["id","path"],

  data() {
    return {
      inputPath: path.join(this.path, "generation"),
      execPath: "C:\\Modelio.exe",

      // The status of this tab
      // enabled: it means the component in this tab has enough inputs to be launched
      // running: it means the component has been launched and is still running 
      status: {
        enabled: true,
        done: false,
        running: false
      },

      isProcessRunning: false,

      // It holds all the available input folders
      inputFolders: [],

      // The following are variables that are required for formulating the execution command line
      selectedInputFolder: null
    };
  },
  components: {
    FileList: FileList,
    ProcessManager: ProcessManager
  },
  methods: {
    inputChanged: function(folders) {
      this.inputFolders = folders;
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

    folderSelected: function(folder) {
      this.selectedInputFolder = folder;
    },

    updateStatus: function() {
      // Update status and emit event to parent
      this.status.done = false;
      this.status.enabled = false;
      for (var i in this.inputFolders) {
        if (!this.inputFolders[i].empty) {
          this.status.enabled = true;
          break;
        } 
      }
      this.status.running = this.isProcessRunning;
      this.$emit("status-changed", this.id, this.status);
    },

    handleError: function(err) {
      console.log("got error");
        this.$notify.error({
          title: 'Error',
          message: err.toString()
        });
    }
  },
  computed: {
    commandLine: function() {
      var command = "";
      command += this.execPath;
      if (this.selectedInputFolder) {
        command += " --src " + this.selectedInputFolder.name;
        if (this.selectedInputFolder.empty) {
          command += " --create-project";
        }
      }
      return command;
    },

    allowLaunch: function() {
      return this.selectedInputFolder ? false : true;
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
