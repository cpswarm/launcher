<template>
  <div class="container">
    <div class="description">{{message}}</div>
    <el-button title="Browse folder to select file" type="primary" size="medium" :disabled="!isEnabled" @click="open">Browse</el-button>
  </div>
</template>

<script>
const { remote } = require("electron");
const pt = require("path");

export default {
  props: ["rootPath", "properties", "varId", "tabId"],
  data() {
    var properties = {
      path: ""
    };

    if (this.properties) {
      for (let key in this.properties) {
        properties[key] = this.properties[key];
      }
    }

    // Emit event when initializing component
    var selectedPath = null;

    return {
      path: pt.join(this.rootPath, properties["path"]),
      selectedPath: selectedPath
    };
  },
  methods: {
    open: function() {
      remote.dialog.showOpenDialog(
        remote.getCurrentWindow(),
        { defaultPath: this.path, properties: ["openFile"] },
        dirPath => {
          if (!dirPath || dirPath.length === 0) return;
          this.selectedPath = dirPath[0];
          this.$store.commit("updateVar", {
            tabId: this.tabId,
            varId: this.varId,
            value: this.selectedPath
          });
        }
      );
    }
  },
  computed: {
    message: function() {
      if (!this.selectedPath) {
        return "Select a file from " + this.path;
      } else {
        return "Selected file: " + this.selectedPath;
      }
    },
    isEnabled: function() {
      return this.$store.getters.getWidgetEnabled(this.tabId, this.varId);
    },

    isVisible: function() {
      return this.$store.getters.getWidgetVisible(this.tabId, this.varId);
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  .description {
    margin-bottom: 5px;
    color: #888888;
    font-size: 0.9em;
  }
}
</style>
