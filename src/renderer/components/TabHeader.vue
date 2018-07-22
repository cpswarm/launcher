<template>
  <div class="container">
    <table>
      <tr>
        <td class="cell name">{{tab.config.name}}</td>
        <td class="cell user">
          <span>John Doe</span>
          <el-button type="primary" circle><img src="@/assets/user.png"></el-button>
        </td>
      </tr>
    </table>
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

  table {
    height: 100%;
    width: 100%;
    .cell {
      width: 50%;
      vertical-align: middle;
      &.name {
        text-align: left;
        font-size: 1.6em;
      }
      &.user {
        text-align: right;
        span {
          vertical-align: middle;
          margin-right: 10px;
        }
        img {
          height: 30px;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
