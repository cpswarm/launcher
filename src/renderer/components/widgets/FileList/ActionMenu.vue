<template>
  <div class="menu-container">
    <el-dropdown @command="handleCommand" trigger="click">
      <span class="el-dropdown-link">
        <img src="@/assets/down-arrow.png">
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="delete">Delete</el-dropdown-item>
        <el-dropdown-item command="rename">Rename</el-dropdown-item>
        <el-dropdown-item command="explorer">Open In Explorer</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  // name: the name of the folder
  props: ['name'],
  data () {
    return {}
  },
  methods: {
    handleCommand: function (command) {
      switch (command) {
        case 'delete':
          this.$emit('delete-folder', this.name)
          break
        case 'rename':
          this.$emit('rename-folder', this.name)
          break
        case 'explorer':
          this.$emit('open-explorer', this.name)
          break
      }
    }
  },

  watch: {}
}
</script>

<style lang="scss" scoped>
.menu-container {
  display: inline-block;

  .el-dropdown-link {
    img {
      height: 0.8em;
      vertical-align: middle;
    }
  }
}
</style>
