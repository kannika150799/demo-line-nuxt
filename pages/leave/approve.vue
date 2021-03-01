<template>
  <div class="container-page-status">
    <p class="text-head">Approve leaving</p>
    <div class="box-card" v-for="leave in leaves" :key="leave.userId">
      <p>ชื่อ: {{ leave.name }}</p>
      <p>หัวข้อการลา: {{ leave.leaveType }}</p>
      <p>หมายเหตุการลา: {{ leave.reson }}</p>
      <p>วันที่ลา: {{ leave.dateStart }} - {{ leave.dateEnd }}</p>
      <a-button class="approve-button" type="primary" @click="approve">
        อนุมัติ
      </a-button>
      <a-button class="approve-button" type="primary" @click="disapproval">
        ไม่อนุมัติ
      </a-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  mounted() {
    liff
      .init({
        liffId: "1655660869-nvMGoZo6",
      })
      .then(() => {
        if (liff.isLoggedIn()) {
          liff.getProfile().then((profile) => {
            this.leaves.userId = profile.userId;
            this.getData();
          });
        } else {
          liff.login();
        }
      });
  },
  data() {
    return {
      // leaves: null
      leaves: {
        userId: "",
        leaveType: "",
        reson: "",
        startValue: "",
        endValue: "",
        dateStart: "",
        dateEnd: "",
        status: "",
        id: "",
        name: "",
      },
    };
  },
  methods: {
    async getData() {
      const res = await axios.get("https://db-back.herokuapp.com/api/get/approve");
      this.leaves = res.data;
      console.log("get", this.leaves);
    },
    approve() {
      this.leaves.status = "อนุญาติ";
      this.putApprove();
    },
    disapproval() {
      this.leaves.status = "ไม่อนุญาติ";
      this.putApprove();
    },
    putApprove() {
      this.$axios.put(`https://db-back.herokuapp.com/api/edit/calendar/${this.leaves.id}`,this.leaves);
      console.log("put", this.leaves);
    },
  },
};
</script>

<style scoped>
.container-page-status {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
}
.text-head {
  font-size: 20px;
  font-weight: 600;
}
.box-card {
  border: 2px solid navy;
  padding: 10px;
  border-radius: 10px;
}
.approve-button {
  width: 100px;
  height: 44px;
}
</style>