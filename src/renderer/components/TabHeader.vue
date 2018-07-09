<template>
  <div class="container">
    <el-row>
      <el-col :span="12" class="title-container">
        {{tab.name}}
      </el-col>
      <el-col :span="12" class="menu-btn-container">
        <span>John Doe</span>
        <el-button type="primary" circle><img src="@/assets/user.png"></el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["tab"],
  methods: {},
  computed: {}
};
</script>

<style lang="scss" scoped>
@import "@/settings.scss";
.container {
  padding: 0 20px;
  background-color: $secondary-color;
  height: 100%;
  position: relative;
  &::before {
    @include pseudo-shadow;
  }
  .el-row {
    height: 100%;
    .title-container {
      height: $tab-header-height;
      line-height: $tab-header-height;
      font-size: 1.6em;
      vertical-align: middle;
    }
    .menu-btn-container {
      height: $tab-header-height;
      line-height: $tab-header-height;
      vertical-align: middle;
      text-align: right;
      img {
        height: 20px;
      }
    }
  }
}
</style>
