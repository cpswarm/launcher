<template>
  <div id="app">
    <el-row class="content-container">
      <el-col :span="7" class="tab-button-container">
        <div class="tab-button-header">
          <span class="text">
            CPSwarm Launcher
          </span>
          <div class="image"><img src="@/assets/swarm.png"></div>
        </div>
        <el-row v-for="tab in tabs" v-bind:key="tab.id">
          <div v-on:click="selectTab(tab)" v-bind:class="['tab-button', { active: currentTab.id === tab.id }, {disabled: !tab.enabled}, {enabled: tab.enabled}]">
            <el-col :span="6" class="btn-icon"><img v-bind:src="tab.icon"></el-col>
            <el-col :span="14" class="btn-text">
              <span>{{tab.name}}</span>
            </el-col>
            <el-col :span="4" v-if="tab.isDone" class="btn-icon"><img src="@/assets/checked.png"></el-col>
          </div>
        </el-row>
        <div class="tab-button-filler"></div>
      </el-col>
      <el-col :span="17" class="whole-tab-container">
        <tab-header v-bind:tab="currentTab" class="tab-header"></tab-header>
        <div class="tab-container">
          <generic-tab v-bind:tab="currentTab" v-bind:path="path"></generic-tab>
        </div>
      </el-col>
    </el-row>
  </div>
</template> 

<script>
// Import events module
const events = require("events");
const chokidar = require("chokidar");
const fs = require("fs");
var fw = require("@/components/FileWatcher.js");

import GenericTab from "@/components/GenericTab.vue";
import TabHeader from "@/components/TabHeader.vue";

import { getTabs } from "@/components/TabData.js";

export default {
  // The directory path of the launcher project
  props: ["path"],
  data() {
    var tabs = getTabs();
    var eventEmitter = new events.EventEmitter();
    var fileWatcher = fw(eventEmitter);
    return {
      tabs: tabs,
      currentTab: tabs[0],
      emitter: eventEmitter,
      watcher: fileWatcher
    };
  },
  components: {
    GenericTab: GenericTab,
    TabHeader: TabHeader
  },

  methods: {
    selectTab: function(tab) {
      if (tab.enabled) {
        this.currentTab = tab;
      }
    }
  },

  watch: {
    path: function(newPath, oldPath) {
      // Close previous file watcher
      if (newPath === oldPath) {
        // TODO: need to test the triple equal signs
        return;
      }
      this.watchFile(this.tabs, newPath);
    }
  },
  computed: {},
  mounted() {
    for (var i in this.tabs) {
      this.watcher.watch(
        this.tabs[i].id,
        this.path + "\\" + this.tabs[i].inputPath
      );
    }

    this.emitter.on(
      "file",
      function(id, files) {
        var tabs = this.tabs;
        for (var i in tabs) {
          if (tabs[i].id === id) {
            tabs[i].input = [];
            files.forEach(function(file) {
              tabs[i].input.push({ name: file });
            });
          }
        }
      }.bind(this)
    );
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
            margin-left: -200px;
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
        line-height: $tab-btn-height;
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
          height: 25px;
          img {
            height: 100%;
            vertical-align: middle;
          }
        }

        .btn-text {
          text-align: left;
        }

        // Help to vertical align the icon and the thing
        .helper {
          display: inline-block;
          height: 100%;
          vertical-align: middle;
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
