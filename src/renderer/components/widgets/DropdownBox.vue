<template>
  <div class="container">
    <!-- `checked` should be true or false -->
    <div class="description">{{info}}</div>
    <el-select v-model="selectedItem" placeholder="Select" :disabled="!isEnabled" @change="change">
      <el-option v-for="item in items" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  props: ["properties", 'varId', 'tabId'],
  data() {
    var properties = {
      default: null,
      items: [],
      info: ''
    };

    if (this.properties) {
      for (let key in this.properties) {
        properties[key] = this.properties[key];
      }
    }

    this.$store.commit('updateVar', {tabId: this.tabId, varId: this.varId, value: properties['default']})
    return {
      label: properties.label,
      items: properties.items,
      selectedItem: properties.default,
      info: properties.info
    };
  },
  methods: {
    change: function(value) {
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
};
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
