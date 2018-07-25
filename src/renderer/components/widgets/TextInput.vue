<template>
  <div class="container">
    <el-input size="small" @input="input" :disabled="!enabled" v-model="textValue"></el-input>
  </div>
</template>

<script>
export default {
  props: ["enabled", "properties"],
  data() {
    var properties = {
      default: ""
    };

    if (this.properties) {
      for (let key in this.properties) {
        properties[key] = this.properties[key];
      }
    }

    this.$emit("input", properties["default"]);
    return {
      textValue : properties["default"]
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
