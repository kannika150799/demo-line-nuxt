<template>
  <div class="container-Check">
    <p class="date" v-text="currentDate"></p>
    <p class="time" v-text="currentTime"></p>
    <a-button class="check-button" type="primary" @click="checkin"> Check in </a-button>
    <a-button class="check-button" type="primary"> Check out </a-button>
  </div>
</template>

<script>
const moment = require("moment");

export default {
  data() {
    return {
      currentTime: null,
      currentDate: null,
    inOut:{
      // currentTime: currentTime,
      // currentDate: currentDate,
      currentTime:moment().format("LTS"),
      currentDate:moment().format('dddd, l'),
      idtime:"qwe"
    }
    };
  },
  methods: {
    updateCurrentTime() {
      this.currentTime = moment().format("LTS");
    },
    updateCurrentDate() {
      this.currentDate = moment().format('dddd, l');
    },
    checkin(){
    this.$axios.post('http://localhost:3030/api/post/inout',this.inOut)
    console.log("data",this.inOut);
    }
  },
  created() {
    this.currentTime = moment().format("LTS");
    setInterval(() => this.updateCurrentTime(), 1 * 1000);
    this.currenDate = moment().format('dddd, l');
    setInterval(() => this.updateCurrentDate(), 200);
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