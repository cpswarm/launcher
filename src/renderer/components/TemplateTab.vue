<template>
  <div>
    <div class="label">Command Line</div>
    <el-input :readonly="true" v-model="status.commandLine"></el-input>
    <component :is="id" :id="id" :path="path" @status-changed="handleStatusChange"></component>
    <process-manager :execPath="status.commandLine" :allowLaunch="status.allowLaunch" @process-started="processStarted" @process-ended="processEnded"></process-manager>
  </div>
</template>

<script>
import ModellingTab from "@/components/tabs/ModellingTab.vue";
import SimulationTab from "@/components/tabs/SimulationTab.vue";
import CodeGenerationTab from "@/components/tabs/CodeGenerationTab.vue";
import DeploymentTab from "@/components/tabs/DeploymentTab.vue";
import MonitoringTab from "@/components/tabs/MonitoringTab.vue";
import ProcessManager from "@/components/process-manager/ProcessManager.vue";
const path = require("path");

export default {
    props: ["id", "path"],

    data() {
      return {
        // The status of this tab
        // enabled: it means the component in this tab has enough inputs to be launched
        // running: it means the component has been launched and is still running
        status: {
          enabled: true,
          done: false,
          running: false,
          allowLaunch: false,
          commandLine: ""
        }
      };
    },
    components: {
      ProcessManager: ProcessManager,
      Modelling: ModellingTab,
      Simulation: SimulationTab,
      CodeGeneration: CodeGenerationTab,
      Deployment: DeploymentTab,
      Monitoring: MonitoringTab
    },
    methods: {
      processStarted: function() {
        this.status.running = true;
        this.emitStatus();
      },

      processEnded: function() {
        this.status.running = false;
        this.emitStatus();
      },

      handleStatusChange: function(status) {
        for (var key in status) {
          this.status[key] = status[key];
        }
        this.emitStatus();
      },

      emitStatus: function() {
        this.$emit("status-changed", this.id, this.status);
      },

      handleError: function(err) {
        this.$notify.error({
          title: "Error",
          message: err.toString()
        });
      }
    },
    computed: {}
  }

</script>

<style lang="scss" scoped>
.label {
  margin: 30px 0 10px 0;
}

.label:first-of-type {
  margin-top: 0px;
}
</style>
