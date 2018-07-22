<template>
  <div>
    <div class="input-container">
      <div class="label">Command Line</div>
      <el-input :readonly="true" v-model="status.commandLine"></el-input>
    </div>
    <div class="input-container" v-for="(widget, index) in config.widgets" :key="index">
      <div class="label">{{widget.label}}</div>
      <file-list v-show="widget.type === 'file-list'" :path="widget.watchPath" @folder-selected="handleEvent(widget.selectedFolder, $event)" @state-changed="handleEvent(widget.folders, $event)" @error="emitError">
      </file-list>
      <file-list-with-add v-show="widget.type === 'file-list-add'" :path="widget.watchPath" @folder-selected="handleEvent(widget.selectedFolder, $event)" @state-changed="handleEvent(widget.folders, $event)" @error="emitError"></file-list-with-add>
      <text-input v-show="widget.type === 'text'" :default="widget.default" @input="handleEvent(widget.varId, $event)"></text-input>
    </div>
    <process-manager :execPath="status.commandLine" :allowLaunch="status.allowLaunch" @process-started="processStarted" @process-ended="processEnded"></process-manager>
  </div>
</template>

<script>
import ProcessManager from "@/components/process-manager/ProcessManager.vue";
import FileListWithAdd from "@/components/FileList/FileListWithAdd.vue";
import FileList from "@/components/FileList/FileList.vue";
import TextInput from "@/components/widgets/TextInput.vue";
const path = require("path");

export default {
  props: ["config", "path"],

  data() {
    this.combinePath(this.config, this.path);
    return {
      // The status of this tab
      // enabled: it means the component in this tab has enough inputs to be launched
      // running: it means the component has been launched and is still running
      id: this.config.id,
      status: {
        enabled: true,
        done: false,
        running: false,
        allowLaunch: false,
        commandLine: ""
      }
    };
  },
  components: {
    ProcessManager: ProcessManager,
    FileList: FileList,
    FileListWithAdd: FileListWithAdd,
    TextInput: TextInput
  },
  methods: {
    processStarted: function() {
      this.status.running = true;
      this.emitStatus();
    },

    processEnded: function() {
      this.status.running = false;
      this.emitStatus();
    },

    handleEvent: function(varId, value) {
      // TODO: do deep copy
      this[varId] = value;
      this.updateStatus();
    },

    updateStatus: function() {
      this.status.done = this.config.isDone(this);
      this.status.enabled = this.config.isEnabled(this);
      this.status.allowLaunch = this.config.allowLaunch(this);
      this.status.commandLine = this.config.getCommandLine(this);
      this.emitStatus();
    },

    combinePath: function(config, dirPath) {
      var widgets = config["widgets"];
      for (var i in widgets) {
        if (
          widgets[i].type === "file-list" ||
          widgets[i].type === "file-list-add"
        ) {
          widgets[i].watchPath = path.join(dirPath, widgets[i].watchPath);
        }
      }
    },

    emitStatus: function() {
      this.$emit("status-changed", this.id, this.status);
    },

    emitError: function(err) {
      this.$notify.error({
        title: "Error",
        message: err.toString()
      });
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
.input-container {
  margin: 40px 0 20px 0;

  .label {
    margin-bottom: 10px;
    font-size: 1.2em;
  }

  &:first-of-type {
    margin-top: 0px;
  }
}

</style>
