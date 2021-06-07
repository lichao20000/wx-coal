<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import { wxsdk } from 'comp/js/wx.share.config.js'
export default {
  name: 'App',
  data () {
    return {
    }
  },
  components: {},
  methods: {
  },
  async mounted () {
    // await wxsdk.wxConfig()
    // window.wx.ready(() => {
    //   wxsdk.hideMenuItems(['menuItem:share:appMessage', 'menuItem:share:timeline', 'menuItem:share:weiboApp', 'menuItem:share:qq', 'menuItem:share:QZone'])
    // })
  },
  watch: {
    $route (to, from) {
      document.title = to.meta.title
    }
  }
}
</script>

<style lang="postcss">
@import url(../../components/css/reset.css);
#app {
  height: 100%;
}
</style>
