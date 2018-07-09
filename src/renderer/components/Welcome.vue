<template>
    <div class="backdrop">
        <div class="content-container">
            <div class="title">CPSwarm Launcher</div>
            <div class="btn-container">
                <el-button type="primary" @click="createProject()">Create</el-button>
                <el-button type="primary" @click="openProject()">Open</el-button>
            </div>
        </div>
    </div>
</template>

<script>
const { dialog } = require("electron").remote;

export default {
  data() {
    return {};
  },
  methods: {
    createProject: function() {
      var _this = this;
      dialog.showOpenDialog({properties: ['openDirectory']}, function(dirPath) {
        console.log(dirPath[0]);
        // TODO: create project metadata file within the dir

        // If everything all right, emit event telling the parent the dir path
        _this.$emit("open-project", dirPath[0]);
      });
    },
    openProject: function() {
      var _this = this;
      dialog.showOpenDialog({properties: ['openDirectory']}, function(dirPath) {
        console.log(dirPath[0]);
        // TODO: Check whether this is a valid project dir (e.g. by checking if metadata file exists)

        // If everything all right, emit event telling the parent the dir path
        _this.$emit("open-project", dirPath[0]);
      });
    },
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
  background: $secondary-color;

  .content-container {
    width: 400px;
    height: 300px;
    margin: 0 auto;
    position: relative;
    top: 50%;
    margin-top: -150px;
    text-align: center;

    .title {
      font-size: 2em;
      margin-bottom: 30px;
    }
  }
}
</style>
