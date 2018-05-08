<template>
  <div>
    <div class="label">Description of the goal</div>
    <el-input type="textarea" :autosize="{ minRows: 6}" placeholder="Please input"></el-input>
    <div class="label">Type of CPS</div>
    <el-select v-model="cpsType" placeholder="Select">
      <el-option v-for="t in cpsTypes" :key="t.value" :label="t.label" :value="t.value">
      </el-option>
    </el-select>
    <div class="label">Swarm Algorithm</div>
    <el-select v-model="swarmAlg" placeholder="Select">
      <el-option v-for="a in swarmAlgs" :key="a.value" :label="a.label" :value="a.value">
      </el-option>
    </el-select>
    <div class="btn-container">
      <el-button type="primary">Launch Modelling Tool</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cpsTypes: [
        {
          value: "uav_sn_123",
          label: "UAV SN 123"
        },
        {
          value: "rover_sn_456",
          label: "Rover SN 456"
        }
      ],
      cpsType: "",

      swarmAlgs: [
        {
          value: "beeclust",
          label: "BEECLUST"
        },
        {
          value: "fish_schooling",
          label: "Fish Schooling"
        }
      ],
      swarmAlg: ""
    };
  },
  methods: {},
  computed: {}
};
</script>

<style>
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
