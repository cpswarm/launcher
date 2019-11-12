<template>
  <div class="container">
    <div class="description">{{info}}</div>
    <el-button title="Browse folder to select file" type="primary" size="medium" :disabled="!enabled" @click="open">Browse</el-button>
    <span class="message">{{message}}</span>
  </div>
</template>

<script>
const { remote } = require('electron')
const pt = require('path')

export default {
  props: ['rootPath', 'enabled', 'properties'],
  data () {
    var { 
      path = '',
      info = '',
    } = this.properties

    // Emit event when initializing component
    var selectedPath = null

    return {
      path: pt.join(this.rootPath, path),
      selectedPath: selectedPath,
      info
    }
  },
  methods: {
    open () {
      remote.dialog.showOpenDialog(
        remote.getCurrentWindow(),
        { defaultPath: this.path, properties: ['openFile'] },
        dirPath => {
          if (!dirPath || dirPath.length === 0) return
          this.selectedPath = dirPath[0]
          // this.$store.commit('updateVar', {
          //   tabId: this.tabId,
          //   varId: this.varId,
          //   value: this.selectedPath
          // })
          this.$emit('change', this.selectedPath)
        }
      )
    }
  },
  computed: {
    message () {
      if (!this.selectedPath) {
        return 'Select a file from ' + this.path
      } else {
        return 'Selected file: ' + this.selectedPath
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  .message {
    margin-bottom: 5px;
    color: #888888;
    font-size: 0.9em;
  }
  .description {
    margin-bottom: 5px;
    color: #888888;
    font-size: 0.9em;
  }
}
</style>
