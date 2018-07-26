<template>
  <div class="whole-container">
    <welcome v-if="currentActivity=='Welcome'" @open-project="initMain" v-bind:path="path"></welcome>
    <main-panel v-if="currentActivity=='MainPanel'" v-bind:path="path"></main-panel>
  </div>
</template> 

<script>
const {ipcRenderer} = require('electron');
import Welcome from "@/components/Welcome.vue";
import MainPanel from "@/components/Main.vue";
var chokidar = require("chokidar");

export default {
  data() {
    // Initialize ipcRenderer listener
    ipcRenderer.on("close-project", () => {
      // Switch to main panel
      this.currentActivity = this.activities[0];

      // Ask main to reset window title
      ipcRenderer.send('reset-title');

      // Ask main to set menu to start menu
      ipcRenderer.send('set-start-menu');
    })

    var activities = ["Welcome", "MainPanel"];
    return {
      activities: activities,
      currentActivity: activities[0],
      path: ''
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
      this.currentActivity = this.activities[1];

      // Ask main to change window title
      ipcRenderer.send('set-title', path);

      // Ask main to change menu to operation menu
      ipcRenderer.send('set-opt-menu');
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
}
</style>