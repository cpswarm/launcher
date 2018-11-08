<template>
  <div class="container">
    <div class="description">{{info}}</div>
    <el-input v-if="!number" size="small" @input="input" :disabled="!isEnabled" v-model="textValue"></el-input>
    <el-input-number v-if="number" size="small" @input="input" :disabled="!isEnabled" v-model="textValue" :min="min" :max="max"></el-input-number>
  </div>
</template>

<script>
export default {
  props: ['properties', 'varId', 'tabId'],
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

    this.$store.commit('updateVar', {tabId: this.tabId, varId: this.varId, value: properties['default']})

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
      this.$store.commit('updateVar', {tabId: this.tabId, varId: this.varId, value: value})
    }
  },

  computed: {
    isEnabled: function () {
      return this.$store.getters.getWidgetEnabled(this.tabId, this.varId)
    },

    isVisible: function () {
      return this.$store.getters.getWidgetVisible(this.tabId, this.varId)
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
