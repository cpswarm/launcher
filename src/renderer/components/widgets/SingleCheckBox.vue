<template>
  <div class="container">
    <!-- `checked` should be true or false -->
    <el-checkbox v-model="checked" :disabled="!isEnabled" @change="change">{{label}}</el-checkbox>
  </div>
</template>

<script>
export default {
  props: ['properties', 'tabId', 'varId'],
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

    this.$store.commit('updateVar', {tabId: this.tabId, varId: this.varId, value: properties['default']})
    return {
      checked: properties.default,
      label: properties.label
    }
  },
  methods: {
    change: function (value) {
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
</style>
