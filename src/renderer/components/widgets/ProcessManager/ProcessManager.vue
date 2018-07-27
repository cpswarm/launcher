<template>
  <div>

    <div class="btn-container">
      <el-button-group>
        <el-button type="primary" @click="launchUndetached" :disabled="!allowLaunch">Launch</el-button>
        <el-button type="primary" @click="launchDetached" :disabled="!allowLaunch"><img :class="['icon-btn', {disabled: !allowLaunch}]" src="@/assets/external.png"></el-button>
        <el-button type="primary" @click="killSubProcess" v-show="currentSubProcess"><img :class="['icon-btn']" src="@/assets/close.png"></el-button>
        <el-button type="primary" @click="toggleTextAreaVisibility"><img :class="['icon-btn', 'dropdown-btn', {expanded: showTextarea}]" src="@/assets/down-arrow.png"></el-button>
      </el-button-group>
    </div>

    <el-collapse-transition>
      <div class="textarea-container" v-show="showTextarea">
        <el-input class="output" ref="output" v-model="textarea" type="textarea" :rows="12" readonly></el-input>
        <el-button type="primary" class="clear-btn" @click="clearOutput">clear</el-button>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
const { spawn } = require("child_process");
const kill  = require('tree-kill');

export default {
  // 2 Props:
  // 1. execPath: the command line to be executed
  // 2. allowLaunch: whether launching is allowed
  props: ["execPath", "allowLaunch"],
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
          this.emitError(data.toString());
        });
      }

      sp.on("exit", code => {
        // Update tab state
        console.log(`Child exited with code ${code}`);
        this.currentSubProcess = null;
        this.$emit("process-ended", code);
      });

      this.currentSubProcess = sp;

      // Emit event
      this.$emit("process-started", "");
    },

    launchDetached: function() {
      this.launch(true);
    },

    killSubProcess: function() {
      if(this.currentSubProcess) {
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

  watch: {}
};
</script>

<style lang="scss" scoped>
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
  .output {
    font-size: 1.1em;
    margin-bottom: 10px;
  }
}
</style>
