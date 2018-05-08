<template>
  <div id="app">
    <el-row>
      <el-col :span="7" class="tab-button-container">
        <div class="tab-button-header"><img src="./assets/cpswarm.png"></div>
        <div v-for="tab in tabs" v-bind:key="tab.id" 
          v-on:click="currentTab = tab" 
          v-bind:class="['tab-button', { active: currentTab.id === tab.id }]"
          v-html="tab.name"></div>
      </el-col>
      <el-col :span="17">
        <tab-header class="tab-header"></tab-header>
        <div class="tab-container">
          <keep-alive>
            <component v-bind:is="currentTabComponent" />
          </keep-alive>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ModellingTab from "./components/ModellingTab.vue";
import SimulationTab from "./components/SimulationTab.vue";
import CodeGenerationTab from "./components/CodeGenerationTab.vue";
import DeploymentTab from "./components/DeploymentTab.vue";
import MonitoringTab from "./components/MonitoringTab.vue";
import TabHeader from "./components/TabHeader.vue";

export default {
  data() {
    var tabs = [
      { id: "modelling", name: 'Modelling' },
      { id: "simulation", name: "Simulation" },
      { id: "code-generation", name: 'Code Generation' },
      { id: "deployment", name: "Deployment" },
      { id: "monitoring", name: "Monitoring & Commanding" }
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
  methods: {},
  computed: {
    currentTabComponent: function() {
      return this.currentTab.id + "-tab";
    }
  }
};
</script>

<style lang="scss">
@import "./settings.scss";
html,
body {
  margin: 0 0;
  font-family: Helvetica, sans-serif;
  user-select: none;
  height: $app-height;
  overflow-y: hidden;
}
</style>
<style lang="scss" scoped>
@import "./settings.scss";
/* Variables are defined in the imported .scss */
#app {
  height: 100%;

  .tab-button-container {
    text-align: center;
    font-size: 1.2em;
    height: $app-height;
    color: $secondary-color;

    .tab-button-header {
      background-color: $primary-color;
      height: $tab-btn-header-height;
      line-height: $tab-btn-header-height;

      img {
        width: 80%;
        vertical-align: middle;
      }
    }

    .tab-button {
      background-color: $secondary-color;
      color: white;
      height: $tab-btn-height;
      line-height: $tab-btn-height;
      vertical-align: middle;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);

      &:hover {
        background-color: $secondary-color-darker;
      }

      &.active {
        background-color: white;
        color: #303133;
      }
    }
  }

  .tab-header {
    box-sizing: border-box;
    height: $tab-header-height;
  }

  .tab-container {
    box-sizing: border-box;
    padding: $tab-container-padding $tab-container-padding;
    height: $tab-container-height;
    overflow: auto;
  }
}
</style>
