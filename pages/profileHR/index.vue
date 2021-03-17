<template>
  <div>
    <div v-if="profile.name !== ''" class="one-box">
      <!-- <div v-if="profile.name !== ''" class="one-box"> -->
      <div class="profile">
        <!-- <img src="~/assets/IMG.jpg" alt="" /> -->
        <img v-if="profile.profileImage == ''" src="~/assets/white.jpg" alt="" />
        <img v-else :src="profile.profileImage" alt="" />
        <!-- <p class="display-name">{{ profile.displayName }}</p> -->
      </div>
      <div class="container-input">
        <template>
          <div class="box-input">
            <p class="text-input name">Name</p>
            <a-input placeholder="Full name" v-model="profile.name" />
          </div>
          <div class="box-input">
            <p class="text-input">Nickname&nbsp;</p>
            <a-input placeholder="Nickname" v-model="profile.nickname" />
          </div>
          <div class="box-input">
            <p class="text-input position">Position</p>
            <a-input placeholder="Position" v-model="profile.position" />
          </div>
        </template>
        <a-button class="register-button" type="primary" @click="register">
          Register
        </a-button>
      </div>
    </div>

    <div v-else class="one-box">
      <!-- <div v-if="profile.name !== ''" class="one-box"> -->
      <div class="profile">
        <!-- <img src="~/assets/IMG.jpg" alt="" /> -->
        <img v-if="profile.profileImage == ''" src="~/assets/IMG.jpg" alt="" />
        <img v-else :src="profile.profileImage" alt="" />
        <!-- <p class="display-name">{{ profile.displayName }}</p> -->
      </div>
      <div class="container-input">
        <template>
          <div class="box-input">
            <p class="text-input name">Name</p>
            <a-input placeholder="Full name" v-model="profile.name" />
          </div>
          <div class="box-input">
            <p class="text-input">Nickname&nbsp;</p>
            <a-input placeholder="Nickname" v-model="profile.nickname" />
          </div>
          <div class="box-input">
            <p class="text-input position">Positions</p>
            <a-input placeholder="Position" v-model="profile.position" />
          </div>
        </template>
        <a-button class="register-button" type="primary" @click="register">
          Register
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
    });

    liff.init({ liffId: "1655736391-enZgDWla" }).then(() => {
      if (liff.isLoggedIn()) {
        liff.getProfile().then((profile) => {
          this.profile.profileImage = profile.pictureUrl;
          this.profile.displayName = profile.displayName;
          this.profile.userId = profile.userId;
          this.isDone();
          console.log(this.profile.userId);
        });
      } else {
        this.$nextTick(() => {
          this.$nuxt.$loading.finish();
        });
        liff.login();
      }
    });
  },
  data() {
    return {
      profile: {
        profileImage: "",
        displayName: "",
        userId: "",
        name: "",
        nickname: "",
        position: "",
        rank: "",
      },
    };
  },
  methods: {
    isDone() {
      this.$axios.get(`https://db-back.herokuapp.com/api/get/user/${this.profile.userId}`)
        .then((res) => {
          if (res.data != null || res.data != undefined) {
            this.$router.push("/profileHR/_id");
          } else {
            this.$nextTick(() => {
              this.$nuxt.$loading.finish();
            });
          }
        });
    },
    register() {
      this.$axios.post("https://db-back.herokuapp.com/api/post/user/hr",this.profile);
      this.$router.push(`/profileHR/${this.profile.userId}`);
      console.log(this.profile);
    },
  },
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
.register-button {
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
  width: 300px;
}
.ant-input {
  width: 160px;
  border: 1px solid transparent;
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
