<template>
  <div class="container-page-status">
    <p class="text-head">Report check-in/check-out</p>
    <div class="select-date">
      <p>เดือน</p>
      <div>
          <a-select
            show-search
            placeholder="เลือกเดือน"
            option-filter-prop="children"
            style="width: 120px"
            :filter-option="filterOption"
            class="breed_select"
            @change="handleChange"
          >
            <a-select-option v-for="author in authors" :key="author">
              {{ author }}
            </a-select-option>
          </a-select>
        </div>
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

export default {
data () {
  return {
    authors: ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"],
  }
},
  methods: {
    handleChange (value) {
      this.show = value
      console.log(`selected ${value}`)
      console.log(this.photo)
    },
    filterOption (input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().includes(input.toLowerCase())
      )
    }
  }
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