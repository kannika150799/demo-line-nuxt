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

    <div class="box-card" v-for="info in infos" :key="info">
      <p>ชื่อ: {{info.info.name}}</p>
      <div v-for="check in info.inout" :key="check">
        <p>date: {{check.inout.dateGet}}</p>
        <p>check-in: {{check.inout.timeIn}}</p>
        <p>check-out: {{check.inout.timeOut}}</p>
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
      infos: null

    };
  },
  mounted() {
    liff.init({ liffId: "1655660869-Pbzr7e7X",})
  },
  methods: {
    handleChange(value) {
      const res = axios.get(
        `https://db-back.herokuapp.com/get/user1/${value}`
      )
      .then((res) => {
        this.infos = res.data;
        console.log("get", this.infos);
        console.log(`selected ${value}`);
        }
      );
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