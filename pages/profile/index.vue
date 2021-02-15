<template>
  <div class="profile">
    <img v-if="profile.profileImage == ''" src="~/assets/IMG.jpg" alt="" />
    <img v-else :src="profile.profileImage" alt="" />
    <p>displayName: {{ profile.displayName }}</p>
  </div>
</template>

<script>
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
        displayName: "Display Name",
        userId: ""
      },
    };
  },
};
</script>

<style scoped>
.profile {
  margin: 40px 0px 30px;
  text-align: center;
}
img {
  width: 25%;
  border-radius: 50%;
}

</style>
