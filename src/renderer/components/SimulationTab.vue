<template>
  <div>
    <div class="label">Command Line</div>
    <el-input :readonly="true" v-model="commandLine"></el-input>
    <div class="label">Available Inputs ({{inputPath}}) </div>
    <file-list :path="inputPath" @folder-selected="inputFolderSelected"></file-list>

    <div class="label">Existing Outputs ({{outputPath}}) </div>
    <file-list-with-add :path="outputPath" @folder-selected="outputFolderSelected"></file-list-with-add>
  </div>
</template>

<script>
import FileList from "@/components/FileList/FileList.vue";
import FileListWithAdd from "@/components/FileList/FileListWithAdd.vue";

const path = require("path");

export default {
  props: ["path"],
    
  data() {
    return {
      inputPath: path.join(this.path, "modelling"),
      outputPath: path.join(this.path, "simulation"),
      execPath: "C:\\Simulation_Orchestrator.exe",

      // The following are variables that are required for formulating the execution command line
      inputFolder: null,
      outputFolder: null
    };
  },
  components: {
    FileList: FileList,
    FileListWithAdd: FileListWithAdd
  },
  methods: {
    stateChanged: function(folders) {
      console.log("get event state changed!");
    },

    inputFolderSelected: function(folder) {
      this.inputFolder = folder;
    },

    outputFolderSelected: function(folder) {
      this.outputFolder = folder;
    },

    folderCreated: function(folder) {
      console.log("get event folder created");
    },
  },

  computed: {
    commandLine: function(){
      var command = "";
      command += this.execPath;
      if(this.inputFolder) command += " --src " + this.inputFolder.name;
      if(this.outputFolder) command += " --target " + this.outputFolder.name;
      return command;
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
