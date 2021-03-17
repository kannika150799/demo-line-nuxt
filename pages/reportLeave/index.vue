<template>
  <div class="container-page-status">
    <p class="text-head">Report for Leaves</p>

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
            <div @click="selectOption(author)">
              {{ author }}
            </div>
          </a-select-option>
        </a-select>
      </div>
    </div>

    <div class="box-card" v-for="info in infos" :key="info">
      <div @click="boxName(info.info.userId, author)">
        <!-- <p>{{ info.info.leave.length > 0 ? info.info.name : "" }}</p> -->
        <p style="font-size: 18px">{{ info.info.name }}</p>
        <div class="box-num-approve">
          <p>Number of leave(Approve):&nbsp;</p>
          <p>{{ info.info.leave.length > 0 ? info.info.numApprove : "0" }}</p>
          <!-- <p>&nbsp;ครั้ง</p> -->
        </div>
        <div class="box-num-approve">
          <p>Number of leave(Reject):&nbsp;</p>
          <p>
            {{ info.info.leave.length > 0 ? info.info.numDisapproval : "0" }}
          </p>
          <!-- <p>&nbsp;ครั้ง</p> -->
        </div>
        <!-- <div class="box-check" v-for="check in info.info.leave" :key="check">
        <p>Topic: {{ check.leaveType }}</p>
        <p>Date: {{ check.dateStart }} - {{ check.dateEnd }}</p>
        <p>Status: {{ check.status }}</p>
      </div> -->
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
      authors: ["2017", "2018", "2019", "2020", "2021"],
      infos: null,
      select: ""
    };
  },
  mounted() {
    liff.init({ liffId: "1655736391-Dok3LZo2" });
    // this.$nextTick(() => {
    //   this.$nuxt.$loading.start();
    // });
    // this.getData();
  },
  methods: {
    handleChange(value) {
      axios
        .get(`https://db-back.herokuapp.com/report/leave/${value}`)
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
    selectOption(author) {
      this.select = author
      console.log("select", this.select);
    },
    boxName(name) {
      let deteil = `${this.select}` + "ABCDE" + name
      console.log(deteil);
      this.$router.push(`reportLeave/${deteil}`);
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
  /* font-family: Dosis; */
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px 0px 15px;
}
.box-num-approve {
  display: flex;
  margin-left: 20px;
}
.text-head {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 20px;
}
.box-card {
  /* border: 2px solid navy; */
  padding: 10px;
  /* border-radius: 10px; */
  /* box-shadow: 3px 4px 13px rgb(188 229 238 / 20%),
    3px 4px 13px rgb(168 223 216 / 16%); */
  /* border-radius: 5px; */
  margin-bottom: 20px;
  width: 80%;
  border-bottom: 1px solid black;
}
.box-check {
  margin: 0px 40px;
  border-top: 1px solid gainsboro;
}
.text {
  font-size: 18px;
  margin-right: 10px;
}
.space {
  display: flex;
}
</style>