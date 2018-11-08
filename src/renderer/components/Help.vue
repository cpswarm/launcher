<template>
  <el-dialog :visible="visible" width="80%" :before-close="handleClose">
    <div class="text">
      <h1>How To Use CPSwarm Launcher</h1>
      <h3>Intro</h3>
      <p>
        The CPSwarm Launcher is a desktop application which binds all software components within CPSwarm system together and helps the user navigate through the swarm design process.
      </p>
      <h3>Navigation Menu</h3>
      <p>
        On the left side is the navigation menu, with each tab representing one step in the swarm design process. User can navigate through the steps by switching tabs. Small symbols are shown On the top rignt corner of the tab to indicate the current status of a step. There are three different symbols:
      </p>
      <p><img src="@/assets/running.png"><span> Running: a software component has been launched and is running for this step</span></p>
      <p><img src="@/assets/finish.png"><span> Done: this steps have successfully generated outputs</span></p>
      <p><img src="@/assets/lock.png"><span> Disabled: this steps is disabled, because some prerequisites haven't been met (e.g. no inputs for this step available yet)</span></p>
      <h3>Tab Panel</h3>
      <p>On the right side is the operation panel for each design step. Each step has a specific designed panel to assist the user in a better way. User must specify the path to the software executable in the field "Executable Path" and provide other necessary information for launching the software components. The final command line, which will be executed to launch the component, will be displayed in the field "Command Line". </p>
      <p>There are a couple options in launching the software executable:</p>
      <p><b>"Launch"</b> button: by pressing this button, the software component will be launched against the shown command line as a subprocess of the launcher. However, the subprocess will be terminated, if the launcher exits. 
      <p><span><b>"Launch Detached"</b> button: launch the software component as a detached sub-process, which could continue to run even after the launcher exits</span></p>
      <p><img src="@/assets/close.png"><span> button: only appears when the subprocess is running. By pressing this button, the subprocess is terminated</span></p>
      <p><img src="@/assets/down-arrow.png"><span> button: toggle the stdout textarea</span></p>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleClose">Close</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: ["visible"],
  data() {
    return {};
  },
  methods: {
    handleClose: function() {
      this.$store.commit('setShowHelp', false);
    }
  }
};
</script>

<style lang="scss" scoped>
.text {
  h3 {
    margin-top: 40px;
  }
  h3:first-of-type {
    margin-top: 0px;
  }
  img {
    height: 1em;
    vertical-align: middle;
  }
  img + span {
    vertical-align: middle;
  }
}
</style>
