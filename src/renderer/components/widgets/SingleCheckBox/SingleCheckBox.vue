<template>
  <div class="container">
    <!-- `checked` should be true or false -->
    <el-checkbox v-model="checked" :disabled="!enabled" @change="change">{{label}}</el-checkbox>
  </div>
</template>

<script>
export default {
  props: ['enabled', 'properties'],
  data () {
    var {
      defaultValue = false,
      label = 'Option'
    } = this.properties

    this.$emit('change', defaultValue)
    return {
      checked: defaultValue,
      label
    }
  },
  methods: {
    change (value) {
      this.$emit('change', value)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
