<template>
  <div>
    <div class="profile">
      <!-- <img src="~/assets/IMG.jpg" alt="" /> -->
      <img v-if="profile.profileImage == ''" src="~/assets/IMG.jpg" alt="" />
      <img v-else :src="profile.profileImage" alt="" />
      <p class="display-name">{{profile.displayName}}</p>
    </div>
    <div class="container-input">
      <template>
        <div class="box-input">
          <p class="text-input name">Name4</p>
          <a-input placeholder="Name" />
        </div>
        <div class="box-input">
          <p class="text-input">Nickname&nbsp;</p>
          <a-input placeholder="Nickname" />
        </div>
        <div class="box-input">
          <p class="text-input position">Position</p>
          <a-input placeholder="Position" />
        </div>
      </template>
      <a-button class="register-button" type="primary"> Register </a-button>
    </div>
  </div>
</template>

<script>
// export default {
//   mounted() {
//     liff
//       .init({
//         liffId: "1655660869-VoKZDYDO",
//       })
//       .then(() => {
//         if (liff.isLoggedIn()) {
//           liff.getProfile().then((profile) => {
//             this.profile.profileImage = profile.pictureUrl;
//             this.profile.displayName = profile.displayName;
//           });
//         } else {
//           liff.login();
//         }
//       });
//   },
//   data() {
//     return {
//       profile: {
//         profileImage: "",
//         displayName: "Display Name",
//         userId: "",
//       },
//     };
//   },
// };
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
.register-button {
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
