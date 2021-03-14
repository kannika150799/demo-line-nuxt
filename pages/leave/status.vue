<template>
  <div class="container-page-status">
    <p class="text-head">Status</p>
    <div class="box-card" v-for="leave in leaves" :key="leave.userId">
      <p>หัวข้อการลา: {{ leave.leaveType }}</p>
      <p>หมายเหตุการลา: {{ leave.reson }}</p>
      <p>วันที่ลา: {{ leave.dateStart }} - {{ leave.dateEnd }}</p>
      <p>{{ leave.status }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  mounted() {
    liff.init({liffId: "1655743042-do9lERxa",}).then(() => {
      this.$nextTick(() => {
        this.$nuxt.$loading.start();
        if (liff.isLoggedIn()) {
          liff.getProfile().then((profile) => {
            this.leaves.userId = profile.userId;
            this.getData();
          });
        } else {
          liff.login();
        }
      });
      // if (liff.isLoggedIn()) {
      //     liff.getProfile().then((profile) => {
      //       this.leaves.userId = profile.userId;
      //       this.getData();
      //     });
      //   } else {
      //     liff.login();
      //   }
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
      },
    };
  },
  methods: {
    async getData() {
      const res = await axios.get(
        `https://db-back.herokuapp.com/api/get/leaveByUser/${this.leaves.userId}`
      );
      this.leaves = res.data;
      console.log("get", this.leaves);
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
  font-size: 34px;
  font-weight: 600;
}
.box-card {
  /* border: 2px solid navy;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 15px; */
  background-color: whitesmoke;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 3px 4px 13px rgb(17 15 14 / 20%),
    3px 4px 13px rgb(168 223 216 / 16%);
  width: 70%;
  margin-bottom: 30px;
}
</style>