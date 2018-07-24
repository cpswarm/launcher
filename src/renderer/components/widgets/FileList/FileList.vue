<template>
  <div class="folder-container">
    <div class="overlay" v-show="!enabled"></div>
    <div class="path-indicator">{{path}}</div>
    <table>
      <tr v-for="folder in folders" v-bind:key="folder.name" v-bind:class="['folder', { selected: selectedFolder === folder }]" @click="selectFolder(folder)">
        <td class="cell icon">
          <img v-show="folder.empty" src="@/assets/empty-folder.png">
          <img v-show="!folder.empty" src="@/assets/non-empty-folder.png">
        </td>
        <td class="cell name">
          <div class="text">{{folder.name}}</div>
        </td>
        <td class="cell actions">
          <action-menu class="action-menu" :name="folder.name" :path="path" @delete-folder="deleteFolder" @rename-folder="renameFolder" @open-explorer="openExplorer"></action-menu>
        </td>
      </tr>
    </table>
    <div v-show="isFoldersEmpty">Empty Content...</div>
  </div>
</template>

<script>
const rimraf = require("rimraf");
const events = require("events");
const path = require("path");
const { shell } = require("electron");
const fs = require("fs");
var fw = require("@/components/widgets/FileList/FileWatcher.js");

import ActionMenu from "@/components/widgets/FileList/ActionMenu.vue";

export default {
  // TODO: think whether it is necessary to propagate folder-deleted
  // This component emits three events:
  // 1. state-changed: when changes are detected in the watch dir; args: list of available folders after change
  // 2. folder-selected: when a folder is selected; args: the complete path of the selected folder
  // 3. folder-deleted; args: the complete path of the selected folder

  // This component receives 1 prop:
  // 1. path: the dir path to watch
  props: ["path", "enabled"],
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
      this.$confirm(
        "This will delete the folder and all of its content. Continue?",
        "Warning",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning"
        }
      )
        .then(() => {
          var folderPath = path.join(this.path, folder);
          rimraf(folderPath, err => {
            if (err) {
              // Emit error message
              this.$emit("error", err);
              return;
            }
            this.selectFolder(null);
            this.$emit("folder-deleted", folderPath);
            this.$message({
              type: "success",
              message: "Folder " + folderPath + " deleted"
            });
          });
        })
        .catch(() => {});
    },

    renameFolder: function(folder) {
      var originalFolderPath = path.join(this.path, folder);
      // TODO: implement the renaming
      this.$prompt("Original Name: " + folder, "Rename Folder", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        inputErrorMessage: "Invalid Folder Name"
      })
        .then(value => {
          fs.rename(
            originalFolderPath,
            path.join(this.path, value.value),
            (err) => {
              if (err) {
                // Emit error message
                this.$emit("error", err);
                return;
              }
              this.selectFolder(null);
              this.$message({
                type: "success",
                message: "Folder rename successful!"
              });
            }
          );
        })
        .catch(() => {});
    },

    openExplorer: function(folder) {
      var folderPath = path.join(this.path, folder);
      var success = shell.showItemInFolder(folderPath);
      if (!success) {
        this.$emit("error", new Error("Unable to open folder in file explorer."));
      }
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
  },

  computed: {
    isFoldersEmpty: function() {
      return this.folders.length === 0;
    }
  }
};
</script>

<style lang="scss" scoped>
.folder-container {
  position: relative;
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: white;
    opacity: 0.5;
    z-index: 1;
  }

  .path-indicator {
    font-size: 0.9em;
    margin-bottom: 5px;
    color: #555555;
  }


  table {
    width: 100%;
    border-collapse: collapse;
    color: #555555;
    .folder {
      &.selected {
        color: black;
        background-color: #f0f0f0;
      }

      &:hover {
        background-color: #eeeeee;
      }

      .cell {
        height: 35px;
        vertical-align: middle;
        border-bottom: 1px solid #ddd;
        border-top: 1px solid #ddd;
        &.icon {
          width: 10%;
          text-align: center;
          img {
            height: 24px;
            display: block;
            margin: 0 auto;
          }
        }

        &.name {
          width: 80%;
        }

        &.actions {
          width: 10%;
          text-align: center;
          .action-menu {
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
