<template>
  <div>
      <p>กิจกรรม</p>
    <div>
      <p>กิจกรรม: (ชื่อกิจกรรม)</p>
      <p>วันที่: (วันที่)</p>
      <div>
        <a-button class="edit-button" type="primary" @click="editList">
          Edit
        </a-button>
        <a-button class="delete-button" type="primary" @click="deleteList">
          Delete
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    editList() {
        this.$router.push('/calendar/editCalendar')
    },
    deleteList() {}
  },
};
</script>

<style scoped>
</style>