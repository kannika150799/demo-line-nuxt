<template>
  <div class="container-page-calendar">
    <p class="text-head">Setting calendar</p>
    <div class="container-input">
      <template>
        
        <div class="box-input">
            <p class="text-input">Topic</p>
            <div class="select-date"> 
              <p class="text-input text-show" style="color:red">*&nbsp;{{calendars.activity}}</p>
              <!-- <p>{{calendars.dateActivity}}</p> -->
            </div>
            <a-textarea
              class="input"
              placeholder="Topic"
              v-model="calendar.activity"
            />
          </div>
      </template>
      <div class="select-date">
        <p class="text-input">Date</p>
        <div class="select-date"> 
        <p class="text-input text-show" style="color:red">*&nbsp;{{calendars.dateActivity}}</p>
        <!-- <p>{{calendars.dateActivity}}</p> -->
      </div>
        <div class="date-picker">
          <a-date-picker format="DD/MM/YYYY" @change="onChange" />
        </div>
      </div>
      <div>
        <a-button class="button btnconf" type="primary" @click="confirmCalendar">
          <img src="~/assets/6272187461582545599-16.png" alt="" 
          style="margin-right:10px"
          >
          Confirm
        </a-button>
        <a-button class="button btncanc" type="danger" @click="cancelCalendar">
          <img src="~/assets/2130497621541068760-16.png" alt="" 
          style="margin-right:10px"
          >
          Cancel
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      id: this.$route.params.id,
      calendars: {
        activity: "",
        dateActivity: "",
        date: "",
      },
      calendar: {
        activity: "",
        dateActivity: "",
        date: "",
      }
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    onChange(date, dateString) {
      console.log(date, dateString);
      this.calendar.dateActivity = dateString;
      this.calendar.date = date;
    },
    async getData() {
      const res = await axios.get(
        `https://db-back.herokuapp.com/api/get/calendar/1/${this.id}`
      );
      this.calendars = res.data;
      console.log("get", this.calendars);
    },
    confirmCalendar() {
      this.$axios.put(`https://db-back.herokuapp.com/api/edit/calendar/${this.id}`,this.calendar).then(()=>{
        // this.$router.push("/calendar/listCalendar");
        this.$router.push("/calendar/list");
      });
      console.log("put", this.calendar);
    },
    cancelCalendar() {
      // this.$router.push("/calendar/listCalendar");
      this.$router.push("/calendar/list");
    },
  },
};
</script>

<style scoped>
.container-page-calendar {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px;
}
.text-head {
  font-size: 34px;
  font-weight: 700;
  color: #1e2a78;
}
.box-input {
  /* display: flex; */
  margin-bottom: 15px;
}
.input {
  width: 100%;
  resize: none;
}
.text-input {
  /* margin: 0px;
  margin-right: 10px;
  font-size: 16px;
  font-weight: 600;
  align-self: center; */
  margin: 0px 0px 5px;
  font-size: 22px;
  font-weight: 600;
  align-self: center;
}
.text-show {
  font-size: 14px;
}
.date-picker {
  margin-right: 40px;
}
.select-date {
  /* display: flex; */
}
.ant-input{
  border: 1px solid #1e2a78;
}
.button {
  margin-top: 40px;
  height: 44px;
  width: 120px;
  font-size: 16px;
  font-weight: 400;
  box-shadow:  3px 4px 13px  rgba(17, 15, 14, 0.2), 3px 4px 13px rgba(168, 223, 216, 0.156);
}
.btnconf{
background-color: transparent;
  /* border-color: transparent; */
  color: #1890ff;
  border-radius: 10px;
}

.btncanc{
  color: #ff4d4f;
  background-color: transparent;
  /* border-color: transparent; */
  border-radius: 10px;

}
</style>