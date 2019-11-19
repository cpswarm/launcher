<template>
  <div class="container">
    <el-input size="small" @input="input" :disabled="!enabled" v-model="path"></el-input>
    <div class="description">Open URL in browser</div>
    <el-button title="Open address in web browser" type="primary" size="medium" :disabled="!enabled" @click="open">Open</el-button>
  </div>
</template>

<script>
// We use remote.shell to open file explorer, so that it will be in focus, instead of being opened in background
const { shell } = require('electron').remote
const pt = require('path')

export default {
  props: ['rootPath', 'properties', 'enabled'],
  data () {
    var {
      defaultPath = '',
    } = this.properties

    return { path: defaultPath }
  },
  methods: {
    open () {
        if (!shell.openExternal(this.path)) {
            this.$emit(
            'error',
            'Unable to open external URL ' + this.path
            )
        }
    },
    input (value) {
      this.$emit('change', value)
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
