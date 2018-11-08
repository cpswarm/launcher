<template>
  <div>
    <div class="input-container">
      <div class="label">Command Line</div>
      <div class="description">The command line to be executed</div>
      <el-input size="small" :readonly="true" v-model="execPath"></el-input>
    </div>

    <div class="btn-container">
      <el-button-group>
        <el-button title="Launch the application by executing the command line" type="primary" @click="launchUndetached" :disabled="!allowLaunch || isRunning">Launch</el-button>
        <el-button title="Launch the application as detached process" type="primary" @click="launchDetached" :disabled="!allowLaunch || isRunning">Launch Detached</el-button>
        <el-button title="Terminate the subprocess" type="primary" @click="killSubProcess" v-show="currentSubProcess">Terminate Sub-process</el-button>
        <el-button title="Toggle subprocess stdout display" type="primary" @click="toggleTextAreaVisibility"><img :class="['icon-btn', 'dropdown-btn', {expanded: showTextarea}]" src="@/assets/down-arrow.png"></el-button>
      </el-button-group>
    </div>

    <el-collapse-transition>
      <div class="textarea-container" v-show="showTextarea">
        <el-input class="output" ref="output" v-model="textarea" type="textarea" :rows="12" readonly></el-input>
        <el-button title="Clear stdout messages" type="primary" class="clear-btn" @click="clearOutput">Clear</el-button>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
const { spawn } = require("child_process");
const kill = require("tree-kill");

export default {
  // 2 Props:
  // 1. execPath: the command line to be executed
  // 2. allowLaunch: whether launching is allowed
  props: ["tabId", "path"],
  data() {
    return {
      textarea: "",
      showTextarea: false,
      currentSubProcess: null
    };
  },
  methods: {
    launch: function(isDetached) {
      const sp = spawn(this.execPath, {
        shell: true,
        detached: isDetached,
        stdio: isDetached ? "ignore" : "pipe"
      });

      if (sp.stdout) {
        sp.stdout.on("data", data => {
          this.textarea += data.toString();
          if (this.textarea.length > 3000) {
            this.textarea = this.textarea.substring(2000, this.textarea.length);
          }
          setImmediate(() => {
            var outTextArea = this.$refs.output.$refs.textarea;
            outTextArea.scrollTop = outTextArea.scrollHeight;
          });
        });
      }

      if (sp.stderr) {
        sp.stderr.on("data", data => {
          //this.emitError(data.toString());
          this.textarea += data.toString();
          if (this.textarea.length > 3000) {
            this.textarea = this.textarea.substring(2000, this.textarea.length);
          }
          setImmediate(() => {
            var outTextArea = this.$refs.output.$refs.textarea;
            outTextArea.scrollTop = outTextArea.scrollHeight;
          });
        });
      }

      sp.on("exit", code => {
        // Update tab state
        console.log(`Child exited with code ${code}`);
        this.currentSubProcess = null;
        this.$store.commit('setRunning', {tabId: this.tabId, value: false})
      });

      this.currentSubProcess = sp;

      // Emit event
      this.$store.commit('setRunning', {tabId: this.tabId, value: true})
    },

    launchDetached: function() {
      this.launch(true);
    },

    killSubProcess: function() {
      if (this.currentSubProcess) {
        kill(this.currentSubProcess.pid);
        this.currentSubProcess = null;
      }
    },

    launchUndetached: function() {
      // Dispaly the textarea
      this.showTextarea = true;
      this.launch(false);
    },

    emitError: function(err) {
      this.$emit("error", err);
    },

    toggleTextAreaVisibility: function() {
      this.showTextarea = !this.showTextarea;
    },

    clearOutput: function() {
      this.textarea = "";
    }
  },

  computed: {
    allowLaunch: function() {
      return this.$store.getters.getAllowLaunchByTabId(this.tabId)
    },

    isRunning: function() {
      return this.$store.getters.getRunningByTabId(this.tabId)
    },

    execPath: function() {
      return this.$store.getters.getCmdLineByTabId(this.tabId, this.path)
    }
  }
};
</script>

<style lang="scss" scoped>
.input-container {
  margin: 40px 0 20px 0;

  .label {
    margin-bottom: 10px;
    font-size: 1.3em;

    &.disabled {
      color: #bbbbbb;
    }
  }

  .description {
    margin-bottom: 5px;
    color: #888888;
    font-size: 0.9em;
  }

  &:first-of-type {
    margin-top: 0px;
  }
}

.btn-container {
  margin-top: 40px;
  margin-bottom: 20px;
  width: 100%;
  text-align: right;

  .icon-btn {
    height: 0.8em;
    vertical-align: middle;

    &.disabled {
      opacity: 0.4;
    }

    &.dropdown-btn {
      &.expanded {
        transform: rotate(180deg);
      }
    }
  }
}

.textarea-container {
  margin-bottom: 15px;

  .output {
    font-size: 1.1em;
    margin-bottom: 10px;
  }

  .clear-btn {
    float: right;
  }

  &::after {
    content: " ";
    display: block;
    clear: both;
  }
}
</style>
