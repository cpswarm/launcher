<template>
  <div class="container">
    <el-input @input="input" v-model="textValue"></el-input>
  </div>
</template>

<script>
export default {
  props: ["default"],
  data() {
    var defaultValue = this.default ? this.default : "";
    this.$emit("input", defaultValue);
    return {
      textValue : defaultValue
    };
  },
  methods: {
    input: function(value) {
      this.$emit("input", value);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
