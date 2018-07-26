<template>
  <div>

    <div class="btn-container">
      <el-button-group>
        <el-button type="primary" @click="launch" :disabled="!allowLaunch">Launch</el-button>
        <el-button type="primary" @click="toggleTextAreaVisibility"><img :class="['dropdown-btn', {expanded: showTextarea}]" src="@/assets/down-arrow.png"></el-button>
      </el-button-group>
    </div>

    <el-collapse-transition>
      <div v-show="showTextarea">
        <el-input class="output" ref="output" v-model="textarea" type="textarea" :rows="12"></el-input>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
const { spawn } = require("child_process");

export default {
  // 2 Props:
  // 1. execPath: the command line to be executed
  // 2. allowLaunch: whether launching is allowed
  props: ["execPath", "allowLaunch"],
  data() {
    return {
      textarea: "",
      showTextarea: false
    };
  },
  methods: {
    launch: function() {
      const bat = spawn("cmd.exe", [
        "/c",
        this.execPath
      ]);

      bat.stdout.on("data", data => {
        this.textarea += data.toString();
        if (this.textarea.length > 3000) {
          this.textarea = this.textarea.substring(2000, this.textarea.length);
        }
        setImmediate(() => {
          var outTextArea = this.$refs.output.$refs.textarea;
          outTextArea.scrollTop = outTextArea.scrollHeight;
        });
      });

      bat.stderr.on("data", data => {
        this.emitError(data.toString());
      });

      bat.on("exit", code => {
        // Update tab state
        console.log(`Child exited with code ${code}`);
        this.$emit("process-ended", code);
      });

      // Dispaly the textarea
      this.showTextarea = true;

      // Emit event
      this.$emit("process-started", "");
    },

    emitError: function(err) {
      this.$emit("error", err)
    },

    toggleTextAreaVisibility: function() {
      this.showTextarea = !this.showTextarea;
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

  .dropdown-btn {
    height: 0.8em;
    vertical-align: middle;

    &.expanded {
      transform: rotate(180deg);
    }
  }
}

.output {
  font-size: 1.1em;
}
</style>
