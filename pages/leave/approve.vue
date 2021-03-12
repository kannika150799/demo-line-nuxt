<template>
  <div class="container-page-status">
    <p class="text-head">Approve Leaving</p>
    <div class="box-card" v-for="leave in leaves" :key="leave.userId">
      <p>Name {{ leave.name }}</p>
      <p>Leave topic {{ leave.leaveType }}</p>
      <p>Leave Note {{ leave.reson }}</p>
      <p>Date {{ leave.dateStart }} - {{ leave.dateEnd }}</p>
      <div class="btn">
        <a-button class="approve-button" type="primary" @click="approve(leave.id)">
        Approve
        </a-button>
        <a-button class="approve-button" type="danger" @click="disapproval(leave.id)">
          Disapproval
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  mounted() {
    // liff
    //   .init({
    //     liffId: "1655736391-Xkb94MeP",
    //   })
    //   .then(() => {
    //     if (liff.isLoggedIn()) {
    //       liff.getProfile().then((profile) => {
    //         this.leaves.userId = profile.userId;
    //         this.getData();
    //       });
    //     } else {
    //       liff.login();
    //     }
    //   });
    //  liff.init({liffId: "1655736391-Xkb94MeP"})
     this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    this.getData();
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
      const res = await axios.get(
        "https://db-back.herokuapp.com/api/get/approve"
      );
      this.leaves = res.data;
      console.log("get", this.leaves);
    },
    approve(id) {
      this.leaves.status = "อนุมัติ";
      // this.$axios.put(`https://db-back.herokuapp.com/api/updateStatus/${id}`, {status: this.leaves.status});
      // console.log("id", id);
      // console.log("status", this.leaves);
      this.putApprove(id);
    },
    disapproval(id) {
      this.leaves.status = "ไม่อนุมัติ";
      // this.$axios.put(`https://db-back.herokuapp.com/api/updateStatus/${id}`, {status: this.leaves.status});
      this.putApprove(id);
    },
    putApprove(id) {
      this.$axios
        .put(`https://db-back.herokuapp.com/api/updateStatus/${id}`, {
          status: this.leaves.status,
        })
        .then((res) => {
          window.location.reload();
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
  margin-top: 15px;
}
.text-head {
  font-size: 34px;
  font-weight: 700;
  margin-bottom: 1em;
  color: #055B5C;
}
.box-card {
  border: 2px solid transparent;
  box-shadow: 3px 4px 13px rgb(17 15 14 / 20%), 3px 4px 13px rgb(168 223 216 / 16%);
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 15px;
  width: 80%;
}
.approve-button {
  width: 100px;
  height: 44px;
  margin: 15px 7px 0px;
  box-shadow:  3px 4px 13px  rgba(11, 13, 14, 0.17), 3px 4px 13px rgba(168, 223, 216, 0.156);
  padding: 10px;
}
p{
  font-size: 16px;
  margin: 0.25em;
}
.btn{
  text-align-last: center;
}
.v-application {
  background-color: #00a86b;
}
</style>