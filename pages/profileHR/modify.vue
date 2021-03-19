<template>
  <div class="one-box">
    <div class="profile">
      <!-- <img src="~/assets/IMG.jpg" alt="" /> -->
      <img v-if="pf_line.profileImage == ''" src="~/assets/white.jpg" alt="" />
      <img v-else :src="pf_line.profileImage" alt="" />
      <!-- <p class="display-name">{{pf_line.displayName}}</p> -->
    </div>
    <div class="container-input">
      <template>
        <div class="box-input">
          <p class="text-input name">Name</p>
          <a-input v-model="profile.name">{{ profile.name }}</a-input>
        </div>
        <div class="box-input">
          <p class="text-input">Nickname&nbsp;</p>
          <a-input v-model="profile.nickname">{{ profile.Nickname }}</a-input>
        </div>
        <div class="box-input">
          <p class="text-input position">Position</p>
          <a-input v-model="profile.position">{{ profile.position }}</a-input>
        </div>
      </template>
      <a-button class="confirm-button" type="primary" @click="confirm">
        Confirm
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
        liffId: "1655736391-enZgDWla",
      })
      .then(() => {
        if (liff.isLoggedIn()) {
          liff.getProfile().then((profile) => {
            this.pf_line.profileImage = profile.pictureUrl;
            this.pf_line.displayName = profile.displayName;
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
      pf_line: {
        profileImage: "",
        displayName: "",
      },
      profile: {
        userId: "",
        name: "",
        nickname: "",
        position: "",
      },
    };
  },
  methods: {
    async makeGetRequest() {
      let res = await axios.get(
        `https://db-line.herokuapp.com/api/get/user/${this.profile.userId}`
      );
      this.profile = res.data;
      console.log("get", this.profile);
    },
    confirm() {
      this.$axios.put(`https://db-line.herokuapp.com/api/edit/user/${this.profile.userId}`,this.profile)
        .then(() => {
          this.$router.push(`/profileHR/${this.profile.userId}`);
          console.log("put", this.profile);
        });
    },
  },
  head:{
    title: 'Profile'
  }
};
</script>

<style scoped>
.one-box {
  font-family: Dosis;
  text-align: -webkit-center;
}
.profile {
  text-align: center;
}
img {
  width: 25%;
  border-radius: 50%;
  margin-bottom: 40px;
  z-index: 5;
  position: relative;
}
.display-name {
  font-size: 16px;
  font-weight: 600;
  font-family: inherit;
  margin-bottom: 40px;
}
.confirm-button {
  margin-top: 25px;
  height: 44px;
  width: 120px;
  font-size: 16px;
  font-weight: 400;
  border-radius: 41px;
  box-shadow: 3px 4px 13px rgb(17 15 14 / 10%),
    3px 4px 13px rgb(168 223 216 / 16%);
}
.container-input {
  text-align: -webkit-center;
  position: relative;
  width: 75%;
  background-color: white;
  border-radius: 10px;
  padding: 68px 20px 20px;
  box-shadow: 3px 4px 13px rgb(182 160 149 / 20%),
    3px 4px 13px rgb(168 223 216 / 16%);
  top: -88px;
  z-index: 1;
}
.box-input {
  display: flex;
  margin-bottom: 15px;
  /* width: 90%; */
  justify-content: space-between;
}
.ant-input {
  width: 160px;
  border: 1px solid transparent;
  border-radius: 0px;
  border-bottom-color: lightblue;
}
.text-input {
  margin: 0px;
  font-size: 16px;
  font-weight: 600;
  align-self: center;
}
/* .name {
  margin-right: 34px;
}
.position {
  margin-right: 20px;
} */
</style>
