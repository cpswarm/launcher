<template>
    <div class="new-folder-container">
      <el-button title="Create new folder" class="create-button" @click="createFolder()" size="small">New Folder</el-button>
      <el-input class="folder-name-input" placeholder="New Folder Name" v-model="newFolder" size="small"></el-input>
      <el-alert class="error-msg" :title="errMsg" v-show="errMsg" type="error" @close="clearError">
      </el-alert>
    </div>
</template>

<script>
const fs = require('fs')
const path = require('path')

export default {
  // This component emits the three events of FileList and an extra one:
  // 1. folder-created: when a new folder is created with this component; args: the complete path of the newly created folder

  // This component receives 1 prop:
  // 1. path: the dir path to watch
  props: ['path'],
  data () {
    return {
      newFolder: null,
      errMsg: ''
    }
  },
  components: {},
  methods: {
    createFolder: function () {
      if (!this.newFolder) {
        this.errMsg = "Folder name can't be empty!"
        return
      }

      var newFolderPath = path.join(this.path, this.newFolder)
      if (fs.existsSync(newFolderPath)) {
        this.errMsg = 'Folder already exists!'
        return
      }

      fs.mkdir(newFolderPath, err => {
        if (err) {
          // This is a bigger error, so emit it to parent
          var errMsg =
            'Error while creating folder in path ' +
            newFolderPath +
            ', cause: ' +
            err
          this.emitError(errMsg)
          return
        }
        this.errMsg = ''
        this.newFolder = null
        this.$emit('folder-created', newFolderPath)
      })
    },

    clearError: function () {
      this.errMsg = ''
    },

    emitError: function (err) {
      this.$emit('error', err)
    }
  }
}
</script>

<style lang="scss" scoped>
.new-folder-container {
  
  .create-button {
    vertical-align: middle;
  }

  .folder-name-input {
    width: 180px;
    vertical-align: middle;
  }
  .error-msg {
    display: inline-block;
    width : 300px;
    vertical-align: middle;
  }
}
</style>
