<template>
  <div class="container">
    <el-row>
      <el-col :span="12" class="opt-btn-container">
        <el-button type="warning" icon="el-icon-check" circle></el-button>
        <el-button type="warning" icon="el-icon-message" circle></el-button>
        <el-button type="warning" icon="el-icon-star-off" circle></el-button>
      </el-col>
      <el-col :span="12" class="menu-btn-container">
        <span>John Doe</span>
        <el-button type="warning" icon="el-icon-menu" circle></el-button>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  computed: {}
};
</script>

<style lang="scss" scoped>
@import '../settings.scss';
.container {
  padding: $tab-header-padding $tab-header-padding;
  background-color: $secondary-color;
  color: white;

  .menu-btn-container {
    text-align: right;
  }
}
</style>
