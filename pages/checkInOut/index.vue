<template>
  <div class="container-Check">
    <p class="date" v-text="currentDate"></p>
    <p class="time" v-text="currentTimeIn"></p>
    
      <a-button
        :disabled="isActiveIn"
        class="check-button"
        type="primary"
        @click="checkIn"
      >
        Check in
      </a-button>
      <a-button
        :disabled="isActiveOut"
        class="check-button"
        type="danger"
        @click="checkOut"
      >
        Check out
      </a-button>
    
  </div>
</template>

<script>
import axios from "axios";
const moment = require("moment");
export default {
  data() {
    return {
      currentTimeIn: null,
      currentDate: null,
      inOut: {
        userId: "",
        timeIn: "",
        timeOut: "",
        dateShow: "",
        dateGet: "",
      },
      isActiveIn: null,
      isActiveOut: null,
      status: "",
    };
  },
  mounted() {
    liff
      .init({
        liffId: "1655660869-WGeG202o",
      })
      .then(() => {
        if (liff.isLoggedIn()) {
          liff.getProfile().then((profile) => {
            this.inOut.userId = profile.userId;
            this.isDone();
          });
        } else {
          liff.login();
        }
      });
  },
  created() {
    setInterval(() => this.updateCurrentTimeIn(), 1 * 1000);
    setInterval(() => this.updateCurrentTimeOut(), 1 * 1000);
    setInterval(() => this.updateCurrentDate(), 200);
  },
  methods: {
    async isDone() {
      let res = await axios.get(
        `https://db-back.herokuapp.com/api/get/check/${this.inOut.userId}`
      );
      if (res.data == null) {
        console.log("res1", res.data);
        this.isActiveIn = false;
        this.isActiveOut = true;
      } else if (res.data != null) {
        console.log("res2", res.data);
        if (res.data.timeOut != "") {
          this.isActiveIn = true;
          this.isActiveOut = true;
        } else {
          this.isActiveIn = true;
          this.isActiveOut = false;
        }
      }
    },
    updateCurrentTimeIn() {
      this.currentTimeIn = moment().format("LTS");
    },
    updateCurrentTimeOut() {
      this.currentTime = moment().format("LTS");
    },
    updateCurrentDate() {
      this.currentDate = moment().format("dddd, l");
      this.currentDateFormat1 = moment().format();
      this.currentDateFormat2 = moment().format("l");

      this.inOut.momentDate = this.currentDate;
      this.inOut.dateShow = this.currentDateFormat1;
      this.inOut.dateGet = this.currentDateFormat2;
    },
    checkIn() {
      this.inOut.timeIn = this.currentTimeIn;
      this.$axios.post(
        "https://db-back.herokuapp.com/api/post/checkIn",
        this.inOut
      );
      console.log("checkIn", this.inOut);
      window.location.reload();
    },
    checkOut() {
      this.inOut.timeOut = this.currentTime;
      this.$axios.put(
        `https://db-back.herokuapp.com/api/update/checkout/${this.inOut.userId}`,
        { timeOut: this.inOut.timeOut }
      );
      window.location.reload();
      console.log("checkOut", this.inOut);
    },
  },
};
</script>

<style scoped>
.container-Check {
  width: 100%;
  margin-top: 30px;
  color: #000000;
  text-align: center;
  text-align: -webkit-center;
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translate(-50%, -50%);
  /* text-shadow: 0 0 20px rgba(10, 175, 230, 1), 0 0 20px rgba(10, 175, 230, 0); */
}
.date {
  font-size: 30px;
  font-weight: 600;
}
.time {
  margin-top: 60px;
  font-size: 60px;
  font-weight: 600;
}
.check-button {
  width: 120px;
  height: 55px;
  margin: 0px 10px;
  font-size: 16px;
  font-weight: 600;
}
</style>