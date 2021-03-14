<template>
  <div class="container-Check">
    <p class="date text-date2" v-text="currentDate2"></p>
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
    liff
      .init({
        liffId: "1655743042-1qqDlBON",
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
          this.isActiveIn = false;
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
      this.currentDate = moment().format("dddd");
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
.text-date2 {
  margin-top: 20px;
}
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
  margin: 0px 0px 60px;
  font-size: 40px;
  font-weight: 600;
}
.check-button {
  width: 120px;
  height: 50px;
  margin: 0 10px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 27px;
  box-shadow: 3px 4px 13px rgb(17 15 14 / 10%),
    3px 4px 13px rgb(168 223 216 / 16%);
}
</style>