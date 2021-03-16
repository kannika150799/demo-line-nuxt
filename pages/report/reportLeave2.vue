<template>
  <div class="container-page-status">
    <p class="text-head">Report for Leave</p>

    <div class="space">
      <p class="text">Year</p>
      <div>
        <a-select
          show-search
          placeholder="Select the year"
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
      <!-- <p>{{ info.info.leave.length > 0 ? info.info.name : "" }}</p> -->
      <p>{{ info.info.name }}</p>
      <div class="box-num-approve">
        <p>จำนวนการลา(อนุมัติ):&nbsp;</p>
        <p>{{ info.info.leave.length > 0 ? info.info.numApprove : "0" }}</p>
        <p>&nbsp;ครั้ง</p>
      </div>
      <div class="box-num-approve">
        <p>จำนวนการลา(ไม่อนุมัติ):&nbsp;</p>
        <p>{{ info.info.leave.length > 0 ? info.info.numDisapproval : "0" }}</p>
        <p>&nbsp;ครั้ง</p>
      </div>
      <div class="box-check" v-for="check in info.info.leave" :key="check">
        <p>หัวข้อการลา: {{ check.leaveType }}</p>
        <p>วันที่ลา: {{ check.dateStart }} - {{ check.dateEnd }}</p>
        <p>สถานะ: {{ check.status }}</p>
      </div>
    </div>
  </div>
</template>

<script>
// import {mapMutations} from 'vuex'
import axios from "axios";
export default {
  data() {
    return {
      authors: [
        "2021",
        "2022",
        "2023",
        "2024",
        "2025",
      ],
      infos: null,
    };
  },
  mounted() {
    // liff.init({ liffId: "1655736391-Dok3LZo2" });
    // this.$nextTick(() => {
    //   this.$nuxt.$loading.start();
    // });
    // this.getData();
  },
  methods: {
    handleChange(value) {
      axios .get(`https://db-back.herokuapp.com/report/leave/${value}`)
        .then((res) => {
          this.infos = res.data;
          // console.log("get", this.infos);
          // console.log(`selected ${value}`);
        });
    },
    filterOption(input, option) {
      return option.componentOptions.children[0].text
        .toLowerCase()
        .includes(input.toLowerCase());
    },
    // ...mapMutations({
    //   startLoading: 'loading/startLoading',
    //   stopLoading: 'loading/stopLoading'
    // }),
    // async getData() {
    //   // await this.startLoading()
    //   await axios.get(`https://db-back.herokuapp.com/report/leave/${}`).then((res) => {
    //       this.$nextTick(() => {
    //          setTimeout(() => this.$nuxt.$loading.finish() , 1000)
    //       })
    //       this.infos = res.data;
    //       console.log("get", this.infos);
    //       // this.stopLoading()
    //   });
    // },
  },
};
</script>

<style scoped>
.container-page-status {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15px;
}
.box-num-approve {
  display: flex;
}
.text-head {
  font-size: 34px;
  font-weight: 700;
}
.box-card {
  /* border: 2px solid navy; */
  padding: 10px;
  /* border-radius: 10px; */
  box-shadow: 3px 4px 13px rgb(188 229 238 / 20%),
    3px 4px 13px rgb(168 223 216 / 16%);
  border-radius: 5px;
  margin-bottom: 30px;
  width: 80%;
}
.box-check {
  margin: 10px;
}
.space {
  display: flex;
}
</style>