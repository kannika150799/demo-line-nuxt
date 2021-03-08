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
import axios from "axios";
export default {
  data() {
    return {
      authors: [
        "ทั้งหมด",
        "มกราคม",
        "กุมภาพันธ์",
        "มีนาคม",
        "เมษายน",
        "พฤษภาคม",
        "มิถุนายน",
        "กรกฎาคม",
        "สิงหาคม",
        "กันยายน",
        "ตุลาคม",
        "พฤศจิกายน",
        "ธันวาคม",
      ],
      info: null

    };
  },
  mounted() {
    liff.init({ liffId: "1655660869-Pbzr7e7X",})
  },
  methods: {
    async handleChange(value) {
      const res = await axios.get(
        `https://db-back.herokuapp.com/get/user1/${value}`
      )
      this.info = await res.data;
      console.log(`selected ${value}`);
      console.log("get", this.info);
    },
    filterOption(input, option) {
      return option.componentOptions.children[0].text
        .toLowerCase()
        .includes(input.toLowerCase());
    },
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