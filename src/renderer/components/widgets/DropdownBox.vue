<template>
  <div class="container">
    <!-- `checked` should be true or false -->
    <div class="description">{{info}}</div>
    <el-select v-model="selectedItem" placeholder="Select" :disabled="!enabled" @change="change">
      <el-option v-for="item in items" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  props: ['properties', 'enabled'],
  data () {
    var {
      defaultValue = null,
      items = [],
      info = ''
    } = this.properties

    this.$emit('change', defaultValue)

    return {
      items,
      selectedItem: defaultValue,
      info
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
.container {
  .description {
    margin-bottom: 5px;
    color: #888888;
    font-size: 0.9em;
  }

}
</style>
