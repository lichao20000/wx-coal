<template>
  <div class="list-wrapper">
    <div class="select-box">
      <van-dropdown-menu>
  <van-dropdown-item v-model="value1" :options="option1" />
</van-dropdown-menu>
    </div>
  </div>
</template>
<script>
import { DropdownMenu, DropdownItem } from 'vant';
export default {
  name: '',
  components: {
   [DropdownMenu.name]: DropdownMenu, 
   [DropdownItem.name]: DropdownItem, 
    
  },
  data () {
    return {
      value1: 0,
      option1: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 },
      ],
    }
  },

  async created () {
    
  },
  async mounted () {
  },
  methods: {
 
   
  }
}
</script>


<style lang="postcss" scoped>

</style>
