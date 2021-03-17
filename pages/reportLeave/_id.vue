<template>
  <div class="one">
    <div class="box">
      <a-tabs default-active-key="1" @change="callback">
        <a-tab-pane key="1" tab="Wait">
            <div >


            </div>
             Content of Tab Pane 1 
        </a-tab-pane>


        <a-tab-pane key="2" tab="Approve" force-render>Content of Tab Pane 2</a-tab-pane>
        <a-tab-pane key="3" tab="Reject"> Content of Tab Pane 3 </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {

    };
  },
  mounted() {
    this.getData();
  },
  methods: {
      async getData() {
      let res = await axios.get(`https://db-back.herokuapp.com//report/leave/userid/${this.leaves.userId}`)
      this.leaves = res.data;
      // console.log("get", this.leaves);
    },
    // callback(key) {
    //   console.log(key);
    // },
  },
};
</script>

<style scoped>
.one {
    display: flex;
    justify-content: center;
}
.box {
  width: 280px;
}
.ant-tabs-nav-scroll {
  overflow: auto;
  white-space: initial;
  display: flex;
  justify-content: space-evenly;
  /* width: 8px; */
}
</style>