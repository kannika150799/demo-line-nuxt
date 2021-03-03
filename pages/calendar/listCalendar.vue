<template>
  <div class="container">
    <p>กิจกรรม</p>
    <div
      class="container container-activity"
      v-for="calendar in calendars"
      :key="calendar.id"
    >
      <p class="activity">กิจกรรม: {{ calendar.activity }}</p>
      <p>วันที่: {{ calendar.dateActivity }}</p>
      <div>
        <a-button
          class="button"
          type="primary"
          @click="editList(calendar.id)"
        >
          Edit
        </a-button>
        <a-button
          class="button"
          type="danger"
          @click="deleteList(calendar.id)"
        >
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
      // calendars: [],
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
    editList(id) {
      // this.$router.push(`/calendar/editCalendar/${id}`)
      this.$router.push(`/calendar/${id}`);
      console.log("id::", id);
    },
    deleteList(id) {
      this.$axios.delete(
        `https://db-back.herokuapp.com/api/delete/calendar/${id}`
      );
      window.location.reload();
      console.log("delete", id);
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
.container-activity {
  width: 300px;
  margin-bottom: 15px;
  border-bottom-color: black;
}
.activity {
  width: 200px;
  text-align: center;
}
.button {
  width: 100px;
  height: 44px;
}
</style>