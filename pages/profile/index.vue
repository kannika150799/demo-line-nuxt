<template>
  <div>
    <div class="profile">
      <img v-if="profile.profileImage == ''" src="~/assets/IMG.jpg" alt="" />
      <img v-else :src="profile.profileImage" alt="" />
      <p class="display-name">{{ profile.displayName }}</p>
    </div>
    <div>
      <template>
        <p>Name:&nbsp;</p>
        <a-input placeholder="Name" />
        <p>Nickname:&nbsp;</p>
        <a-input placeholder="Nickname" />
        <p>Position:&nbsp;</p>
        <a-input placeholder="Position" />
      </template>
      <a-button type="primary"> Register </a-button>
    </div>
  </div>
</template>
    </div>
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
        userId: "",
      },
    };
  },
};
</script>

<style scoped>
.profile {
  margin-top: 40px;
  text-align: center;
}
img {
  width: 25%;
  border-radius: 50%;
  margin-bottom: 30px;
}
.display-name {
  font-size: 16px;
  font-weight: 600;
  font-family: inherit;
}
</style>
