<template>
  <div class="container">
    <div class="description">{{info}}</div>
    <el-input v-if="!number" size="small" @input="input" :disabled="!enabled" v-model="textValue"></el-input>
    <el-input-number v-if="number" size="small" @input="input" :disabled="!enabled" v-model="textValue" :min="min" :max="max"></el-input-number>
  </div>
</template>

<script>
export default {
  props: ['enabled', 'properties'],
  data () {
    var {
      defaultValue = '',
      info = '',
      number = false,
      min = 0,
      max = 9999999
    } = this.properties

    this.$emit('change', defaultValue)

    return {
      textValue: defaultValue,
      info,
      number,
      min,
      max
    }
  },
  methods: {
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
