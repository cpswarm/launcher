<template>
  <div>

    <table class="btn-container">
      <tr>
        <td class="cell toggle">
          <span @click="toggleTextAreaVisibility" class="toggleButton">Process Output
            <span v-show="showTextarea">-</span>
            <span v-show="!showTextarea">+</span>
          </span>
        </td>
        <td class="cell launch">
          <el-button class="button" type="primary" @click="launch()" :disabled="!allowLaunch">Launch</el-button>
        </td>
      </tr>
    </table>
    <el-collapse-transition>
      <div v-show="showTextarea">
        <el-input ref="output" v-model="textarea" type="textarea" :rows="12"></el-input>
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
        "C:\\Users\\Administrator\\Desktop\\test\\my.bat"
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
        console.log(data.toString());
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

    toggleTextAreaVisibility: function() {
      this.showTextarea = !this.showTextarea;
    }
  },

  watch: {}
};
</script>

<style lang="scss" scoped>
// .btn-container {
//   margin-top: 40px;
//   margin-bottom: 20px;
//   text-align: right;

//   .toggleButton {
//     float: left;
//     font-size: 0.97em;
//     color: #555555;
//   }

//   .button {
//   }

//   span {}
// }

.btn-container {
  margin-top: 40px;
  margin-bottom: 20px;
  width: 100%;
  .cell {
    width: 50%;
    &.toggle {
      text-align: left;
      font-size: 0.96em;
      color: #555555;
    }
    &.launch {
      text-align: right;
    }
  }
}
</style>
