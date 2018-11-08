<template>
  <div class="tab-content" v-show="isVisible" >
    <div class="overlay" v-show="!isEnabled"></div>
    <widget-wrapper v-for="(widget, index) in tab.widgets" :key="index" :widget="widget" :varId="widget.varId" :tabId="tab.id"  @error="emitError"></widget-wrapper>
    <process-manager :tabId="tab.id" @error="emitError"></process-manager>
  </div>
</template>

<script>
import ProcessManager from "@/components/widgets/ProcessManager/ProcessManager.vue";
import WidgetWrapper from "@/components/WidgetWrapper.vue";
const path = require("path");

export default {
  props: ["tab"],

  data() {
    // Initialize status of each widget
    for (let i in this.tab.widgets) {
      let widget = this.tab.widgets[i];
      widget.status = { visible: true, enabled: true };
    }

    return {
      // The status of this tab
      // enabled: it means the component in this tab has enough inputs to be launched
      // running: it means the component has been launched and is still running
      id: this.tab.id
    };
  },
  components: {
    ProcessManager,
    WidgetWrapper
  },
  methods: {

    emitError: function(err) {
      this.$emit("error", err);
    }
  },
  computed: {
    isEnabled: function() {
      return this.$store.getters.getEnabledByTabId(this.tab.id)
    },

    isVisible: function() {
      return this.$store.state.selectedTab.id === this.tab.id
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/settings.scss";

.tab-content {
  font-size: 0.9em;
  padding: 0 $tab-container-padding;
  position: relative;

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: white;
    opacity: 0.5;
  }

}
</style>
