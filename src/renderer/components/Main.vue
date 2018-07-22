<template>
  <div id="app">
    <el-row class="content-container">
      <el-col :span="7" class="tab-button-container">
        <div class="tab-button-header">
          <span class="text">
            CPSwarm<br>Launcher
          </span>
          <div class="image"><img src="@/assets/swarm.png"></div>
        </div>

        <div v-for="tab in tabs" v-bind:key="tab.id" v-on:click="selectTab(tab)" v-bind:class="['tab-button', { disabled: !tab.status.enabled  },{ selected: currentTab.id === tab.id  }]">
          <div>
            <div class="icon"><img v-bind:src="tab.config.icon"></div>
            <div class="text">{{tab.config.name}}</div>
            <div class="status"><img v-if="tab.status.running" src="@/assets/running.png"><img v-if="tab.status.done" src="@/assets/finish.png"></div>
          </div>
        </div>
        <div class="tab-button-filler"></div>
      </el-col>
      <el-col :span="17" class="whole-tab-container">
        <tab-header v-bind:tab="currentTab" class="tab-header"></tab-header>
        <div class="tab-container">
          <generic-tab v-for="tab in tabs" v-bind:key="tab.id" v-show="currentTab.id === tab.id" :config="tab.config" :path="path" @status-changed="handleTabStateChange"></generic-tab>
        </div>
      </el-col>
    </el-row>
  </div>
</template> 

<script>
import TabHeader from "@/components/TabHeader.vue";
import GenericTab from "@/components/GenericTab.vue";

var tabConfig = require("@/components/TabConfig.js");

export default {
  // The directory path of the launcher project
  props: ["path"],
  data() {
    var tabConfigs = tabConfig();

    var tabs = [];
    for (var i in tabConfigs) {
      var status = {running: false, done: false, enabled: false};
      tabs.push({id: tabConfigs[i].id, status: status, config: tabConfigs[i]});
    }

    return {
      tabs: tabs,
      currentTab: tabs[0]
    };
  },
  components: {
    TabHeader: TabHeader,
    GenericTab: GenericTab
  },

  methods: {
    selectTab: function(tab) {
      if (tab.status.enabled) {
        this.currentTab = tab;
      }
    },

    handleTabStateChange: function(id, status) {
      for (var i in this.tabs) {
        if (this.tabs[i].id === id) {
          this.tabs[i].status = Object.assign({}, status);
          break;
        }
      }
    }
  }
};
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
        height: $tab-btn-header-height;
        position: relative;

        .text {
          font-size: 2.2em;
          color: white;
          position: relative;
          top: 30px;
        }

        .image {
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;

          img {
            width: 50px;
            margin-left: -190px;
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
        font-size: 1.2em;
        height: $tab-btn-height;

        cursor: pointer;
        transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
        position: relative;
        border-bottom: 1px solid #5c91c2;

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
          border-bottom: none;
          // The white opaque overlay
          &::after {
            background: white;
            opacity: 0.5;
            content: "";
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
          }
        }

        &.selected {
          background: transparent;
          border-bottom: none;
          &::before {
            box-shadow: none;
          }
        }

        .icon {
          img {
            height: 30px;
          }
        }

        .text {
        }

        .status {
          position: absolute;
          // top: 50%;
          // transform: translateY(-50%);
          top: 10px;
          right: 10px;
          img {
            height: 20px;
            margin-left: 0 5px;
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
        padding: $tab-container-padding $tab-container-padding;
        overflow: auto;
      }
    }
  }
}
</style>
