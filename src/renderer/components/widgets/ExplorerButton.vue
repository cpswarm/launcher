<template>
  <div class="container">
    <div class="description" v-if="!openUrl">Reveal {{path}} in file explorer</div>
    <div class="description" v-if="openUrl">Open {{path}} in browser</div>
    <el-button title="Open directory in explorer" type="primary" size="medium" :disabled="!isEnabled" @click="open">Open</el-button>
  </div>
</template>

<script>
// We use remote.shell to open file explorer, so that it will be in focus, instead of being opened in background
const { shell } = require("electron").remote;
const pt = require("path");

export default {
  props: ["rootPath", "properties"],
  data() {
    var properties = {
      path: "",
      openUrl: false
    };

    if (this.properties) {
      for (let key in this.properties) {
        properties[key] = this.properties[key];
      }
    }

    return {
      path: properties['path'],
      openUrl: properties['openUrl']
    };
  },
  methods: {
    open: function() {
      if (!this.openUrl) {
        var success = shell.showItemInFolder(pt.join(this.rootPath, this.path));
        if (!success) {
          this.$emit(
            "error",
            "Unable to open folder in file explorer on path " + this.path
          );
        }
      } else {
        var success = shell.openExternal(this.path)
        if (!success) {
          this.$emit(
            "error",
            "Unable to open external URL " + this.path
          );
        }
      }
    }
  },

  computed: {
    isEnabled: function () {
      return this.$store.getters.getWidgetEnabled(this.tabId, this.varId)
    },

    isVisible: function () {
      return this.$store.getters.getWidgetVisible(this.tabId, this.varId)
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
