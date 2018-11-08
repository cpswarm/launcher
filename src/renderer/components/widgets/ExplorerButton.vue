<template>
  <div class="container">
    <div class="description" v-if="!openUrl">Reveal {{path}} in file explorer</div>
    <div class="description" v-if="openUrl">Open {{path}} in browser</div>
    <el-button title="Open directory in explorer" type="primary" size="medium" :disabled="!enabled" @click="open">Open</el-button>
  </div>
</template>

<script>
// We use remote.shell to open file explorer, so that it will be in focus, instead of being opened in background
const { shell } = require("electron").remote;
const pt = require("path");

export default {
  props: ["rootPath", "properties", 'enabled'],
  data() {
    var {
      path = "",
      openUrl = false
    } = this.properties;

    return { path, openUrl };
  },
  methods: {
    open() {
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
