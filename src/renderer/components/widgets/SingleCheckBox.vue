<template>
  <div class="container">
    <!-- `checked` should be true or false -->
    <el-checkbox v-model="checked" :disabled="!enabled" @change="change">{{this.label}}</el-checkbox>
  </div>
</template>

<script>
export default {
  props: ["default", "label", "enabled"],
  data() {
    var defaultValue = this.default ? this.default : false;
    this.$emit("input", defaultValue);
    return {
      checked: defaultValue
    };
  },
  methods: {
    change: function(value) {
      this.$emit("input", value);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
