<template>
  <div class="container-Check">
    <p class="date" v-text="currentDate"></p>
    <p class="time" v-text="currentTime"></p>
    <a-button :disabled="isActiveIn" class="check-button" type="primary" @click="checkIn">
      Check in
    </a-button>
    <a-button :disabled="isActiveIn" class="check-button" type="primary" @click="checkOut">
      Check out
    </a-button>
  </div>
</template>

<script>
const moment = require("moment");

export default {
  data() {
    return {
      currentTime: null,
      currentDate: null,
      inOut: {
        momentTime: "",
        momentTimeFormat1: "",
        momentTimeFormat2: "",
        momentDate: "",
        idtime: "qwe",
      },
      isActiveIn: '',
      isActiveOut: ''
    };
  },
  mounted() {
    this.isDone();
  },
  created() {
    // this.currentTime = moment().format("LTS");
    setInterval(() => this.updateCurrentTime(), 1 * 1000);
    // this.currenDate = moment().format('dddd, l');
    setInterval(() => this.updateCurrentDate(), 200);
  },
  methods: {
    isDone(){
      //ยังใช้ไม่ได้
      this.$axios.get(`https://db-back.herokuapp.com/api/get/user/${this.profile.userId}`).then((res) => {
        if(res.data == null){
          this.isActiveIn = false;
          this.isActiveOut =  true;
        }else {
          this.isActiveIn = true;
          this.isActiveOut =  false;
        }

      });
    },
    updateCurrentTime() {
      this.currentTime = moment().format("LTS");
      this.inOut.momentTime = this.currentTime;
    },
    updateCurrentDate() {
      this.currentDate = moment().format("dddd, l");
      this.currentDateFormat1 = moment().format();
      this.currentDateFormat2 = moment().format("l");
      this.inOut.momentDate = this.currentDate;
      this.inOut.momentDateFormat1 = this.currentDateFormat1;
      this.inOut.momentDateFormat2 = this.currentDateFormat2;
    },
    checkIn() {
      // this.$axios.post('http://localhost:3030/api/post/inout',this.inOut)
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