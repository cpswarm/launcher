<template>
  <div class="container">
    <table>
      <tr>
        <td class="cell name"><img v-bind:src="tab.icon"><span>{{tab.name}}</span></td>
        <td class="cell user">
          <el-button title="Open terminal"  type="primary" circle @click="openTerminal"><img src="@/assets/terminal.png"></el-button>
          <el-button title="Open help page" type="primary" circle @click="openHelp"><img src="@/assets/info.png"></el-button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
const { spawn } = require('child_process')

export default {
  data () {
    return {}
  },
  props: ['tab', 'path'],
  methods: {
    openTerminal: function () {
      var shellExec = ''
      if (process.platform === 'win32') {
        shellExec = 'cmd.exe'
      }

      if (process.platform === 'linux' || process.platform === 'darwin') {
        shellExec = '/bin/sh'
      }

      spawn(shellExec, [], {
        cwd: this.path,
        shell: true,
        detached: true,
        stdio: 'ignore'
      })
    },

    openHelp: function () {
      this.$emit('open-help')
    },

    emitError: function (err) {
      this.$emit('error', err)
    }
  },
  computed: {}
}
</script>

<style lang="scss" scoped>
@import "@/settings.scss";
.container {
  padding: 0 20px;
  background-color: $secondary-color;
  height: 100%;
  position: relative;
  &::before {
    @include pseudo-shadow;
  }

  table {
    height: 100%;
    width: 100%;
    .cell {
      vertical-align: middle;
      &.name {
        width: 70%;
        text-align: left;
        font-size: 1.4em;
        span {
          vertical-align: middle;
        }
        img {
          vertical-align: middle;
          height:  1.5em;
          margin-right: 15px;
        }
      }
      &.user {
        width: 30%;
        text-align: right;
        span {
          vertical-align: middle;
          margin-right: 10px;
        }
        img {
          height: 1.5em;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
