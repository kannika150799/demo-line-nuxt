<template>
  <div class="container-page-leave">
    <p class="text-head">ใบลา</p>
    <div class="containar-detail">
      <div>
        <p class="text">ชื่อ&nbsp;{{profile.name}}</p>
      </div>
      <div class="container-head">
        <p class="text-leave text">หัวข้อการลา</p>
        <leaveTopic />
      </div>
      <div>
        <p class="text">หมายเหตุการลา</p>
        <template>
          <a-textarea
            placeholder="หมายเหตุการลา"
            :rows="2"
            style="width: 200px"
          />
        </template>
      </div>
      <div class="container-date">
        <p class="text-leave text">วันที่ลา</p>
        <div class="date-leave"><dateLeave /></div>
      </div>
    </div>
    <div><a-button class="send-button" type="primary"> Send </a-button></div>
  </div>
</template>

<script>
import leaveTopic from "~/components/leaveTopic";
import dateLeave from "~/components/dateLeave";
export default {
  components: {
    leaveTopic,
    dateLeave,
  },
  mounted() {
    liff
      .init({
        liffId: "1655660869-VoKZDYDO",
      })
      .then(() => {
        if (liff.isLoggedIn()) {
          liff.getProfile().then((profile) => {
            this.profile.profileImage = profile.pictureUrl;
            this.profile.userId = profile.userId;
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
        name: ""
      },
    };
  },
  methods: {
    async makeGetRequest() {
      let res = await axios.get(`http://localhost:3030/api/get/user/${this.profile.userId}`);
      this.profile = res.data;
      console.log("get", this.profile);
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
}
.containar-detail {
  width: 250px;
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
  margin: 0px;
}
.text {
  font-size: 16px;
  font-weight: 600;
  font-family: inherit;
}

.send-button {
  width: 100px;
  height: 44px;
  font-size: 16px;
  font-weight: 600;
  margin-top: 20px;
}
</style>