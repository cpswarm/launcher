<template>
  <div class="whole-container">
    <div class="overlay" v-show="isLoading" v-loading="isLoading"></div>
    <welcome v-if="currentActivity=='Welcome'" @open-project="openProject" @create-project="createProject" v-bind:path="path"></welcome>
    <main-panel v-if="currentActivity=='MainPanel'" v-bind:path="path"></main-panel>
  </div>
</template> 

<script>
const { ipcRenderer } = require("electron");
const { dialog } = require("electron").remote;
import Welcome from "@/components/Welcome.vue";
import MainPanel from "@/components/Main.vue";
import utils from "@/utils/utils.js";

export default {
  data() {
    // Initialize ipcRenderer listener
    ipcRenderer.on("close-project", () => {
      this.closeProject();
    });

    ipcRenderer.on("create-project", () => {
      this.createProject();
    });

    ipcRenderer.on("open-project", () => {
      this.openProject();
    });

    var activities = ["Welcome", "MainPanel"];
    return {
      activities: activities,
      currentActivity: "Welcome",
      path: "",
      isLoading: false
    };
  },
  components: {
    Welcome: Welcome,
    MainPanel: MainPanel
  },
  methods: {
    // The initialization method, which should be used to set up filewatcher, etc.
    initMain(path) {
      // Start file watching
      this.path = path;

      // Switch to main panel
      this.currentActivity = "Welcome";

      // A hacky way to force the main panel to reload
      setImmediate(() => {
        this.currentActivity = "MainPanel";
        this.stopLoadingDelayed();
      });

      // Ask main to change window title
      ipcRenderer.send("set-title", path);

      // Ask main to change menu to operation menu
      ipcRenderer.send("set-opt-menu");
    },

    createProject: function() {
      dialog.showOpenDialog(
        {
          title: "Select a folder as the root directory of your new project",
          properties: ["openDirectory"]
        },
        dirPath => {
          if (!dirPath) return;

          this.startLoading();
          var structure = require("@/utils/FileStructure.json");
          var list = utils.createProjectFolder(dirPath[0], structure, err => {
            // TODO: handle error
            this.initMain(dirPath[0]);
          });
        }
      );
    },

    openProject: function() {
      dialog.showOpenDialog({ properties: ["openDirectory"] }, dirPath => {
        if (!dirPath) return;
        this.startLoading();
        this.initMain(dirPath[0]);
      });
    },

    closeProject: function() {
      // Switch to main panel
      this.currentActivity = "Welcome";

      // Ask main to reset window title
      ipcRenderer.send("reset-title");

      // Ask main to set menu to start menu
      ipcRenderer.send("set-start-menu");
    },

    startLoading: function() {
      this.isLoading = true;
    },

    // Delayed stop loading (A lazy hack to hide the short moment in which the main panel will be viewed before it is ready)
    stopLoadingDelayed: function() {
      setTimeout(() => {
        this.isLoading = false;
      }, 1500);
    }
  },
  computed: {}
};
</script>

<style lang="scss">
@import "@/settings.scss";
html,
body,
.whole-container {
  margin: 0 0;
  font-family: Helvetica, sans-serif;
  user-select: none;
  height: 100%;
  overflow-y: hidden;
  cursor: default;
  position: relaitve;

  // A hacky fix, because the font color of disabled button is hard-coded as white in the element ui style sheet
  .el-button {
    &.is-disabled {
      &,
      &:hover,
      &:focus,
      &:active {
        color: $btn-disabled-color !important;
      }
    }
  }

  .overlay {
    position: absolute;
    background-color: white;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
  }
}
</style>