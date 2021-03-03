<template>
  <div>
    <p>กิจกรรม</p>
    <div v-for="calendar in calendars" :key="calendar.id">
      <p>id: {{ calendar.id }}</p>
      <p>กิจกรรม: {{ calendar.activity }}</p>
      <p>วันที่: {{ calendar.dateActivity }}</p>
      <div>
        <a-button class="edit-button" type="primary" @click="editList(calendar.id)">
          Edit
        </a-button>
        <a-button class="delete-button" type="primary" @click="deleteList(calendar.id)">
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
      calendars: [],
      // calendars: {
      //   activity: "",
      //   date: "",
      //   dateActivity: "",
      //   id: "",
      //   userId: ""
      // },
    };
  },
  methods: {
    async getData() {
      const res = await axios.get("https://db-back.herokuapp.com/api/get/calendar");
      this.calendars = res.data;
      this.roloadWindow()
      console.log("get", this.calendars);
    },
    roloadWindow () {
      window.location.reload()
    },
    editList (id) {
      this.$router.push(`/calendar/${id}`)
      console.log("id::", id);
    },
    deleteList(id) {
      this.$axios.delete(`https://db-back.herokuapp.com/api/delete/calendar/${id}`);
      window.location.reload()
      console.log("delete", id);
    },
  },
};
</script>

<style scoped>
</style>