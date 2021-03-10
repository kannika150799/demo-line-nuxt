<template>
  <div class="container">
    <p class="text-head">กิจกรรม</p>
    <div class="container container-activity" v-for="calendar in calendars" :key="calendar.id" >
      <p class="activity">กิจกรรม: {{ calendar.activity }}</p>
      <p class="date-activity" >วันที่: {{ calendar.dateActivity }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  mounted() {
    liff.init({ liffId: "1655743042-OEqZ9nlB", })
    this.getData();
  },
  data() {
    return {
      calendars: {
        activity: "",
        date: "",
        dateActivity: "",
        id: "",
        userId: "",
      },
    };
  },
  methods: {
    async getData() {
      const res = await axios.get( "https://db-back.herokuapp.com/api/get/calendar" );
      this.calendars = res.data;
      console.log("get", this.calendars);
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.text-head {
  font-size: 22px;
  font-weight: 600;
}
.container-activity {
width: 300px;
  font-size: 18px;
  padding: 20px 0px;
  border-bottom: 1px solid black;
}
.activity {
  text-align: center;
}
.date-activity {
    margin: 0px;
}
.button {
  width: 100px;
  height: 44px;
}
</style>