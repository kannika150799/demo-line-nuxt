<template>
  <div class="container-page-status">
    <p class="text-head">Status</p>
    <div class="box-card">
      <p>หัวข้อการลา: (หัวข้อการลา)</p>
      <p>หมายเหตุการลา: (หมายเหตุการลา)</p>
      <p>วันที่ลา: (xx/xx/xxxx - xx/xx/xxxx)</p>
      <p>รอการอนุมัติ</p>
    </div>
  </div>
</template>

<script>
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
</style>