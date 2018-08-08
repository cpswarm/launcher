<template>
  <div id="app">
    <el-row class="content-container">
      <el-col :span="6" class="tab-button-container">
        <div class="tab-button-header">
          <span class="text">
            CPSwarm<br>Launcher
          </span>
          <div class="image"><img src="@/assets/swarm.png"></div>
        </div>
        <div v-for="tab in tabs" v-bind:key="tab.id" v-on:click="selectTab(tab)" v-bind:class="['tab-button', { selected: currentTab.id === tab.id  }]">
          <div>
            <div class="icon"><img v-bind:src="tab.config.icon"></div>
            <div class="text">{{tab.config.name}}</div>
            <div class="status">
              <img v-if="tab.status.running" src="@/assets/running.png">
              <img v-if="tab.status.done" src="@/assets/finish.png">
              <img v-if="!tab.status.enabled" src="@/assets/lock.png">
            </div>
          </div>
        </div>
        <div class="tab-button-filler"></div>
      </el-col>
      <el-col :span="18" class="whole-tab-container">
        <tab-header :tab="currentTab" :path="path" class="tab-header" @open-help="openHelp" @error="emitError"></tab-header>
        <div class="tab-container">
          <generic-tab v-for="tab in tabs" v-bind:key="tab.id" v-show="currentTab.id === tab.id" :config="tab.config" :path="path" @status-changed="handleTabStateChange" @error="emitError"></generic-tab>
        </div>
      </el-col>
    </el-row>
  </div>
</template> 

<script>
import TabHeader from '@/components/TabHeader.vue'
import GenericTab from '@/components/GenericTab.vue'

var tabConfig = require('@/components/TabConfig.js')

export default {
  // The directory path of the launcher project
  props: ['path'],
  data () {
    var tabConfigs = tabConfig()

    var tabs = []
    for (var i in tabConfigs) {
      var status = {running: false, done: false, enabled: false}
      tabs.push({id: tabConfigs[i].id, status: status, config: tabConfigs[i]})
    }

    return {
      tabs: tabs,
      currentTab: tabs[0]
    }
  },
  components: {
    TabHeader: TabHeader,
    GenericTab: GenericTab
  },

  methods: {
    selectTab: function (tab) {
      this.currentTab = tab
    },

    handleTabStateChange: function (id, status) {
      for (var i in this.tabs) {
        if (this.tabs[i].id === id) {
          this.tabs[i].status = Object.assign({}, status)
          break
        }
      }
    },

    openHelp: function () {
      this.$emit('open-help')
    },

    emitError: function (err) {
      this.$emit('error', err)
    }
  }
}
</script>


<style lang="scss" scoped>
@import "@/settings.scss";
/* Variables are defined in the imported .scss */
#app {
  height: 100%;
  position: relative;
  z-index: 5;

  .content-container {
    height: 100%;

    .tab-button-container {
      text-align: center;
      height: 100%;
      color: $secondary-color;
      display: flex;
      flex-flow: column;
      position: relative;

      .tab-button-header {
        background-color: $primary-color;
        flex: 0 0 $tab-btn-header-height;
        position: relative;

        .text {
          font-size: 1.8em;
          color: white;
          position: relative;
          top: 35px;
          z-index: 5;
        }

        .image {
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          z-index: 1;

          img {
            height: 2.7em;
            margin-left: -155px;
            margin-top: 5px;
          }
        }

        &::before {
          @include pseudo-shadow;
        }
      }


      .tab-button {
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        background-color: $secondary-color;
        color: #303133;
        font-size: 1em;
        height: $tab-btn-height; // Actually implied flex 0 1 $tab-btn-height

        cursor: pointer;
        transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
        position: relative;

        // This selector selects all .tab-button, which has a sibling and preceding .tab-button
        // So basically all .tab-button except the first one
        border-top: 1px solid transparent;
        & ~ .tab-button {
          border-top: 1px solid $secondary-color-darker;
        }


        &::before {
          @include pseudo-shadow;
        }

        &:hover {
          background-color: $secondary-color-darker;
          &.disabled {
            background-color: $secondary-color;
          }
          &.selected {
            background-color: transparent;
          }
        }

        &.disabled {
          cursor: not-allowed;
          border-top: 1px solid transparent;
          // The white opaque overlay
          &::after {
            background: white;
            opacity: 0.5;
            content: "";
            position: absolute;
            top: -1px; // This is to compensate the border width
            bottom: 0;
            left: 0;
            right: 0;
          }

          & + .tab-button {
            border-top: 1px solid transparent;
          }
        }

        &.selected {
          background: transparent;
          border-top: 1px solid transparent;
          &::before {
            box-shadow: none;
          }

          & + .tab-button {
            border-top: 1px solid transparent;
          }
        }

        .icon {
          img {
            height: 1.5em;
          }
        }

        .status {
          position: absolute;
          // top: 50%;
          // transform: translateY(-50%);
          top: 10px;
          right: 10px;
          img {
            height: 1em;
            margin-left: 0.5em;;
          }
        }
      }

      .tab-button-filler {
        flex: 1 1 auto;
        background-color: $secondary-color;
        position: relative;
        &::before {
          @include pseudo-shadow;
        }
      }
    }

    .whole-tab-container {
      display: flex;
      flex-flow: column;
      position: relative;
      height: 100%;

      .tab-header {
        box-sizing: border-box;
        flex: 0 1 $tab-header-height;
        height: $tab-header-height;
      }

      .tab-container {
        box-sizing: border-box;
        flex: 1 1 auto;
        overflow: auto;
      }
    }
  }
}
</style>
