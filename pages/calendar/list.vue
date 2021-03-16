<template>
  <div>
    <div class="container-page-calendar container css1">
      <p class="text-head">Setting Calendar</p>
      <div class="container-input">
        <template>
          <div class="box-input">
            <p class="text-input">Topic</p>

            <a-textarea
              class="input"
              placeholder="Topic"
              v-model="calendar.activity"
            />
          </div>
        </template>

        <div class="box-input">
          <p class="text-input">Date</p>
          <div class="select-date inputx">
            <a-date-picker
              format="DD/MM/YYYY"
              @change="onChange"
              placeholder="DD/MM/YYYY"
            />
          </div>
        </div>
        <a-button class="add-button button" @click="addCalendar">
          ADD
        </a-button>
      </div>
    </div>

    <div class="container css2">
      <!-- <p class="text-head">Special days</p> -->
      <div
        class="container container-activity"
        v-for="calendar in calendars"
        :key="calendar.id"
      >
        <p class="activity">{{ calendar.activity }}</p>
        <p>{{ calendar.dateActivity }}</p>
        <div>
          <a-button
            class="button"
            type="primary"
            @click="editList(calendar.id)"
          >
            <img
              src="~/assets/10171190771582793670-16.png"
              alt=""
              style="margin-right: 10px"
            />
            Edit
          </a-button>
          <a-button
            class="button"
            type="danger"
            @click="deleteList(calendar.id)"
          >
            <img
              src="~/assets/2130497621541068760-16.png"
              alt=""
              style="margin-right: 10px"
            />
            Delete
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  mounted() {
    // liff.init({liffId: "1655736391-6XYv2JDo"})
    // .then(() => {
    //   if (liff.isLoggedIn()) {
    //     liff.getProfile().then((profile) => {
    //       this.calendar.userId = profile.userId;
    //       this.getData();
    //     });
    //   } else {
    //     liff.login();
    //   }
    // });
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
    });
    this.getData();
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
      this.$axios
        .post("https://db-back.herokuapp.com/api/post/calendar", this.calendar)
        .then(() => {
          window.location.reload();
        });
    },
    //show list
    async getData() {
      await axios
        .get("https://db-back.herokuapp.com/api/get/calendar")
        .then((res) => {
          this.$nextTick(() => {
            setTimeout(
              () => this.$nuxt.$loading.finish(),
              (this.calendars = res.data)
            );
          });
        });
      // console.log("get", this.calendars);
    },
    editList(id) {
      this.$router.push(`/calendar/${id}`);
      console.log("id::", id);
    },
    deleteList(id) {
      this.$axios
        .delete(`https://db-back.herokuapp.com/api/delete/calendar/${id}`)
        .then((res) => {
          window.location.reload();
          console.log("delete", id);
          console.log("res", res.data);
        });
    },
  },
};
</script>

<style scoped>
.container-page-calendar {
  /* font-family: Dosis; */
  /* position: relative; */
  padding: 0px 0px 30px;
  margin: 0px 0px 15px;
  /* border-bottom: 1px solid black; */
}
.container-input {
  /* font-family: Dosis; */
  /* position: relative; */
  /* position: fixed; */
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px 30px;
  background-color: white;
  box-shadow: 0px 0px 0px rgb(17 15 14 / 20%),
    3px 4px 13px rgb(168 223 216 / 16%);
  border-radius: 5px;
}
.text-head {
  font-size: 28px;
  font-weight: 700;
  color: #040408;
  width: 100%;
  background-color: white;
  /* height: 110px; */
  margin: 0px;
  text-align: center;
  /* padding: 25px; */  
  /* box-shadow: 0px 4px 0px rgb(17 15 14 / 16%), 3px 4px 13px rgb(168 223 216 / 16%);*/
}
.box-input {
  display: flex;
  margin-bottom: 16px;
  /* width: 300px; */
}
.input {
  margin-left: 15px;
  resize: none;
  width: 230px;
  height: 32px;
}
.ant-input {
  /* border: 1px solid #1e2a78; */
}
.inputx .ant-calendar-picker-input {
  border: 1px solid #1e2a78;
}
.text-input {
  margin: 0px 0px 5px;
  font-size: 18px;
  font-weight: 600;
  align-self: center;
}
.select-date {
  margin-left: 20px;
  /* display: flex; */
  /* flex-direction: column; */
  /* text-align: center; */
}
/* .ant-calendar-picker-input {
  width: 220px;
} */
/* .ant-calendar-picker-input {
    outline: none;
    width: 245px;
    border: 2px solid red;
} */
.add-button {
  align-self: center;
  margin: 5px 0px;
  color: aliceblue;
  background-color: rgb(45, 209, 146);
  border-color: transparent;
  box-shadow: 3px 4px 13px rgb(17 15 14 / 20%),
    3px 4px 13px rgb(168 223 216 / 16%);
}
.ant-btn-primary {
  background-color: transparent;
  /* border-color: transparent; */
  color: #1890ff;
  box-shadow: 3px 4px 13px rgb(17 15 14 / 5%),
    3px 4px 13px rgb(168 223 216 / 16%);
}
.ant-btn-danger {
  color: #ff4d4f;
  background-color: transparent;
  /* border-color: transparent; */
  box-shadow: 3px 4px 13px rgb(17 15 14 / 5%),
    3px 4px 13px rgb(168 223 216 / 16%);
}
.button {
  height: 44px;
  width: 120px;
  font-size: 16px;
  font-weight: 400;
}

/* show list */
.container {
  font-family: Dosis;
  display: flex;
  flex-direction: column;
  align-items: center;
}
/* .text-head {
  font-size: 18px;
  font-weight: 600;
} */
.container-activity {
  /* position: relative; */
  width: 80%;
  font-size: 18px;
  padding: 10px 0px;
  /* border-bottom: 1px solid rgb(170, 168, 168); */
  box-shadow: 3px 4px 13px rgb(17 15 14 / 10%),
    3px 4px 13px rgb(168 223 216 / 10%);
  border-radius: 5px;
  margin-bottom: 15px;
}
.activity {
  text-align: center;
  /* font-size: 18px; */
  margin: 0px;
}
/* .list-button {
  width: 100px;
  height: 44px;
} */
.css1 {
  position: fixed;
  z-index: 1;
  width: 100%;
}
.css2 {
  position: relative;
  top: 250px;
}
</style>