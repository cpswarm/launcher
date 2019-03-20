<template>
  <div class="whole-container">
    <div class="overlay" v-show="isLoading" v-loading="isLoading"></div>
    <help :visible.sync="showHelp"></help>
    <welcome v-if="currentActivity=='welcome'" @open-project="openProject" @create-project="createProject" @error="showError"></welcome>
    <main-panel v-if="currentActivity=='main'" @error="showError"></main-panel>
  </div>
</template> 

<script>
import Help from '@/components/Help.vue'
import Welcome from '@/components/Welcome.vue'
import MainPanel from '@/components/Main.vue'
import utils from '@/utils/utils.js'
const { ipcRenderer, remote } = require('electron')

export default {
  data () {
    return {}
  },
  created () {
    // Initialize ipcRenderer listener
    ipcRenderer.on('close-project', () => {
      this.closeProject()
    })

    ipcRenderer.on('create-project', () => {
      this.createProject()
    })

    ipcRenderer.on('open-project', () => {
      this.openProject()
    })

    ipcRenderer.on('open-help', () => {
      this.$store.commit('setShowHelp', true)
    })
  },

  components: {
    Help,
    Welcome,
    MainPanel
  },
  methods: {
    // The initialization method, which should be used to set up filewatcher, etc.
    initMain (path) {
      // Start file watching
      this.$store.commit('changeRootPath', path)

      // Switch to welcome temporarily to trigger loading screen
      this.$store.commit('setCurrentActivity', 'welcome')

      // A hacky way to force the main panel to reload
      setImmediate(() => {
        this.$store.commit('setCurrentActivity', 'main')
        this.stopLoadingDelayed()
      })

      // Ask main to change window title
      ipcRenderer.send('set-title', path)

      // Ask main to change menu to operation menu
      ipcRenderer.send('set-opt-menu')
    },

    createProject () {
      remote.dialog.showOpenDialog(
        remote.getCurrentWindow(),
        {
          title: 'Select a folder as the root directory of your new project',
          properties: ['openDirectory']
        },
        dirPath => {
          if (!dirPath) return

          this.startLoading()
          var structure = require('@/conf/FileStructure.json')
          utils.createProjectFolder(dirPath[0], structure, err => {
            if (err) {
              this.showError(err)
              return
            }
            this.initMain(dirPath[0])
          })
        }
      )
    },

    openProject () {
      remote.dialog.showOpenDialog(remote.getCurrentWindow(), { properties: ['openDirectory'] }, dirPath => {
        if (!dirPath) return
        this.startLoading()
        this.initMain(dirPath[0])
      })
    },

    closeProject () {
      // Switch to main panel
      this.$store.commit('setCurrentActivity', 'welcome')

      // Ask main to reset window title
      ipcRenderer.send('reset-title')

      // Ask main to set menu to start menu
      ipcRenderer.send('set-start-menu')
    },

    startLoading () {
      this.$store.commit('setIsLoading', true)
    },

    // Delayed stop loading (A lazy hack to hide the short moment in which the main panel will be viewed before it is ready)
    stopLoadingDelayed () {
      setTimeout(() => {
        this.$store.commit('setIsLoading', false)
      }, 1500)
    },

    showError (err) {
      this.$message.error(err.toString())
    }
  },
  computed: {
    showHelp () {
      return this.$store.state.showHelp
    },

    isLoading () {
      return this.$store.state.isLoading
    },

    currentActivity () {
      return this.$store.state.currentActivity
    }
  }
}
</script>

<style lang="scss">
@import '@/element-custom.scss';
@import '@/settings.scss';
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