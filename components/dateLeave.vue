<template>
  <div class="container-date">
    <a-date-picker
      v-model="startValue"
      :disabled-date="disabledStartDate"
      show-time
      format="YYYY-MM-DD"
      placeholder="Start"
      class="disabled-date" 
      @openChange="handleStartOpenChange"
    />
    <a-date-picker
      v-model="endValue"
      :disabled-date="disabledEndDate"
      show-time
      format="YYYY-MM-DD"
      placeholder="End"
      :open="endOpen"
      class="disabled-date"
      @openChange="handleEndOpenChange"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      startValue: null,
      endValue: null,
      endOpen: false,
    };
  },
  watch: {
    startValue(val) {
      console.log('startValue', val);
    },
    endValue(val) {
      console.log('endValue', val);
    },
  },
  methods: {
    disabledStartDate(startValue) {
      const endValue = this.endValue;
      if (!startValue || !endValue) {
        return false;
      }
      return startValue.valueOf() > endValue.valueOf();
    },
    disabledEndDate(endValue) {
      const startValue = this.startValue;
      if (!endValue || !startValue) {
        return false;
      }
      return startValue.valueOf() >= endValue.valueOf();
    },
    handleStartOpenChange(open) {
      if (!open) {
        this.endOpen = true;
      }
    },
    handleEndOpenChange(open) {
      this.endOpen = open;
    },
  },
};
</script>

<style scoped>
.container-date {
    width: 200px;
}
.span {
    margin: 5px 0px 5px;
    text-align: center;
    font-size: 20px;
}

</style>
