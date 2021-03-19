<template>
  <div class="one-box">
    <div class="profile">
      <!-- <img src="~/assets/IMG.jpg" alt="" /> -->
      <img v-if="pf_line.profileImage == ''" src="~/assets/white.jpg" alt="" />
      <img v-else :src="pf_line.profileImage" alt="" />
      <!-- <p class="display-name">{{ pf_line.displayName }}</p> -->
    </div>
    <div class="container-input">
      <!-- <div v-if="profile" class="container-input"> -->
      <template>
        <div class="box-input">
          <p class="text-input name p1">Name</p>
          <p class="text-input name">{{ profile.name }}</p>
        </div>
        <div class="box-input">
          <p class="text-input p1">Nickname&nbsp;</p>
          <p class="text-input name">{{ profile.nickname }}</p>
        </div>
        <div class="box-input">
          <p class="text-input position p1">Positions</p>
          <p class="text-input name">{{ profile.position }}</p>
        </div>
      </template>
      <a-button class="edit-button" type="primary" @click="editUser">
        Edit
      </a-button>
    </div>
    <!-- <div v-else>hiooo</div> -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  mounted() {
    // this.$nextTick(() => {
    //   this.$nuxt.$loading.start();
    // });
    liff.init({ liffId: "1655736391-enZgDWla" }).then(() => {
      if (liff.isLoggedIn()) {
        liff.getProfile().then((profile) => {
          this.pf_line.profileImage = profile.pictureUrl;
          this.pf_line.displayName = profile.displayName;
          this.profile.userId = profile.userId;
          this.makeGetRequest();
        });
      } else {
        // this.$nextTick(() => {
        //   this.$nuxt.$loading.finish();
        // });
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
    editUser() {
      this.$router.push(`/profile/modify`);
    },
    async makeGetRequest() {
      let res = await axios.get(
        `https://db-line.herokuapp.com/api/get/user/${this.profile.userId}`
      );
      // .then((res) => {
      //   this.$nextTick(() => {
      //     this.$nuxt.$loading.finish();
      //   });
      //   this.profile = res.data;
      // });
      this.profile = res.data;
      // console.log("get", this.profile);
    },
  },
  head:{
    title: 'Profile'
  }
};
</script>

<style scoped>
.one-box {
  /* font-family: Dosis; */
  text-align: -webkit-center;
}
.profile {
  text-align: center;
}
img {
  width: 25%;
  border-radius: 50%;
  margin-bottom: 40px;
}
.display-name {
  font-size: 16px;
  font-weight: 600;
  font-family: inherit;
  margin-bottom: 40px;
}
.edit-button {
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
  width: 75%;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 3px 4px 13px rgb(182 160 149 / 20%), 3px 4px 13px rgb(168 223 216 / 16%);
}
.box-input {
  display: flex;
  margin-bottom: 15px;
  width: 280px;
}
.text-input {
  margin: 0px;
  font-size: 16px;
  font-weight: 600;
  /* align-self: center; */
}
.name {
  /* margin-right: 34px; */
}
.position {
  /* margin-right: 20px; */
}
.p1{
  width: 87px;
    display: inline-flex;
}
p{
  text-align: left;
}
</style>
