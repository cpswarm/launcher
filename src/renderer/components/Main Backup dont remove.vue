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
        <el-row v-for="tab in tabs" v-bind:key="tab.id">
          <div v-on:click="selectTab(tab)" v-bind:class="['tab-button', 'enabled',{ active: currentTab.id === tab.id  }]">
            <el-col :span="6" class="btn-icon"><img v-bind:src="tab.icon"></el-col>
            <el-col :span="18" class="btn-text">
              <div>{{tab.name}} <img v-if="tab.status.running" src="@/assets/running.png"></div>
            </el-col>
          </div>
        </el-row>

        
        <div class="tab-button-filler"></div>
      </el-col>
      <el-col :span="17" class="whole-tab-container">
        <tab-header v-bind:tab="currentTab" class="tab-header"></tab-header>
        <div class="tab-container">
          <keep-alive>
            <component :is="currentTabComponent" :id="currentTab.id" :path="path" @status-changed="handleTabStateChange" />
          </keep-alive>
        </div>
      </el-col>
    </el-row>
  </div>
</template> 

<script>
import ModellingTab from "@/components/ModellingTab.vue";
import SimulationTab from "@/components/SimulationTab.vue";
import CodeGenerationTab from "@/components/CodeGenerationTab.vue";
import DeploymentTab from "@/components/DeploymentTab.vue";
import MonitoringTab from "@/components/MonitoringTab.vue";
import TabHeader from "@/components/TabHeader.vue";

import modelingIcon from "@/assets/modelling.png";
import simulationIcon from "@/assets/simulation.png";
import codeIcon from "@/assets/code.png";
import deploymentIcon from "@/assets/deployment.png";
import monitoringIcon from "@/assets/monitoring.png";

export default {
  // The directory path of the launcher project
  props: ["path"],
  data() {
    var tabs = [
      {
        id: "modelling",
        name: "Modelling",
        icon: modelingIcon,
        status: { enabled: true, running: false }
      },
      {
        id: "simulation",
        name: "Simulation",
        icon: simulationIcon,
        status: { enabled: true, running: false }
      },
      {
        id: "code-generation",
        name: "Code Generation",
        icon: codeIcon,
        status: { enabled: true, running: false }
      },
      {
        id: "deployment",
        name: "Deployment",
        icon: deploymentIcon,
        status: { enabled: true, running: false }
      },
      {
        id: "monitoring",
        name: "Monitor & Command",
        icon: monitoringIcon,
        status: { enabled: true, running: false }
      }
    ];
    return {
      tabs: tabs,
      currentTab: tabs[0]
    };
  },
  components: {
    ModellingTab: ModellingTab,
    SimulationTab: SimulationTab,
    CodeGenerationTab: CodeGenerationTab,
    DeploymentTab: DeploymentTab,
    MonitoringTab: MonitoringTab,
    TabHeader: TabHeader
  },

  methods: {
    selectTab: function(tab) {
      this.currentTab = tab;
    },

    handleTabStateChange: function(id, status) {
      console.log(id, status);
      for (var i in this.tabs) {
        if (this.tabs[i].id === id) {
          this.tabs[i].status = Object.assign({}, status);
          break;
        }
      }
    }
  },
  watch: {},
  computed: {
    currentTabComponent: function() {
      return this.currentTab.id + "-tab";
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
        box-sizing: border-box;
        background-color: $secondary-color;
        flex: 0 1 $tab-btn-height;
        color: #303133;
        font-size: 1.1em;
        height: $tab-btn-height;

        vertical-align: middle;
        cursor: pointer;
        transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
        position: relative;
        border-bottom: 1px solid #5c91c2;

        &::before {
          @include pseudo-shadow;
        }

        &.enabled {
          &:hover {
            background-color: $secondary-color-darker;
          }
        }

        &.disabled {
          cursor: not-allowed;
          border-bottom: none;
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

        &.active {
          background: transparent;
          border-bottom: none;
          &:hover {
            background-color: transparent;
          }
          &::before {
            box-shadow: none;
          }
        }

        .btn-icon {
          height: 100%;
          position: relative;
          img {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 26px;
            height: 26px;
            margin-top: -13px; /* Half the height */
            margin-left: -13px; /* Half the width */
          }
        }

        .btn-text {
          height: 100%;
          display: table;
          div {
            display: table-cell;
            vertical-align: middle;
            text-align: left;
            img {
              height: 18px;
              vertical-align: middle;
            }
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
