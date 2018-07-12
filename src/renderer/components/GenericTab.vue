<template>
  <div>
    <div class="label">Executable Path</div>
    <el-input v-model="realExecPath">
      <el-button slot="append" icon="el-icon-search" v-on:click="openFileDialog()"></el-button>
    </el-input>

    <div class="label">Available Inputs ({{path + "\\" + inputPath}}) </div>
    <div class="folder-container">
      <div v-for="folder in input" v-bind:key="folder.name" v-bind:class="['folder', { selected: selectedInput === folder.name }]" @click="selectFolder(folder.name)">{{folder.name}}</div>
    </div>
    <div class="btn-container">
      <el-button type="primary" @click="launch()">Launch</el-button>
    </div>
  </div>
</template>

<script>
const { spawn } = require("child_process");

const { dialog } = require("electron").remote;
const events = require("events");
var fw = require("@/components/FileWatcher.js");

export default {
  props: ["tabConfig", "path"],
  data() {
    var inputPath = this.tabConfig.inputPath;

    var eventEmitter = new events.EventEmitter();
    // Initiallize watcher
    var fileWatcher = fw(eventEmitter);
    // Start watching
    fileWatcher.watch("input", this.path + "\\" + inputPath);
    // Catch file change event
    eventEmitter.on(
      "file",
      function(id, files) {
        // Update file list
        this.input = [];
        for (var i in files) {
          this.input.push({ name: files[i] });
        }

        // Update the state of this tab (e.g. whether it has finished or not)
        var prevState = this.state.hasInput;
        this.state.hasInput = files.length > 0 ? true : false;

        // Emit event
        if (this.state.hasInput != prevState) {
          this.$emit("state-changed", this.id, this.state);
        }
      }.bind(this)
    );

    return {
      id: this.tabConfig.id,
      name: this.tabConfig.name,
      baseExecPath: this.tabConfig.launchConf.execPath,
      inputPath: this.tabConfig.inputPath,

      launchAllowed: this.tabConfig.launchConf.launchAllowed,

      // The data field contain data local to one tab,
      // such as the currently selected input, etc.
      selectedInput: null,
      fileWatcher: fileWatcher,
      input: [],
      state: { hasInput: false }
    };
  },
  methods: {
    openFileDialog: function() {
      var _this = this;
      dialog.showOpenDialog(function(fileNames) {
        _this.executablePath = fileNames[0];
      });
    },

    launch: function() {
      // var _this = this;
      // dialog.showMessageBox({ message: _this.tab.id }, function(response) {
      //   _this.$emit("model-ready");
      // });

      const bat = spawn("cmd.exe", [
        "/c",
        "C:\\Users\\liang\\Desktop\\test\\my.bat"
      ]);

      bat.stdout.on("data", data => {
        console.log(data.toString());
      });

      bat.stderr.on("data", data => {
        console.log(data.toString());
      });

      bat.on("exit", code => {
        // Update tab state
        console.log(`Child exited with code ${code}`);
      });

    },

    selectFolder: function(name) {
      this.selectedInput = name;
    }
  },

  watch: {
    path: function(newPath, oldPath) {
      if (newPath === oldPath) {
        return;
      }
      this.fileWatcher.unwatchAll();
      this.fileWatcher.watch("input", newPath + "\\" + this.tab.inputPath);
    }
  },

  computed: {
    realExecPath: function() {
      var path = this.baseExecPath;
      if (this.selectedInput) {
        path += " -s " + this.path + "\\" + this.selectedInput;
      }
      return path;
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

.folder-container {
  .folder {
    &.selected {
      color: red;
    }
    &:hover {
      background-color: grey;
    }
  }
}

.btn-container {
  margin-top: 40px;
  text-align: right;
}
</style>
