<template>
  <div class="contaniner-box">
    <div class="sendBtn" @click="sendText()">发送文本</div>
    <div class="sendBtn" @click="sendImage()">发送图片</div>
    <div class="sendBtn" @click="sendVideo()">发送视频</div>
    <div class="sendBtn" @click="sendFile()">发送文件</div>
    <div class="sendBtn" @click="sendNews()">发送消息</div>
    <div class="sendBtn" @click="sendMiniProgram()">发送小程序</div>
    <div class="sendBtn" @click="getCurExternalContact()">获取当前外部联系人userid</div>
  </div>
</template>
<script>
import qwAgent from '@/components/qw/qw_agent.js'
export default {
  components: {
  },
  data () {
    return {
      appId: localStorage.getItem('appid') || process.env.APPID,
      agentId: localStorage.getItem('agentId') || process.env.AGENTID,
      vConsole: ''
    }
  },
  methods: {
    sendText () {
      qwAgent.sendChatMessage('text', {
        content: 'hello 这是文本'
      }, function () {
        console.log('sendText success')
      })
    },
    sendImage () {
      qwAgent.sendChatMessage('image', {
        mediaid: 600288
      }, function () {
        console.log('sendImage success')
      })
    },
    sendVideo () {
      qwAgent.sendChatMessage('video', {
        mediaid: 300204
      }, function () {
        console.log('sendVideo success')
      })
    },
    sendFile () {
      qwAgent.sendChatMessage('file', {
        mediaid: 300176
      }, function () {
        console.log('sendFile success')
      })
    },
    sendNews () {
      qwAgent.sendChatMessage('news', {
        link: 'http://www.baidu.com',
        title: '消息标题',
        desc: '消息描述',
        imgUrl: 'http://testzyxt.newbuy.chinaunicom.cn/bucket-testbcp/2021-02-18/B89390C3326045E3A71EB7D6F9D23F25.jpg'
      }, function () {
        console.log('sendNews success')
      })
    },
    sendMiniProgram () {
      qwAgent.sendChatMessage('miniprogram', {
        appid: 'wx4decd42b7eea209b',
        title: '小程序标题',
        imgUrl: 'https://search-operate.cdn.bcebos.com/d054b8892a7ab572cb296d62ec7f97b6.png',
        page: '/pages/index/index.html?appId=ww8f0366b20d0446db'
      }, function () {
        console.log('miniprogram success')
      })
    },
    getCurExternalContact () {
      qwAgent.getCurExternalContact(function (userId) {
        console.log('callback userId', userId)
        alert(userId)
      })
    }
  }
}
</script>
<style lang="postcss"  scoped>
@import url(../../../components/css/reset.css);
.contaniner-box {
  background-color: #fff;
  height: 100vh;
  padding-top: 10px;
  .sendBtn {
    margin: 20px auto;
    margin-top: 0;
    width: 70%;
    background-color: #4D98FF;
    color: #fff;
    font-size: 18px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    border-radius: 12px;
    border: 2px solid #4D98FF;
  }
}
</style>
