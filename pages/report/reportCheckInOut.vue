<template>
  <div class="container-page-status">
    <p class="text-head">Report check-in/check-out</p>
    <div class="select-date">
      <p>วันที่</p>
      <checkDate />
    </div>

    <div class="box-card">
      <p>ชื่อ: (ชื่อ)</p>
      <div>
        <p>check-in: (xx:xx)</p>
        <p>check-out: (xx:xx)</p>
      </div>
    </div>
  </div>
</template>

<script>
import checkDate from "~/components/checkDate";
export default {
  components: {
    checkDate
  },
};
</script>

<style scoped>
.container-page-status {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
}
.text-head {
  font-size: 20px;
  font-weight: 600;
}
.box-card {
  border: 2px solid navy;
  padding: 10px;
  border-radius: 10px;
}
.select-date {
    display: flex;
} 
</style>