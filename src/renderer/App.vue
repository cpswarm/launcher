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

      // Send message to main
      ipcRenderer.send('change-title', path);
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