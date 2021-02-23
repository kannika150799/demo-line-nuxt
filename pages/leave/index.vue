<template>
  <div class="container-page-leave">
    <p class="text-head">ใบลา</p>
    <div class="containar-detail">
      <div class="containar-title">
        <p class="text txt-title">ชื่อ&nbsp;</p>
        <p class="text txt-title">{{ profile.name }}</p>
      </div>
      <div class="container-head">
        <p class="text-leave text txt-title">หัวข้อการลา</p>
        <div>
          <a-select
            show-search
            placeholder="หัวข้อการลา"
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
      <div>
        <p class="text">หมายเหตุของการลา</p>
        <template>
          <a-textarea
            placeholder="หมายเหตุการลา"
            :rows="2"
            class="textarea"
            v-model="leave.reson"
          />
        </template>
      </div>
      <div class="container-date">
        <p class="text-leave text">วันที่ลา</p>
        <div class="date-leave">
          <div class="container-date box-date">
            <a-date-picker
              v-model="leave.startValue"
              :disabled-date="disabledStartDate"
              show-time
              format="YYYY-MM-DD"
              placeholder="Start"
              class="disabled-date"
              @openChange="handleStartOpenChange"
            />
            <a-date-picker
              v-model="leave.endValue"
              :disabled-date="disabledEndDate"
              show-time
              format="YYYY-MM-DD"
              placeholder="End"
              class="disabled-date"
              @openChange="handleEndOpenChange"
            />
          </div>
        </div>
      </div>
    </div>
    <div>
      <a-button class="send-button" type="primary" @click="send">
        Send
      </a-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
    mounted() {
      liff
        .init({
          liffId: "1655660869-nvMGoZo6",
        })
        .then(() => {
          if (liff.isLoggedIn()) {
            liff.getProfile().then((profile) => {
              this.profile.profileImage = profile.pictureUrl;
              this.leave.userId = profile.userId;
              this.makeGetRequest();
            });
          } else {
            liff.login();
          }
        });
    },
  data() {
    return {
      profile: {
        name: "",
      },
      leave: {
        userId: "",
        leaveType: "",
        reson: "",
        startValue: "",
        endValue: "",
        status: "รออุมัติ",
      },
      authors: ["ลากิจ", "ลาป่วย", "ลาบวช", "ลาพักร้อน", "ลาคลอด", "อื่นๆ"],
      startValue: null,
      endValue: null,

    };
  },
  watch: {
    startValue(val) {
      console.log("startValue", val);
    },
    endValue(val) {
      console.log("endValue", val);
    },
  },
  methods: {
    async makeGetRequest() {
      let res = await axios.get(
        `https://db-back.herokuapp.com/api/get/user/${this.leave.userId}`
      );
      this.profile = res.data;
      console.log("get", this.profile);
    },
    send() {
      this.$axios.post("https://db-back.herokuapp.com/api/post/leave", this.leave);
      this.$router.push("/leave/status");
      console.log("leave", this.leave);
    },
    handleChange(value) {
      this.show = value;
      console.log(`selected ${value}`);
      this.leave.leaveType = value;
    },
    filterOption(input, option) {
      return option.componentOptions.children[0].text
        .toLowerCase()
        .includes(input.toLowerCase());
    },
    disabledStartDate(startValue) {
      const endValue = this.endValue;
      if (!startValue || !endValue) {
        return false;
      }
      return startValue.valueOf() > endValue.valueOf();
    },
    disabledEndDate(endValue) {
      const startValue = this.startValue;
      if (!endValue || !startValue) {
        return false;
      }
      return startValue.valueOf() >= endValue.valueOf();
    },

  },
};
</script>

<style scoped>
.container-page-leave {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
  font-family: inherit;
}
.containar-detail {
  width: 220px;
}
.containar-title {
  display: flex;
}
.text-head {
  font-size: 20px;
  font-weight: 900;
}
.container-head {
  display: flex;
}
.text-leave {
  align-self: center;
}
.text {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}
.txt-title {
    margin:0px 5px 20px 0px;
}
.textarea {
    margin: 5px 0px 20px;
    width: 220px;
    resize: none;
}
.send-button {
  width: 100px;
  height: 44px;
  font-size: 16px;
  font-weight: 600;
  margin-top: 40px;
}
.container-date {
  width: 220px;
}
.box-date {
    display: flex;
    flex-direction: column;
    
}
.span {
  margin: 5px 0px 5px;
  text-align: center;
  font-size: 20px;
}
.disabled-date {
  margin-top: 10px;
}
</style>