<template>
  <div class="container">
    <p class="text-head">Topic</p>
    <div
      class="container container-activity"
      v-for="calendar in calendars"
      :key="calendar.id"
    >
      <p class="activity">{{ calendar.activity }}</p>
      <p class="date-activity">{{ calendar.dateActivity }}</p>
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
      const res = await axios.get(
        "https://db-back.herokuapp.com/api/get/calendar"
      );
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
  font-size: 34px;
  font-weight: 700;
  margin: 10px 0px 30px;
}
.container-activity {
  width: 300px;
  font-size: 18px;
  padding: 20px 0px;
  background-color: whitesmoke;
  border-radius: 10px;
  margin-bottom: 30px;
  box-shadow: 3px 4px 13px rgb(17 15 14 / 20%),
    3px 4px 13px rgb(168 223 216 / 16%);
}
.activity {
  text-align: center;
  font-size: 30px;
  margin: 0px;
}
.date-activity {
  margin: 0px;
}
.button {
  width: 100px;
  height: 44px;
}
</style>