<template>
  <div>
    <div class="label">Command Line</div>
    <el-input :readonly="true" v-model="commandLine"></el-input>
    <tab-content></tab-content>
    <process-manager :execPath="commandLine" :allowLaunch="allowLaunch" @process-started="processStarted" @process-ended="processEnded"></process-manager>
  </div>
</template>

<script>
import ProcessManager from "@/components/process-manager/ProcessManager.vue";
const path = require("path");

export default function() {
  return {
    props: ["id", "path"],

    data() {
      return {
        // The status of this tab
        // enabled: it means the component in this tab has enough inputs to be launched
        // running: it means the component has been launched and is still running
        status: {
          enabled: true,
          done: false,
          running: false
        },

        isProcessRunning: false
      };
    },
    components: {
      TabContent: () => {
        return import("@/components/process-manager/TestComponent.vue");
        //return import(componentPath);
      },
      ProcessManager: ProcessManager
    },
    methods: {
      processStarted: function() {
        this.isProcessRunning = true;
        this.updateStatus();
      },

      processEnded: function() {
        this.isProcessRunning = false;
        this.updateStatus();
      },

      updateStatus: function() {
        // Update status and emit event to parent
        this.status.done = false;
        for (var i in this.inputFolders) {
          console.log(this.inputFolders[i].empty);
          if (!this.inputFolders[i].empty) {
            this.status.done = true;
            break;
          }
        }
        this.status.enabled = true; // TODO: This is just a naive method
        this.status.running = this.isProcessRunning;
        this.$emit("status-changed", this.id, this.status);
      },

      handleError: function(err) {
        console.log("got error");
        this.$notify.error({
          title: "Error",
          message: err.toString()
        });
      }
    },
    computed: {}
  };
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
