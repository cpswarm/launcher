<template>
  <div class="tab-content">
    <div class="overlay" v-show="!status.enabled"></div>
    <div class="input-container" v-for="(widget, index) in config.widgets" :key="index" v-show="widget.status.visible">
      <div :class="['label', {disabled: !widget.status.enabled}]">{{widget.label}}</div>
      <file-list v-if="widget.type === 'file-list'" :path="getFullPath(path, widget.watchPath)" :enabled="widget.status.enabled" :properties="widget.properties" @folder-selected="handleEvent(widget.selectedFolder, $event)" @state-changed="handleEvent(widget.folders, $event)" @error="emitError">
      </file-list>
      <text-input v-if="widget.type === 'text'" :properties="widget.properties" :enabled="widget.status.enabled" @input="handleEvent(widget.varId, $event)" @error="emitError"></text-input>
      <single-checkbox v-if="widget.type === 'single-checkbox'" :properties="widget.properties" :enabled="widget.status.enabled" @input="handleEvent(widget.varId, $event)" @error="emitError"></single-checkbox>
    </div>
    <div class="input-container">
      <div class="label">Command Line</div>
      <el-input size="small" :readonly="true" v-model="status.commandLine"></el-input>
    </div>
    <process-manager :execPath="status.commandLine" :allowLaunch="status.allowLaunch" @process-started="processStarted" @process-ended="processEnded" @error="emitError"></process-manager>
  </div>
</template>

<script>
import ProcessManager from '@/components/widgets/ProcessManager/ProcessManager.vue'
import FileList from '@/components/widgets/FileList/CompleteFileList.vue'
import TextInput from '@/components/widgets/TextInput.vue'
import SingleCheckbox from '@/components/widgets/SingleCheckBox.vue'
const path = require('path')

export default {
  props: ['config', 'path'],

  data () {
    // Initialize status of each widget
    for (let i in this.config.widgets) {
      let widget = this.config.widgets[i]
      widget.status = { visible: true, enabled: true }
    }

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
        commandLine: ''
      }
    }
  },
  components: {
    ProcessManager: ProcessManager,
    FileList: FileList,
    TextInput: TextInput,
    SingleCheckbox: SingleCheckbox
  },
  methods: {
    processStarted: function () {
      this.status.running = true
      this.emitStatus()
    },

    processEnded: function () {
      this.status.running = false
      this.emitStatus()
    },

    handleEvent: function (varId, value) {
      // TODO: do deep copy
      this[varId] = value
      this.updateStatus()
    },

    updateStatus: function () {
      // Update tab status and emit it to parent
      this.status.done = this.config.isDone(this)
      this.status.enabled = this.config.isEnabled(this)
      this.status.allowLaunch = this.config.allowLaunch(this)
      this.status.commandLine = this.config.getCommandLine(this)
      this.emitStatus()

      // Update status of each widget
      for (let i in this.config.widgets) {
        let widget = this.config.widgets[i]
        let hasChanged = false
        if (widget.isEnabled) {
          let enabled = widget.isEnabled(this)
          if (widget.status.enabled !== enabled) {
            widget.status.enabled = enabled
            hasChanged = true
          }
        }
        if (widget.isVisible) {
          let visible = widget.isVisible(this)
          if (widget.status.visible !== visible) {
            widget.status.visible = visible
            hasChanged = true
          }
        }
        // Must use this.$set, otherwise list item won't update
        if (hasChanged) {
          this.$set(this.config.widgets, i, widget)
        }
      }
    },

    getFullPath: function (rootPath, relPath) {
      return path.join(rootPath, relPath)
    },

    emitStatus: function () {
      this.$emit('status-changed', this.id, this.status)
    },

    emitError: function (err) {
      this.$message.error(err.toString())
    }
  },
  computed: {}
}
</script>

<style lang="scss" scoped>
@import "@/settings.scss";

.tab-content {
  font-size: 0.9em;
  padding: 0 $tab-container-padding;
  position: relative;

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: white;
    opacity: 0.5;
  }

  .input-container {
    margin: 40px 0 20px 0;

    .label {
      margin-bottom: 10px;
      font-size: 1.3em;

      &.disabled {
        color: #bbbbbb;
      }
    }

    &:first-of-type {
      margin-top: 0px;
    }
  }
}
</style>
