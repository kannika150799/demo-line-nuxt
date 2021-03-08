<template>
  <div class="container-page-status">
    <p class="text-head">Report requset for leave</p>
    <div class="box-card" v-for="info in infos" :key="info">
      <p>{{ info.info.leave.length > 0 ? info.info.name : '' }}</p>
      <p>จำนวนการลา(อนุมัติ): {{info.info.numApprove}} ครั้ง</p>
      <p>จำนวนการลา(ไม่อนุมัติ): {{info.info.numDisapproval}} ครั้ง</p>
      <div v-for="check in info.info.leave" :key="check">
        <p>หัวข้อการลา: {{ check.leaveType }}</p>
        <p>วันที่ลา: {{check.dateStart}} - {{check.dateEnd}}</p>
        <p>สถานะ: {{check.status}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      infos: null,
    };
  },
  mounted() {
    // liff.init({ liffId: "1655660869-Pbzr7e7X" });
    this.getData();
  },
  methods: {
    async getData() {
      const res = axios
        .get('https://db-back.herokuapp.com/report/leave').then((res) => {
          this.infos = res.data;
          console.log("get", this.infos);
        });
    },
  },
};
</script>

<style scoped>
.container-page-status {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15px;
}
.text-head {
  font-size: 20px;
  font-weight: 600;
}
.box-card {
  /* border: 2px solid navy; */
  padding: 10px;
  /* border-radius: 10px; */
}
</style>