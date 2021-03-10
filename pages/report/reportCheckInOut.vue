<template>
  <div class="container-page-status">
    <p class="text-head">Report for check-in/out</p>
    <div class="space">
      <p class="text">เดือน</p>
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
      <p>{{ info.info.inout.length > 0 ? info.info.name : '' }}</p>
      <div v-for="check in info.info.inout" :key="check">
        <p>date: {{ check.dateGet }}</p>
        <div class="space">
          <p>date: {{ check.timeIn }}</p>
          <p>date: {{ check.timeOut }}</p>
        </div>
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
      infos: null,
    };
  },
  mounted() {
    // liff.init({ liffId: "1655736391-Pm5DnWoE" });
  },
  methods: {
    handleChange(value) {
      const res = axios
        .get(`https://db-back.herokuapp.com/get/user1/${value}`)
        .then((res) => {
          this.infos = res.data;
          console.log("get", this.infos);
          console.log(`selected ${value}`);
        });
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
font-size: 28px;
    font-weight: 600;
}
.text {
  margin-right: 10px;
  font-size: 20px;
}
.ant-select-selection--single {
    height: 36px;
}
.box-card {
  /* border: 2px solid navy; */
  padding: 10px;
  /* border-radius: 10px; */
  margin-bottom: 15px;
}
.space {
  display: flex;
}
</style>