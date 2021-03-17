<template>
  <div class="one">
    <div class="box">
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="Wait">
          <div v-for="leave in leaves" :key="leave.id">
            
            <div v-for="pass in leave.info.leaveroPass" :key="pass.id">
              <div class="box-detail" v-if="pass.leaveType.length > 0">
                <p>Topic : {{ pass.leaveType }}</p>
                <p>Note : {{ pass.reson }}</p>
                <p>Date : {{ pass.dateStart }} - {{ pass.dateEnd }}</p>
              </div>
              <div v-else>
                <a-empty />
              </div>
            </div>
          </div>
        </a-tab-pane>

        <a-tab-pane key="2" tab="Approve" force-render>
          <div v-for="leave in leaves" :key="leave.id">
            
            <div v-for="pass in leave.info.leavePass" :key="pass.id">
              <div class="box-detail" v-if="pass.leaveType.length > 0">
                <p>Topic : {{ pass.leaveType }}</p>
                <p>Note : {{ pass.reson }}</p>
                <p>Date : {{ pass.dateStart }} - {{ pass.dateEnd }}</p>
              </div>
              <div v-else>
                <a-empty />
              </div>
            </div>
          </div>
        </a-tab-pane>

        <a-tab-pane key="3" tab="Reject">
          <div v-for="leave in leaves" :key="leave.id">
            
            <div v-for="pass in leave.info.leaveNoPass" :key="pass.id">
              <div class="box-detail" v-if="pass.info.leaveNoPass > 0">
                <p>Topic : {{ pass.leaveType }}</p>
                <p>Note : {{ pass.reson }}</p>
                <p>Date : {{ pass.dateStart }} - {{ pass.dateEnd }}</p>
              </div>
              <div v-else>
                hhhhjjjjjj
                <!-- <a-empty /> -->
              </div>
            </div>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      id: this.$route.params.id,
      leaves: null,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      console.log(this.id);
      let res = await axios.get(
        `https://db-back.herokuapp.com/report/leave/userid/${this.id}`
      );
      this.leaves = res.data;
      console.log("get", this.leaves);
    },
    // callback(key) {
    //   console.log(key);
    // },
  },
};
</script>

<style scoped>
.one {
  display: flex;
  justify-content: center;
}
.box {
  width: 280px;
}
.ant-tabs-nav-scroll {
  overflow: auto;
  white-space: initial;
  display: flex;
  justify-content: space-evenly;
  /* width: 8px; */
}
.box-detail {
  border-bottom: 1px solid lightblue;
  margin-bottom: 10px;
  padding-left: 20px;
}
</style>