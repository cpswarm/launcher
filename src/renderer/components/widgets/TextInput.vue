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
    var properties = {
      default: '',
      info: '',
      number: false,
      min: 0,
      max: 9999999
    }

    if (this.properties) {
      for (let key in this.properties) {
        properties[key] = this.properties[key]
      }
    }

    this.$emit('input', properties['default'])
    return {
      textValue: properties['default'],
      info: properties['info'],
      number: properties['number'],
      min: properties['min'],
      max: properties['max']
    }
  },
  methods: {
    input: function (value) {
      this.$emit('input', value)
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
