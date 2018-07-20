<template>
  <div>
    <div class="label">Available Inputs ({{path}}) </div>
    <file-list :path="inputPath" @state-changed="stateChanged" @folder-selected="folderSelected"></file-list>
  </div>
</template>

<script>
import FileList from "@/components/FileList/FileList.vue";

const path = require("path");

export default {
  props: ["path"],
    
  data() {
    return {
      inputPath: path.join(this.path, "modelling"),
    };
  },
  components: {
    FileList: FileList
  },
  methods: {
    stateChanged: function(folders) {
    },

    folderSelected: function(folder) {
    }
  }
};
</script>

<style lang="scss" scoped>
.label {
  margin: 30px 0 10px 0;
}

.label:first-of-type {
  margin-top: 0px;
}

</style>
