<template>
  <div>
    <img v-if="profileImage == ''" src="~/assets/IMG.jpg" alt="">
    <img v-else :src="profileImage" alt="">
    <p>userID: </p>
    <p>displayName: </p>
    <p>statusMessage: </p>

  </div>
</template>

<script>
// import liff from '@line/liff';

export default { 
  mounted(){
    liff.init({
      liffId: '1655660869-VoKZDYDO'
    }).then(() => {
      if(liff.isLoggedIn()){
        liff.getProfile().then(profile => {                    
          this.profileImage = profile.pictureUrl
        })
      }else{
        liff.login();
      }
    })
  },
  data(){    
    return { 
      profileImage: '',     
      form: {
        firstname: this.$store.getters.getRegister.firstname,
        lastname: this.$store.getters.getRegister.lastname,
        gender: this.$store.getters.getRegister.gender       
      },      
    }
  }
}
</script>

<style scoped>
img {
    width: 25%;
}
</style>