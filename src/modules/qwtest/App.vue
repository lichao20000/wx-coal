<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import { wxsdk } from 'comp/js/wx.share.config.js'
// import { getInfoForShareDraw } from './js/actions.js'
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
    // wxsdk.initshare({
    //   title: '我是分享给好友的标题',
    //   desc: '我是分享给好友的描述',
    //   link: location.href,
    //   imgUrl: `${location.origin}/images/bcp-h5/new-reservation/wechat_coin.png`,
    //   success () {} // 选填 如果不需要分享有返回可以不需要传
    // })
    // const res = await getInfoForShareDraw({ promoteId: 58 })
    // console.log(res)
  },
  watch: {
    $route (to, from) {
      document.title = to.meta.title
    }
  }
}
</script>

<style >
  @import url(../../components/css/reset.css);
  #app {
    height: 100vh;
  }
</style>
