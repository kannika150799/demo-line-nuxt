<template>
  <div>
    <div class="container-page-calendar container">
      <p class="text-head">Setting calendar</p>
      <div class="container-input">
        <template>
          <div class="box-input">
            <p class="text-input">ชื่อกิจกรรม</p>
            <a-input class="input" placeholder="ชื่อกิจกรรม" v-model="calendar.activity" />
          </div>
        </template>
        <div class="select-date">
          <p class="text-input">วันที่กิจกรรม</p>
          <div>
            <a-date-picker format="DD/MM/YYYY" @change="onChange" />
          </div>
        </div>
        <a-button class="add-button button" @click="addCalendar">
          Add
        </a-button>
      </div>
    </div>

    <div class="container">
      <p class="text-head">กิจกรรม</p>
      <div class="container container-activity" v-for="calendar in calendars" :key="calendar.id" >
        <p class="activity">กิจกรรม: {{ calendar.activity }}</p>
        <p>วันที่: {{ calendar.dateActivity }}</p>
        <div>
          <a-button class="button" type="primary" @click="editList(calendar.id)" > Edit </a-button>
          <a-button class="button" type="danger" @click="deleteList(calendar.id)" > Delete </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  mounted() {
    liff
      .init({
        liffId: "1655660869-O22ykXk6",
      })
      .then(() => {
        if (liff.isLoggedIn()) {
          liff.getProfile().then((profile) => {
            this.calendar.userId = profile.userId;
            this.getData();
          });
        } else {
          liff.login();
        }
      });
  },
  data() {
    return {
      calendar: {
        id: "",
        userId: "",
        activity: "",
        dateActivity: "",
        date: "",
      },
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
    //add list
    onChange(date, dateString) {
      console.log(date, dateString);
      this.calendar.dateActivity = dateString;
      this.calendar.date = date;
    },
    addCalendar() {
      this.$axios.post("https://db-back.herokuapp.com/api/post/calendar", this.calendar)
        .then(() => {
          window.location.reload();
        });
    },
    //show list
    async getData() {
      const res = await axios.get( "https://db-back.herokuapp.com/api/get/calendar" );
      this.calendars = res.data;
      console.log("get", this.calendars);
    },
    editList(id) {
      this.$router.push(`/calendar/${id}`);
      console.log("id::", id);
    },
    deleteList(id) {
      this.$axios.delete( `https://db-back.herokuapp.com/api/delete/calendar/${id}` );
      window.location.reload();
      console.log("delete", id);
    },
  },
};
</script>

<style scoped>
.container-page-calendar {
  padding: 30px 0px;
  margin: 15px 0px;
  border-bottom: 1px solid black;
}
.container-input {
  display: flex;
  flex-direction: column;
}
.text-head {
  font-size: 20px;
  font-weight: 600;
}
.box-input {
  display: flex;
  margin-bottom: 15px;
  width: 300px;
}
.input {
  margin-left: 10px;
  width: 180px;
}
.text-input {
  margin: 0px 5px 0px;
  font-size: 16px;
  font-weight: 600;
  align-self: center;
}
.select-date {
  display: flex;
}
.add-button {
  align-self: center;
  margin: 20px 0px 0px;
  color: aliceblue;
  background-color: rgb(45, 209, 146);
  border-color: transparent;
}
.button {
  height: 44px;
  width: 120px;
  font-size: 16px;
  font-weight: 400;
}

/* show list */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
/* .text-head {
  font-size: 18px;
  font-weight: 600;
} */
.container-activity {
  width: 300px;
  font-size: 18px;
  padding: 20px 0px;
  border-bottom: 1px solid black;
}
.activity {
  text-align: center;
}
/* .list-button {
  width: 100px;
  height: 44px;
} */
</style>