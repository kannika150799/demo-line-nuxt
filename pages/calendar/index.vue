<template>
  <div class="container-page-calendar">
    <p class="text-head">Setting calendar</p>
    <div class="container-input">
      <template>
        <div class="box-input">
          <p class="text-input">ชื่อกิจกรรม</p>
          <a-input class="input" placeholder="ชื่อกิจกรรม" v-model="calendar.activity"/>
        </div>
      </template>
      <div class="select-date">
        <p class="text-input">วันที่</p>
        <div>
          <a-date-picker format="DD/MM/YYYY" @change="onChange" />
        </div>
      </div>
      <a-button class="add-button" type="primary" @click="addCalendar"> Add </a-button>
    </div>
  </div>
</template>

<script>
export default {
  // mounted() {
  //   liff
  //     .init({
  //       liffId: "1655660869-VoKZDYDO",
  //     })
  //     .then(() => {
  //       if (liff.isLoggedIn()) {
  //         liff.getProfile().then((profile) => {
  //           this.calendar.userId = profile.userId;
  //         });
  //       } else {
  //         liff.login();
  //       }
  //     });
  // },
  data() {
    return {
      calendar: {
        id: "",
        userId: "",
        activity: "",
        dateActivity: "",
        date:""
      }
    };
  },
  methods: {
    onChange(date, dateString) {
      console.log(date, dateString);
      this.calendar.dateActivity = dateString;
      this.calendar.date = date;

    },
    addCalendar () {
      this.$axios.post('http://localhost:3030/api/post/calendar',this.calendar)
      this.$router.push('/calendar/listCalendar')
    }
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
  font-size: 20px;
  font-weight: 600;
}
.box-input {
  display: flex;
  margin-bottom: 15px;
  width: 300px;
}
.input {
  width: 200px;
}
.text-input {
  margin: 0px;
  font-size: 16px;
  font-weight: 600;
  align-self: center;
}
.select-date {
  display: flex;
}
.add-button {
  height: 44px;
  width: 120px;
  font-size: 16px;
  font-weight: 400;
}
</style>