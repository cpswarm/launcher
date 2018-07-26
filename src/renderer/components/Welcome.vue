<template>
    <div class="backdrop" v-loading="isLoading">
        <div class="content-container">
            <div class="logo"><img src="@/assets/logo.svg"></div>
            <div class="title">CPSwarm Launcher</div>
            <div class="btn-container">
                <el-button type="primary" @click="createProject">Create Project</el-button>
                <el-button type="primary" @click="openProject">Open Project</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import utils from "@/utils/utils.js";
const { dialog } = require("electron").remote;


export default {
  data() {
    return {
      isLoading: false
    };
  },
  methods: {
    createProject: function() {
      this.$emit("create-project");
    },

    openProject: function() {
      this.$emit("open-project");
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
@import "../settings.scss";

.backdrop {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: $secondary-color;

  &::before {
    content: "";
    background-image: url("../assets/cover.jpg");
    background-size: cover;
    opacity: 0.3;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
 
  }

  .content-container {
    width: 400px;
    margin: 0 auto;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    //margin-top: -150px;
    text-align: center;

    .logo {
      margin-bottom: 30px;
      img {
        height: 150px;
      }
    }

    .title {
      font-size: 2em;
      margin-bottom: 30px;
    }
  }
}
</style>
