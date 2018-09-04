<template>
  <div class="container">
    <div class="description">{{message}}</div>
    <el-button title="Browse folder to select file" type="primary" size="medium" :disabled="!enabled" @click="open">Browse</el-button>
  </div>
</template>

<script>
const { dialog } = require('electron').remote
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

    // Emit event when initializing component
    var selectedPath = null
    this.$emit('input', selectedPath)

    return {
      path: pt.join(this.rootPath, properties['path']),
      selectedPath: selectedPath
    }
  },
  methods: {
    open: function () {
      dialog.showOpenDialog({ defaultPath:this.path , properties: ['openFile'] }, dirPath => {
        if (!dirPath || dirPath.length === 0) return
        this.selectedPath = dirPath[0]
        this.$emit('input', this.selectedPath)
      })
    }
  },
  computed: {
    message: function() {
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
  .description {
    margin-bottom: 5px;
    color: #888888;
    font-size: 0.9em;
  }
}
</style>
