<template>
  <div class="folder-container">
    <el-row v-for="folder in folders" v-bind:key="folder.name" v-bind:class="['folder', { selected: selectedFolder === folder }]" @click="selectFolder(folder)">
      <el-col :span="8">
        <div v-show="folder.empty" class="icon"><img src="@/assets/empty-folder.png">SFSDFSDF</div>
        <div v-show="!folder.empty" class="icon"><img src="@/assets/non-empty-folder.png">SFSDFSDF</div>
      </el-col>
      <el-col :span="14">
        <div @click="selectFolder(folder)" class="text">{{folder.name}}</div>
      </el-col>
      <el-col :span="2">
        <action-menu :name="folder.name" :path="path" @delete-folder="deleteFolder" @rename-folder="renameFolder" @open-explorer="openExplorer"></action-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
const rimraf = require("rimraf");
const events = require("events");
const path = require("path");
const { shell } = require("electron");
var fw = require("@/components/FileList/FileWatcher.js");

import ActionMenu from "@/components/FileList/ActionMenu.vue";

export default {
  // TODO: think whether it is necessary to propagate folder-deleted
  // This component emits three events:
  // 1. state-changed: when changes are detected in the watch dir; args: list of available folders after change
  // 2. folder-selected: when a folder is selected; args: the complete path of the selected folder
  // 3. folder-deleted; args: the complete path of the selected folder

  // This component receives 1 prop:
  // 1. path: the dir path to watch
  props: ["path"],
  data() {
    var eventEmitter = new events.EventEmitter();
    // Initiallize watcher
    var fileWatcher = fw(eventEmitter);
    // Start watching
    fileWatcher.watch(this.path);
    // Catch file change event
    eventEmitter.on("file", folders => {
      // Update file list
      this.folders = folders;
      // Emit event
      this.$emit("state-changed", this.folders);
    });

    return {
      // The data field contain data local to one tab,
      // such as the currently selected input, etc.
      selectedFolder: null,
      fileWatcher: fileWatcher,
      folders: []
    };
  },

  components: {
    ActionMenu: ActionMenu
  },

  methods: {
    selectFolder: function(folder) {
      // If the same folder is clicked again, deselect it
      this.selectedFolder = this.selectedFolder === folder ? null : folder;

      var clonedFolder = this.selectedFolder
        ? Object.assign({}, this.selectedFolder)
        : null;

      // Add the complete path to the folder name
      if (clonedFolder) {
        clonedFolder.name = path.join(this.path, this.selectedFolder.name);
      }

      // Emit event
      this.$emit("folder-selected", clonedFolder);
    },

    deleteFolder: function(folder) {
      var folderPath = path.join(this.path, folder);
      rimraf(folderPath, err => {
        if (err) {
          // Emit error message
          this.$emit("error", err);
          return;
        }
        this.$emit("folder-deleted", folderPath);
      });
    },

    renameFolder: function(folder) {
      // TODO: implement the renaming
    },

    openExplorer: function(folder) {
      var folderPath = path.join(this.path, folder);
      var success = shell.showItemInFolder(folderPath);
      this.$emit("error", new Error("Unable to open folder in file explorer."));
    }
  },

  watch: {
    path: function(newPath, oldPath) {
      if (newPath === oldPath) {
        return;
      }
      this.fileWatcher.unwatch();
      this.fileWatcher.watch(newPath);
    }
  }
};
</script>

<style lang="scss" scoped>
.folder-container {
  .folder {
    height: 40px;
    .el-col {
      height: 100%;
      .icon {
        height: 100%;
        img {
          vertical-align: super;
        }
      }

      .text {
        height: 100%;
        vertical-align: middle;
      }
    }

    &.selected {
      color: red;
    }
    &:hover {
      background-color: #eeeeee;
      .menu-icon {
        display: block;
      }
    }

    .menu-icon {
      display: none;
    }
  }
}
</style>
