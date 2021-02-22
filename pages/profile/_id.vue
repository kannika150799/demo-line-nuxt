<template>
  <div>
    <div class="profile">
      <!-- <img src="~/assets/IMG.jpg" alt="" /> -->
      <img v-if="profile.profileImage == ''" src="~/assets/IMG.jpg" alt="" />
      <img v-else :src="profile.profileImage" alt="" />
      <p class="display-name">{{ profile.displayName }}</p>
    </div>
    <div class="container-input">
      <template>
        <div class="box-input">
          <p class="text-input name">Name</p>
          <p class="text-input name">Name {{ profile.name }}</p>
        </div>
        <div class="box-input">
          <p class="text-input">Nickname&nbsp;</p>
          <p class="text-input name">Nickname {{ profile.nickname }}</p>
        </div>
        <div class="box-input">
          <p class="text-input position">Position</p>
          <p class="text-input name">Position {{ profile.position }}</p>
        </div>
      </template>
      <a-button class="edit-button" type="primary" @click="editUser">
        Edit
      </a-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  mounted() {
    
    liff
      .init({
        liffId: "1655660869-VoKZDYDO",
      })
      .then(() => {
        if (liff.isLoggedIn()) {
          liff.getProfile().then((profile) => {
            this.profile.profileImage = profile.pictureUrl;
            this.profile.displayName = profile.displayName;
            this.profile.userId = profile.userId;
          });
        } else {
          liff.login();
        }
      });
    
  },
  data() {
    return {
      profile: {
        profileImage: "",
        displayName: "",
        userId: this.$route.params.userId,
        name:"",
        nickname:"",
        position:""
        
      }
    };
  },
  methods:{
    // async getData () {
    //   const res = await axios.get(`http://localhost:3030/api/get/user/${this.profile.userId}`)
    //   this.user = res.data
    //   this.profile = res.data
    //   console.log('mmmmm', this.user);
    // },
    editUser () {
      console.log('ttttttt', this.profile)
    },
    async makeGetRequest() {
      let res = await axios.get(`http://localhost:3030/api/get/user/${this.profile.userId}`);
      let data = res.data;
      console.log(data);
    },
    makeGetRequest(){}
  }
};
</script>

<style scoped>
.profile {
  text-align: center;
}
img {
  width: 25%;
  border-radius: 50%;
  margin-bottom: 20px;
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
}
.container-input {
  text-align: -webkit-center;
}
.box-input {
  display: flex;
  margin-bottom: 15px;
  width: 300px;
}
.text-input {
  margin: 0px;
  font-size: 16px;
  font-weight: 600;
  align-self: center;
}
.name {
  margin-right: 34px;
}
.position {
  margin-right: 20px;
}
</style>
