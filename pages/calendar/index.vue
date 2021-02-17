<template>
  <div class="container-page-calendar">
    <p class="text-head">Setting calendar</p>
    <div class="container-input">
      <template>
        <div class="box-input">
          <p class="text-input">ชื่อกิจกรรม</p>
          <a-input class="input" placeholder="ชื่อกิจกรรม" />
        </div>
      </template>
      <div class="select-date">
        <p class="text-input">วันที่</p>
        <checkDate />
      </div>
      <a-button class="add-button" type="primary"> Add </a-button>
    </div>
  </div>
</template>

<script>
import checkDate from "~/components/checkDate";
export default {
  components: {
    checkDate,
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