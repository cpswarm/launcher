<template>
  <div class="container">
    <!-- `checked` should be true or false -->
    <el-checkbox v-model="checked" :disabled="!enabled" @change="change">{{label}}</el-checkbox>
  </div>
</template>

<script>
export default {
  props: ['default', 'enabled', 'properties'],
  data () {
    var properties = {
      default: false,
      label: 'Option'
    }

    if (this.properties) {
      for (let key in this.properties) {
        properties[key] = this.properties[key]
      }
    }

    this.$emit('input', properties.default)
    return {
      checked: properties.default,
      label: properties.label
    }
  },
  methods: {
    change: function (value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
