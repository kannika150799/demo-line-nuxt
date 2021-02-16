<template>
  <div>
    <a-select
      show-search
      placeholder="หัวข้อการลา"
      option-filter-prop="children"
      style="width: 120px"
      :filter-option="filterOption"
      class="breed_select"
      @change="handleChange"
    >
      <a-select-option v-for="author in authors" :key="author">
        {{ author }}
      </a-select-option>
    </a-select>
    <!-- <p>{{ show }}</p> -->
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  data () {
    return {
      authors: ['ลากิจ', 'ลาป่วย', 'ลาบวช', 'ลาพักร้อน','ลาคลอด','อื่นๆ']
    //   show: ''
      // photo: null,
      // id: this.$route.params.id
    }
  },
//   mounted () {
//     this.getData()
//   },
  methods: {
    handleChange (value) {
      this.show = value
      console.log(`selected ${value}`)
      console.log(this.photo)
    },
    filterOption (input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().includes(input.toLowerCase())
      )
    }
    // async getData () {
    //   const res = await axios.get('https://api.thedogapi.com/v1/breeds')
    //   this.photo = res.data
    //   console.log(this.photo)
    // }
  }
}
</script>
