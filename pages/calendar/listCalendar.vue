<template>
  <div>
    <p>กิจกรรม</p>
    <div v-for="calendar in calendars" :key="calendar.id">
      <p>id: {{ calendar.id }}</p>
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
      // id: this.$route.params.id
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
      console.log("get", this.calendars);
    },
    editList () {
      this.$router.push(`/calendar/${id}`)
      console.log("id::", id);
    },
    deleteList() {
      this.$axios.delete(`https://db-back.herokuapp.com/api/delete/calendar/${this.calendar.id}`);
      console.log("delete", this.calendar.id);
    },
  },
};
</script>

<style scoped>
</style>