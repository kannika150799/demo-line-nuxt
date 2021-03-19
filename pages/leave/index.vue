<template>
  <div v-if="profile.name !== ''" class="container-page-leave">
    <!-- <div v-if="profile.name !== ''" class="container-page-leave"> -->
    <p class="text-head">Leave</p>
    <div class="containar-detail">
      <div class="containar-title">
        <!-- <p class="text txt-title">Name&nbsp;</p> -->
        <p class="text txt-title">{{ profile.name }}</p>
      </div>
      <div class="container-head">
        <p class="text-leave text">Topic</p>
        <div>
          <a-select
            show-search
            placeholder="topic"
            option-filter-prop="children"
            style="width: 100%"
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
        <p class="text">Note</p>
        <template>
          <a-textarea
            placeholder="Note"
            :rows="2"
            class="textarea"
            v-model="leave.reson"
          />
        </template>
      </div>
      <div class="container-date">
        <p class="text-leave text">Date</p>
        <div class="date-leave">
          <div class="container-date box-date">
            <a-date-picker placeholder="Start" format="DD/MM/YYYY" @change="onChangeStart" />
            <a-date-picker placeholder="End" format="DD/MM/YYYY" @change="onChangeEnd" />
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
    liff.init({ liffId: "1655743042-4ne2Q9zE" }).then(() => {
      if (liff.isLoggedIn()) {
        liff.getProfile().then((profile) => {
          this.$nextTick(() => {
            this.$nuxt.$loading.start();
          });
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
        dateStart: "",
        dateEnd: "",
        status: "Wait",
      },
      authors: [
        "Personal Leave",
        "Sick Leave",
        "Ordination Leave",
        "Vacation Leave",
        "Maternity Leave",
        "Other",
      ],
    };
  },
  methods: {
    async makeGetRequest() {
      await axios
        .get(`https://db-line.herokuapp.com/api/get/user/${this.leave.userId}`)
        .then((res) => {
          this.$nextTick(() => {
            setTimeout(
              () => this.$nuxt.$loading.finish(),
              (this.profile = res.data)
            );
          });
        });
      // this.profile = res.data;
      // console.log("get", this.profile);
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
    onChangeStart(date1, dateString1) {
      console.log(date1, dateString1);
      this.leave.startValue = date1;
      this.leave.dateStart = dateString1;
    },
    onChangeEnd(date2, dateString2) {
      console.log(date2, dateString2);
      this.leave.endValue = date2;
      this.leave.dateEnd = dateString2;
    },
    send() {
      this.$axios.post("https://db-line.herokuapp.com/api/post/leave", this.leave)
        .then((res) => {
          liff.closeWindow();
        });

      // this.$router.push("/leave/status");
      console.log("leave", this.leave);
    },
  },
  head:{
    title: 'Leave'
  }
};
</script>

<style scoped>
.container-page-leave {
  font-family: Dosis;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* margin-top: 15px; */
  font-family: inherit;
}
.containar-detail {
  font-family: Dosis;
  width: 80%;
  padding: 20px 20px 20px 30px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 3px 4px 13px rgb(128 153 156 / 20%),
    3px 4px 13px rgb(168 223 216 / 16%);
}
.ant-calendar-picker-input {
  width: 100%;
  /* margin-bottom: 20px; */
}
.containar-title {
  display: flex;
}
.text-head {
  font-family: Dosis;
  font-size: 28px;
  font-weight: 700;
}
/* .container-head {
  display: flex;
} */
.text-leave {
  align-self: center;
}
.text {
  font-size: 18px;
  font-weight: 600;
  margin: 10px 0px;
}
.txt-title {
  /* margin: 0px 5px 20px 0px; */
}
.ant-select-selection--single {
  width: 92%;
}
.textarea {
  /* margin: 5px 0px 5px; */
  width: 100%;
  resize: none;
}
.send-button {
  font-family: Dosis;
  width: 120px;
  height: 44px;
  font-size: 18px;
  font-weight: 600;
  margin-top: 30px;
  border-radius: 10px;
  box-shadow: 3px 4px 13px rgb(17 15 14 / 5%),
    3px 4px 13px rgb(168 223 216 / 16%);
}
.container-date {
  width: 100%;
}
.box-date {
  height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* margin: 0px 20px; */
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