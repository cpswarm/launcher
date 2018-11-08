<template>
  <div v-bind:class="['tab-button', { selected: isSelected  }]" v-on:click="selectTab" >
    <div>
      <div class="icon"><img v-bind:src="tab.icon"></div>
      <div class="text">{{tab.name}}</div>
      <div class="status">
        <img v-if="isRunning" src="@/assets/running.png" title="An application is running as subprocess for this step">
        <img v-if="isDone" src="@/assets/finish.png" title="This step has successfully generated at least one output">
        <img v-if="!isEnabled" src="@/assets/lock.png" title="This step is disabled because no proper input is available">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["tab"],
  data() {
    return {}
  },
  methods: {
    selectTab: function () {
      this.$store.commit('selectTab', this.tab.id)
    },

  },
  computed: {
    isSelected: function() {
      return this.$store.state.selectedTab.id === this.tab.id
    },

    isEnabled: function() {
      return this.$store.getters.getEnabledByTabId(this.tab.id)
    },

    isDone: function() {
      return this.$store.getters.getDoneByTabId(this.tab.id)
    },

    isRunning: function() {
      return this.$store.state[this.tab.id].running
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/settings.scss";

.tab-button {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  background-color: $secondary-color;
  color: #303133;
  font-size: 1em;
  height: $tab-btn-height; // Actually implied flex 0 1 $tab-btn-height

  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;

  // This selector selects all .tab-button, which has a sibling and preceding .tab-button
  // So basically all .tab-button except the first one
  border-top: 1px solid transparent;
  & ~ .tab-button {
    border-top: 1px solid $secondary-color-darker;
  }

  &::before {
    @include pseudo-shadow;
  }

  &:hover {
    background-color: $secondary-color-darker;
    &.disabled {
      background-color: $secondary-color;
    }
    &.selected {
      background-color: transparent;
    }
  }

  &.disabled {
    cursor: not-allowed;
    border-top: 1px solid transparent;
    // The white opaque overlay
    &::after {
      background: white;
      opacity: 0.5;
      content: "";
      position: absolute;
      top: -1px; // This is to compensate the border width
      bottom: 0;
      left: 0;
      right: 0;
    }

    & + .tab-button {
      border-top: 1px solid transparent;
    }
  }

  &.selected {
    background: transparent;
    border-top: 1px solid transparent;
    &::before {
      box-shadow: none;
    }

    & + .tab-button {
      border-top: 1px solid transparent;
    }
  }

  .icon {
    img {
      height: 1.5em;
    }
  }

  .status {
    position: absolute;
    // top: 50%;
    // transform: translateY(-50%);
    top: 10px;
    right: 10px;
    img {
      height: 1em;
      margin-left: 0.5em;
    }
  }
}
</style>
