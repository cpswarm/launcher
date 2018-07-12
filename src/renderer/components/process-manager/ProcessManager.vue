<template>
  <div>
    
    <div class="btn-container">
      <el-button type="primary" @click="launch()" :disabled="allowLaunch">Launch</el-button>
    </div>
    <el-input ref="output2" v-model="textarea" v-show="showTextarea" type="textarea" :rows="12"></el-input>
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
        "C:\\Users\\liang\\Desktop\\test\\my.bat"
      ]);

      bat.stdout.on("data", data => {
        this.textarea += data.toString();
        setImmediate(() => {
          var outTextArea = this.$refs.output2.$refs.textarea;
          outTextArea.scrollTop = outTextArea.scrollHeight;
        })
        
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

    changeDetected: function() {
      console.log("lalal");
    }
  },

  watch: {}
};
</script>

<style lang="scss" scoped>
.btn-container {
  margin-top: 40px;
  text-align: right;
}
</style>
