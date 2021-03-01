<template>
  <div class="container-page-calendar">
    <p class="text-head">Setting calendar id</p>
    <div class="container-input">
      <template>
        <div class="box-input">
          <p class="text-input">ชื่อกิจกรรม</p>
          <a-input class="input" placeholder="ชื่อกิจกรรม"/>
          <!-- <a-input class="input" >ชื่อกิจกรรม</a-input> -->
        </div>
      </template>
      <div class="select-date">
        <p class="text-input">วันที่</p>
        <div>
          <a-date-picker format="DD/MM/YYYY" @change="onChange"/>
          <!-- <a-date-picker @change="onChange">xx/xx/xxxx</a-date-picker> -->
        </div>
      </div>
      <a-button class="button" type="primary" @click="confirmCalendar"> Confirm </a-button>
      <a-button class="button" type="danger" @click="cancelCalendar"> Cancel </a-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    data () {
    return {
      id: this.$route.params.id
    }
  },
    onChange(date, dateString) {
      console.log(date, dateString);
    },
    confirmCalendar () {
      this.$axios.put(`https://db-back.herokuapp.com/api/edit/calendar/${this.id}`)
      this.$router.push('/calendar/listCalendar')
      // console.log("put",this.profile);
      
    },
    cancelCalendar () {
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
.button {
  height: 44px;
  width: 120px;
  font-size: 16px;
  font-weight: 400;
}
</style>