<template>
  <div class="container">
    <div class="description">Reveal {{path}} in explorer</div>
    <el-button title="Open directory in explorer" type="primary" size="medium" :disabled="!enabled" @click="open">Open</el-button>
  </div>
</template>

<script>
// We use remote.shell to open file explorer, so that it will be in focus, instead of being opened in background
const { shell } = require('electron').remote
const pt = require('path')

export default {
  props: ['enabled', 'rootPath', 'properties'],
  data () {
    var properties = {
      path: ''
    }

    if (this.properties) {
      for (let key in this.properties) {
        properties[key] = this.properties[key]
      }
    }

    return {
      path: pt.join(this.rootPath, properties['path'])
    }
  },
  methods: {
    open: function () {
      var success = shell.showItemInFolder(this.path)
      if (!success) {
        this.$emit('error', 'Unable to open folder in file explorer on path ' + this.path)
      }
    }
  },
}
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
