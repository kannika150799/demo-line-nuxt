<template>
  <div class="container-Check bg">
    <p class="date text-date2" v-text="currentDate"></p>
    <!-- <p class="date" v-text="currentDate2"></p> -->
    <p class="time" v-text="currentTimeIn"></p>

    <a-button
      :block="isActiveIn"
      class="check-button"
      type="primary"
      @click="checkIn"
    >
      Check in
    </a-button>
    <a-button
      :block="isActiveOut"
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
      currentDate2: null,
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
    // this.$nextTick(() => {
    //   this.$nuxt.$loading.start();
    // });
    liff.init({ liffId: "1655743042-1qqDlBON" })
    // .then(() => {
    //   if (liff.isLoggedIn()) {
    //     liff.getProfile().then((profile) => {
    //       this.inOut.userId = profile.userId;
    //       this.isDone();
    //     });
    //   } else {
    //     this.$nextTick(() => {
    //       this.$nuxt.$loading.finish();
    //     });
    //     liff.login();
    //   }
    // });
  },
  created() {
    setInterval(() => this.updateCurrentTimeIn(), 1 * 1000);
    setInterval(() => this.updateCurrentTimeOut(), 1 * 1000);
    setInterval(() => this.updateCurrentDate(), 200);
  },
  methods: {
    async isDone() {
      await axios
        .get(`https://db-back.herokuapp.com/api/get/check/${this.inOut.userId}`)
        .then((res) => {
          this.$nextTick(() => {
            setTimeout(() => this.$nuxt.$loading.finish(), 1000);
          });
          if (res.data == null) {
            console.log("res1", res.data);
            this.isActiveIn = false;
            this.isActiveOut = true;
          } else if (res.data != null) {
            console.log("res2", res.data);
            if (res.data.timeOut != "") {
              this.isActiveIn = false;
              this.isActiveOut = true;
            } else {
              this.isActiveIn = true;
              this.isActiveOut = false;
            }
          }
        });
    },
    updateCurrentTimeIn() {
      this.currentTimeIn = moment().format("LTS");
    },
    updateCurrentTimeOut() {
      this.currentTime = moment().format("LTS");
    },
    updateCurrentDate() {
      this.currentDate = moment().format("dddd MMMM Do YYYY");
      this.currentDate2 = moment().format("MMMM Do YYYY");
      this.currentDateFormat1 = moment().format();
      this.currentDateFormat2 = moment().format("l");

      this.inOut.momentDate = this.currentDate;
      this.inOut.momentDate2 = this.currentDate2;
      this.inOut.dateShow = this.currentDateFormat1;
      this.inOut.dateGet = this.currentDateFormat2;
    },
    checkIn() {
      this.inOut.timeIn = this.currentTimeIn;
      this.$axios
        .post("https://db-back.herokuapp.com/api/post/checkIn", this.inOut)
        .then((res) => {
          window.location.reload();
          console.log("checkIn", this.inOut);
          console.log("res", res.data);
        });
    },
    checkOut() {
      this.inOut.timeOut = this.currentTime;
      this.$axios
        .put(
          `https://db-back.herokuapp.com/api/update/checkout/${this.inOut.userId}`,
          { timeOut: this.inOut.timeOut }
        )
        .then((res) => {
          window.location.reload();
          console.log("checkOut", this.inOut);
          console.log("res", res.data);
        });
    },
  },
};
</script>

<style scoped>
.bg {
  /* background: lavender;; */
  /* background: radial-gradient(ellipse at center,  #0a2e38  0%, #000000 70%); */
  background-size: 100%;
}
.text-date2 {
  margin-top: 20px;
}
.container-Check {
  width: 100%;
  height: 100%;
  /* margin-top: 30px; */
  color: #020202;
  text-align: center;
  text-align: -webkit-center;
  position: absolute;
  left: 50%;
  top: 50%;
  padding-top: 30px;
  transform: translate(-50%, -50%);
  /* text-shadow: 0 0 20px rgb(10 175 230), 0 0 20px rgb(10 175 230 / 0%); */
}
.date {
  /* font-family: Dosis; */
  font-size: 30px;
  font-weight: 600;
}
.time {
  /* font-family: Dosis; */
  margin: 0px 0px 60px;
  font-size: 40px;
  font-weight: 600;
}
.check-button {
  /* font-family: Dosis; */
  width: 120px;
  height: 50px;
  margin: 0 10px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 27px;
  border: 2px solid;
  box-shadow: 3px 4px 13px rgb(255 255 255 / 10%),
    3px 4px 13px rgb(168 223 216 / 20%);
}
.btn1 {
  background-color: transparent;
  color: blue;
}
.btn2 {
  background-color: transparent;
  color: red;
}
</style>