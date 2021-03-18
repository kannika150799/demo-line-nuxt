<template>
  <div class="one">
    <div class="box">
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="Wait">
          <div v-for="leave in leaves" :key="leave.id">
            <div v-for="pass in leave.info.wait" :key="pass.id">
              <div class="box-detail">
                <p>Topic : {{ pass.leaveType }}</p>
                <p>Note : {{ pass.reson }}</p>
                <p>Date : {{ pass.dateStart }} - {{ pass.dateEnd }}</p>
                <p>Status : {{ pass.status }}</p>
              </div>
            </div>
          </div>
        </a-tab-pane>

        <a-tab-pane key="2" tab="Approve" force-render>
          <div v-for="leave in leaves" :key="leave.id">
            <div v-for="pass in leave.info.yes" :key="pass.id">
              <div class="box-detail">
                <p>Topic : {{ pass.leaveType }}</p>
                <p>Note : {{ pass.reson }}</p>
                <p>Date : {{ pass.dateStart }} - {{ pass.dateEnd }}</p>
              </div>
            </div>
          </div>
        </a-tab-pane>

        <a-tab-pane key="3" tab="Reject">
          <div v-for="leave in leaves" :key="leave.id">
            <div v-for="pass in leave.info.no" :key="pass.id">
              <div class="box-detail">
                <p>Topic : {{ pass.leaveType }}</p>
                <p>Note : {{ pass.reson }}</p>
                <p>Date : {{ pass.dateStart }} - {{ pass.dateEnd }}</p>
              </div>
            </div>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
    });
    liff.init({ liffId: "1655743042-do9lERxa" }).then(() => {
      if (liff.isLoggedIn()) {
        liff.getProfile().then((profile) => {
          this.leaves.userId = profile.userId;
          this.getData();
        });
      } else {
        liff.login();
      }
    });
  },
  data() {
    return {
      // leaves: null,
      leaves: {
        userId: "",
        leaveType: "",
        reson: "",
        startValue: "",
        endValue: "",
        dateStart: "",
        dateEnd: "",
        status: "",
      },
    };
  },
  methods: {
    async getData() {
      await axios
        .get(
          `https://db-back.herokuapp.com/api/get/leaveByUser/${this.leaves.userId}`
        )
        .then((res) => {
          this.$nextTick(() => {
            setTimeout(
              () => this.$nuxt.$loading.finish(),
              (this.leaves = res.data)
            );
          });
        });
      // this.leaves = res.data;
      // console.log("get", this.leaves);
    },
  },
  head:{
    title: 'Leave'
  }
};
</script>

<style scoped>
.one {
  display: flex;
  justify-content: center;
}
.box {
  width: 320px;
}
.ant-tabs-nav-scroll {
  overflow: auto;
  white-space: initial;
  display: flex;
  justify-content: space-evenly;
  /* width: 8px; */
}
.box-detail {
  border-bottom: 1px solid lightblue;
  margin-bottom: 10px;
  padding-left: 20px;
}

.container-page-status {
  font-family: Dosis;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* margin-top: 15px; */
}
.text-head {
  margin: 0px 0px 20px;
  font-size: 28px;
  font-weight: 600;
}
.box-card {
  /* border: 2px solid navy;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 15px; */
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 3px 4px 13px rgb(42 90 90 / 20%),
    3px 4px 13px rgb(168 223 216 / 16%);
  width: 75%;
  margin-bottom: 20px;
}
p {
  font-size: 16px;
}
</style>