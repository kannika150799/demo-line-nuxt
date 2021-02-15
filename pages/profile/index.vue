<template>
  <div>
    <img v-if="profile.profileImage == ''" src="~/assets/IMG.jpg" alt="" />
    <img v-else :src="profile.profileImage" alt="" />
    <p>userID: {{ profile.userId }}</p>
    <p>displayName: {{ profile.displayName }}</p>
  </div>
</template>

<script>
// import liff from '@line/liff';

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
        displayName: "Display Name",
        userId: ""
      },
    };
  },
};
</script>

<style scopeD>
img {
  width: 25%;
}
</style>