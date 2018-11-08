<template>
  <div class="input-container" v-if="isVisible">
    <div :class="['label', {disabled: !isEnabled}]">{{label}}</div>
    <file-list v-if="type === 'file-list'" :rootPath="rootPath" :enabled="isEnabled" :properties="properties" @change="onChange" @error="emitError"></file-list>
    <text-input v-if="type === 'text'" :properties="properties" :enabled="isEnabled" @change="onChange" @error="emitError"></text-input>
    <single-checkbox v-if="type === 'single-checkbox'" :properties="properties" :enabled="isEnabled" @change="onChange" @error="emitError"></single-checkbox>
    <explorer-button v-if="type === 'explorer-button'" :rootPath="rootPath" :properties="properties" :enabled="isEnabled" @change="onChange" @error="emitError"></explorer-button>
    <select-file-button v-if="type === 'select-file-button'" :rootPath="rootPath" :properties="properties" :enabled="isEnabled" @change="onChange" @error="emitError"></select-file-button>
    <dropdown-box v-if="type === 'dropdown-box'" :properties="properties" :enabled="isEnabled" @change="onChange" @error="emitError"></dropdown-box>
  </div>
</template>

<script>
import ProcessManager from "@/components/widgets/ProcessManager/ProcessManager.vue";
import FileList from "@/components/widgets/FileList/CompleteFileList.vue";
import TextInput from "@/components/widgets/TextInput.vue";
import SingleCheckbox from "@/components/widgets/SingleCheckBox.vue";
import ExplorerButton from "@/components/widgets/ExplorerButton.vue";
import SelectFileButton from "@/components/widgets/SelectFileButton.vue";
import DropdownBox from "@/components/widgets/DropdownBox.vue";
const path = require("path");

export default {
  props: ["widget", "varId", "tabId"],

  data() {
    return {
      type: this.widget.type,
      label: this.widget.label,
      properties: this.widget.properties
    };
  },
  components: {
    ProcessManager,
    FileList,
    TextInput,
    SingleCheckbox,
    ExplorerButton,
    SelectFileButton,
    DropdownBox
  },

  methods: {
    emitError(err) {
      this.$emit("error", err);
    },

    onChange(value) {
      this.$store.commit('updateVar', { tabId: this.tabId, varId: this.varId, value: value })
    }
  },

  computed: {
    rootPath() {
      return this.$store.getters.getRootPath
    },

    isEnabled() {
      return this.$store.getters.getWidgetEnabled(this.tabId, this.varId);
    },

    isVisible() {
      return this.$store.getters.getWidgetVisible(this.tabId, this.varId);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/settings.scss';

.input-container {
  margin: 20px 0 40px 0;

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

}
</style>
