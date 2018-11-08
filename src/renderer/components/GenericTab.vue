<template>
  <div class="tab-content" v-show="isVisible" >
    <div class="overlay" v-show="!isEnabled"></div>
    <div class="input-container" v-for="(widget, index) in tab.widgets" :key="index" v-show="widget.status.visible">
      <div :class="['label', {disabled: !widget.status.enabled}]">{{widget.label}}</div>
      <file-list v-if="widget.type === 'file-list'" :path="getFullPath(path, widget.watchPath)" :enabled="widget.status.enabled" :properties="widget.properties" :varId="widget.varId" :tabId="tab.id"  @error="emitError"></file-list>
      <text-input v-if="widget.type === 'text'" :properties="widget.properties" :enabled="widget.status.enabled" :varId="widget.varId" :tabId="tab.id" @error="emitError"></text-input>
      <single-checkbox v-if="widget.type === 'single-checkbox'" :properties="widget.properties" :enabled="widget.status.enabled" :varId="widget.varId" :tabId="tab.id"  @error="emitError"></single-checkbox>
      <explorer-button v-if="widget.type === 'explorer-button'" :rootPath="path" :properties="widget.properties" :enabled="widget.status.enabled" @error="emitError"></explorer-button>
      <select-file-button v-if="widget.type === 'select-file-button'" :rootPath="path" :properties="widget.properties" :enabled="widget.status.enabled" :varId="widget.varId" :tabId="tab.id" @error="emitError"></select-file-button>
      <dropdown-box v-if="widget.type === 'dropdown-box'" :properties="widget.properties" :enabled="widget.status.enabled" :varId="widget.varId" :tabId="tab.id" @error="emitError"></dropdown-box>
    </div>
    <process-manager :tabId="tab.id" :path="path" @error="emitError"></process-manager>
  </div>
</template>

<script>
// TODO: make a wrapper for all widgets
import ProcessManager from "@/components/widgets/ProcessManager/ProcessManager.vue";
import FileList from "@/components/widgets/FileList/CompleteFileList.vue";
import TextInput from "@/components/widgets/TextInput.vue";
import SingleCheckbox from "@/components/widgets/SingleCheckBox.vue";
import ExplorerButton from "@/components/widgets/ExplorerButton.vue";
import SelectFileButton from "@/components/widgets/SelectFileButton.vue";
import DropdownBox from "@/components/widgets/DropdownBox.vue";
const path = require("path");

export default {
  props: ["path", "tab"],

  data() {
    // Initialize status of each widget
    for (let i in this.tab.widgets) {
      let widget = this.tab.widgets[i];
      widget.status = { visible: true, enabled: true };
    }

    return {
      // The status of this tab
      // enabled: it means the component in this tab has enough inputs to be launched
      // running: it means the component has been launched and is still running
      id: this.tab.id
    };
  },
  components: {
    ProcessManager: ProcessManager,
    FileList: FileList,
    TextInput: TextInput,
    SingleCheckbox: SingleCheckbox,
    ExplorerButton: ExplorerButton,
    SelectFileButton: SelectFileButton,
    DropdownBox: DropdownBox
  },
  methods: {

    getFullPath: function(rootPath, relPath) {
      return path.join(rootPath, relPath);
    },

    emitError: function(err) {
      this.$emit("error", err);
    }
  },
  computed: {
    isEnabled: function() {
      return this.$store.getters.getEnabledByTabId(this.tab.id)
    },

    isVisible: function() {
      return this.$store.state.selectedTab.id === this.tab.id
    }
  }
};
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

    .description {
      margin-bottom: 5px;
      color: #888888;
      font-size: 0.9em;
    }

    &:first-of-type {
      margin-top: 0px;
    }
  }
}
</style>
