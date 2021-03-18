<template>
  <div class="container-page-calendar">
    <p class="text-head">Setting calendar</p>
    <div class="container-input">
      <template>
        
        <div class="box-input">
            <p class="text-input">Topic</p>
            <div class="select-date"> 
              <!-- <p class="text-input text-show" style="color:red">*&nbsp;{{calendars.activity}}</p> -->
              <!-- <p>{{calendars.dateActivity}}</p> -->
            </div>
            <!-- <a-textarea
              class="input"
              placeholder="Topic"
              v-model="calendar.activity"
            /> -->
            <a-input v-model="calendars.activity" >{{ calendars.activity }}</a-input>
          </div>
      </template>
      <div class="select-date">
        <p class="text-input">Date</p>
        <div class="select-date"> 
        <!-- <p class="text-input text-show" style="color:red">*&nbsp;{{calendars.dateActivity}}</p> -->
        <!-- <p>{{calendars.dateActivity}}</p> -->
      </div>
        <div class="date-picker">
          <a-date-picker 
          :value="moment(calendars.dateActivity, dateFormat)" 
          :format="dateFormat"
           @change="onChange"
           :allowClear="false"
            />
        </div>
      </div>
      <div class="btn-center">
        <a-button class="button btnconf" type="primary" @click="confirmCalendar">
          <!-- <img src="~/assets/6272187461582545599-16.png" alt="" 
          style="margin-right:10px"
          > -->
          Confirm
        </a-button>
        <a-button class="button btncanc" type="danger" @click="cancelCalendar">
          <!-- <img src="~/assets/2130497621541068760-16.png" alt="" 
          style="margin-right:10px"
          > -->
          Cancel
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import axios from "axios";
export default {
  data() {
    return {
      dateFormat: 'DD/MM/YYYY',
      id: this.$route.params.id,
      calendars : {
        activity: "",
        // dateActivity: null,
        dateActivity: moment(),
        date: "",
      },
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    moment,
    onChange(date, dateString) {
      console.log(date, dateString);
      this.calendars.dateActivity = dateString;
      this.calendars.date = date;
    },
    async getData() {
      const res = await axios.get(`https://db-back.herokuapp.com/api/get/calendar/1/${this.id}`);
      this.calendars = res.data;
      this.calendars.dateActivity = res.data.dateActivity;
      console.log("get", this.calendars.dateActivity);

    },
    // confirmCalendar() {
    //   this.$axios.put(`https://db-back.herokuapp.com/api/edit/calendar/${this.id}`,this.calendar).then(()=>{
    //     // this.$router.push("/calendar/listCalendar");
    //     this.$router.push("/calendar/list");
    //   });
    //   console.log("put", this.calendar);
    // },
    confirmCalendar() {
      this.$axios.put(`https://db-back.herokuapp.com/api/edit/calendar/${this.id}`,this.calendars).then(()=>{
        // this.$router.push("/calendar/listCalendar");
        this.$router.push("/calendar/list");
      });
      console.log("put", this.calendars);
    },
    cancelCalendar() {
      // this.$router.push("/calendar/listCalendar");
      this.$router.push("/calendar/list");
    },
  },
  head:{
    title: 'Calendar'
  }
};
</script>

<style scoped>
.container-page-calendar {
  font-family: Dosis;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* margin:0px 30px; */
}
.text-head {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 15px;
  color: #000;
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
  border: 1px solid #d9d9d9;
}
.button {
  margin-top: 30px;
  height: 44px;
  width: 120px;
  font-size: 16px;
  font-weight: 400;
  /* box-shadow:  3px 4px 13px  rgba(17, 15, 14, 0.2), 3px 4px 13px rgba(168, 223, 216, 0.156); */
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
.container-input{
  width: 75%;
}
.btn-center{
  text-align: center;
}
</style>