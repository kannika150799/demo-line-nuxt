<template>
  <div class="container-page-status">
    <p class="text-head">Report for check-in/out</p>
    <div class="x1">
      <div class="space">
        <p class="text">Month</p>
        <div>
          <a-select
            show-search
            placeholder="month"
            option-filter-prop="children"
            style="width: 120px"
            :filter-option="filterOption"
            class="breed_select"
            @change="handleChangeMonth"
          >
            <a-select-option v-for="month in months" :key="month">
              {{ month }}
            </a-select-option>
          </a-select>
        </div>
      </div>
      <div class="space">
        <p class="text">Year</p>
        <div>
          <a-select
            show-search
            placeholder="year"
            option-filter-prop="children"
            style="width: 120px"
            :filter-option="filterOption"
            class="breed_select"
            @change="handleChangeYear"
          >
            <a-select-option v-for="year in years" :key="year">
              {{ year }}
            </a-select-option>
          </a-select>
        </div>
      </div>
      <!-- <a-button @click="confirm">Confirm</a-button> -->
    </div>
    <a-button class="x2" @click="confirm" type="primary">Search</a-button>

    <div class="box-card" v-for="info in infos" :key="info">
      <p style="font-size: 18px">
        {{ info.info.inout.length > 0 ? info.info.name : "" }}
      </p>
      <div class="box-check" v-for="check in info.info.inout" :key="check">
        <p>Date: {{ check.dateGet }}</p>
        <div class="space">
          <p style="margin-left: 20px">In: {{ check.timeIn }}&nbsp;</p>
          <p>&nbsp;Out: {{ check.timeOut }}</p>
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
      months: [
        "All",
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      years: ["2017", "2018", "2019", "2020", "2021"],
      infos: null,
      select: {
        monthValue: "",
        yearValue: "",
        allValue: "",
      },
    };
  },
  mounted() {
    liff.init({ liffId: "1655736391-Pm5DnWoE" });
  },
  methods: {
    //Month
    handleChangeMonth(valueM) {
      this.select.monthValue = valueM;
      console.log(valueM);
      // axios.get(`https://db-back.herokuapp.com/get/user1/${value}`)
      //   .then((res) => {
      //     this.infos = res.data;
      //     console.log("get", this.infos);
      //     console.log(`selected ${value}`);
      //   });
    },
    //Year
    handleChangeYear(valueY) {
      this.select.yearValue = valueY;
      console.log(valueY);
      // axios.get(`https://db-back.herokuapp.com/get/user1/${value}`)
      //   .then((res) => {
      //     this.infos = res.data;
      //     console.log("get", this.infos);
      //     console.log(`selected ${value}`);
      //   });
    },
    filterOption(input, option) {
      return option.componentOptions.children[0].text
        .toLowerCase()
        .includes(input.toLowerCase());
    },
    confirm() {
      this.select.allValue =
        `${this.select.monthValue}` + "ABCDE" + `${this.select.yearValue}`;
      console.log("ttt", this.select.allValue);
      axios
        .get(`https://db-back.herokuapp.com/get/user1/${this.select.allValue}`)
        .then((res) => {
          this.infos = res.data;
          // console.log("get", this.infos);
          // console.log(`selected ${value}`);
        });
    },
  },
};
</script>

<style scoped>
.container-page-status {
  /* font-family: Dosis; */
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
}
.text-head {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 20px;
}
.text {
  margin-right: 10px;
  margin-left: 10px;
  font-size: 18px;
}
.ant-select-selection--single {
  height: 36px;
  width: 110px;
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
.space {
  display: flex;
}
.box-check {
  margin: 10px;
  border-top: 1px solid whitesmoke;
}
.x1 {
  display: flex;
  flex-direction: row;
  width: 90%;
  justify-content: space-around;
}
.x2 {
  left: 34%;
  width: 99px;
  height: 40px;
}
</style>