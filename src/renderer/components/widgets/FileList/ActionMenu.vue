<template>
  <div class="menu-container">
    <el-dropdown @command="handleCommand" trigger="click">
      <span class="el-dropdown-link">
        <img src="@/assets/down-arrow.png">
      </span>
      <el-dropdown-menu slot="dropdown" >
        <el-dropdown-item command="delete">Delete</el-dropdown-item>
        <el-dropdown-item command="rename">Rename</el-dropdown-item>
        <el-dropdown-item command="explorer">Open In Explorer</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
const path = require("path");

export default {
  // name: the name of the folder
  props: ["name"],
  data() {
    return {};
  },
  methods: {
    handleCommand: function(command) {
      switch(command) {
        case "delete":
          this.$emit("delete-folder", this.name);
          break;
        case "rename":
          this.$emit("rename-folder", this.name);
          break;
        case "explorer":
          this.$emit("open-explorer", this.name);
          break;
      }
    },

    deleteFolder: function() {
      var folderPath = path.join(this.path, this.name);
      rimraf(folderPath, err => {
        if (err) {
          // Emit error message
          console.log(err);
          return;
        }
        this.$emit("folder-deleted", folderPath);
      });
    },

    renameFolder: function(){},

    openInExplorer: function(){
      var folderPath = path.join(this.path, this.name);
      shell.showItemInFolder(folderPath);
    }
  },

  watch: {}
};
</script>

<style lang="scss" scoped>
.el-dropdown-link {
  img {
    height: 0.8em;
    vertical-align: middle;
  }
}
</style>
