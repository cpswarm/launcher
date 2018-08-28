<template>
  <div class="container">
    <div class="description">{{info}}</div>
    <el-input size="small" @input="input" :disabled="!enabled" v-model="textValue"></el-input>
  </div>
</template>

<script>
export default {
  props: ['enabled', 'properties'],
  data () {
    var properties = {
      default: '',
      info: ''
    }

    if (this.properties) {
      for (let key in this.properties) {
        properties[key] = this.properties[key]
      }
    }

    this.$emit('input', properties['default'])
    return {
      textValue: properties['default'],
      info: properties['info']
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
