<template>
  <div>
    <div class="label">Executable Path</div>
    <el-input v-bind:placeholder="tab.execPath" v-model="tab.execPath">
      <el-button slot="append" icon="el-icon-search" v-on:click="openFileDialog()"></el-button>
    </el-input>
    <div>{{path}}</div>
    <div class="label">Available Resources</div>
    <el-table ref="multipleTable" :data="tab.input" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column property="name" label="Project" show-overflow-tooltip>
      </el-table-column>
      <!-- <el-table-column property="date" label="Modified Date" show-overflow-tooltip>
      </el-table-column>
      <el-table-column property="user" label="Last Modified By" show-overflow-tooltip>
      </el-table-column> -->
    </el-table>
    <div class="btn-container">
      <!-- <el-button type="primary" v-on:click="$emit('model-ready')">Launch Modelling Tool</el-button> -->
      <el-button type="primary" @click="launch()">Launch</el-button>
    </div>
  </div>
</template>

<script>

const { dialog } = require("electron").remote;

export default {
  props: ["tab", "path"],
  data() {
    return {};
  },
  methods: {
    openFileDialog: function() {
      var _this = this;
      dialog.showOpenDialog(function(fileNames) {
        _this.executablePath = fileNames[0];
      });
    },

    launch: function() {
      var _this = this;
      dialog.showMessageBox(
        { message: _this.tab.id },
        function(response) {
          _this.$emit("model-ready");
        }
      );
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>

<style scoped>
.label {
  margin: 30px 0 10px 0;
}

.label:first-of-type {
  margin-top: 0px;
}

.btn-container {
  margin-top: 40px;
  text-align: right;
}
</style>
