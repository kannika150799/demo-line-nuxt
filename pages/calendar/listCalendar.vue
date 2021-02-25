<template>
  <div>
    <p>กิจกรรม</p>
    <div v-for="calendar in calendars" :key="calendar.id">
      <p>กิจกรรม: {{ calendar.activity }}</p>
      <p>วันที่: {{ calendar.dateActivity }}</p>
      <div>
        <a-button class="edit-button" type="primary" @click="editList">
          Edit
        </a-button>
        <a-button class="delete-button" type="primary" @click="deleteList">
          Delete
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  mounted() {
    this.getData();
  },
  data() {
    return {
      calendars: null,
      // calendars: {
      //   userId: "",
      //   leaveType: "",
      //   reson: "",
      //   startValue: "",
      //   endValue: "",
      //   dateStart: "",
      //   dateEnd: "",
      //   status: "",
      // },
    };
  },
  methods: {
    async getData() {
      const res = await axios.get("https://db-back.herokuapp.com/api/get/calendar");
      this.calendars = res.data;
      console.log("get", this.calendars);
    },
    deleteList() {
      this.$axios.delete(`https://db-back.herokuapp.com/api/delete/calendar/${this.calendars.id}`);
    },
  },
};
</script>

<style scoped>
</style>