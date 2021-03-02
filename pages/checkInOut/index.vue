<template>
  <div class="container-Check">
    <p class="date" v-text="currentDate"></p>
    <p class="time" v-text="currentTimeIn"></p>
    <a-button :disabled="isActiveIn" class="check-button" type="primary" @click="checkIn">
      Check in
    </a-button>
    <a-button :disabled="isActiveOut" class="check-button" type="primary" @click="checkOut">
      Check out
    </a-button>
  </div>
</template>

<script>
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
      isActiveIn: '',
      isActiveOut: ''
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
    isDone(){
      this.$axios.get(`https://db-back.herokuapp.com/api/get/check/${this.inOut.userId}`).then((res) => {
        if(res.data != null){
         this.isActiveIn = false;
          this.isActiveOut =  true;
        }else {
           this.isActiveIn = true;
          this.isActiveOut =  false;
        }

      });
    },
    updateCurrentTimeIn() {
      this.currentTimeIn = moment().format("LTS");
      this.inOut.timeIn = this.currentTimeIn;
    },
    updateCurrentTimeOut() {
      this.currentTime = moment().format("LTS");
      this.inOut.timeOut = this.currentTime;
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
      this.$axios.post('https://db-back.herokuapp.com/api/post/checkIn',this.inOut)
      this.$nuxt.refresh()
      // this.isActiveIn = true
      // this.isActiveOut = false
      console.log("checkIn", this.inOut);
    },
    checkOut() {
      // this.$axios.post('http://localhost:3030/api/post/inout',this.inOut)
      // this.isActiveIn = false
      // this.isActiveOut = true
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
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translate(-50%, -50%);
  text-shadow: 0 0 20px rgba(10, 175, 230, 1), 0 0 20px rgba(10, 175, 230, 0);
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
  width: 100px;
  height: 44px;
}
</style>