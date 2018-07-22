<template>
  <div class="container">
    <table>
      <tr>
        <td class="cell name"><img v-bind:src="tab.config.icon"><span>{{tab.config.name}}</span></td>
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
      vertical-align: middle;
      &.name {
        width: 70%;
        text-align: left;
        font-size: 1.4em;
        span {
          vertical-align: middle;
        }
        img {
          vertical-align: middle;
          height:  1.5em;
          margin-right: 15px;
        }
      }
      &.user {
        width: 30%;
        text-align: right;
        span {
          vertical-align: middle;
          margin-right: 10px;
        }
        img {
          height: 1.5em;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
