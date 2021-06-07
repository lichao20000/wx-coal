<template>
  <div>
    <div class="send" @click="handleClick()">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import mywx from '../js/mywx.js'
export default {
  props: {
    // text: {
    //   type: String,
    //   default: '发送'
    // },
    msgtype: {
      type: String,
      default: 'text' // 文本text, 图片image, 视频video, 文件file, 消息news
    },
    msgObject: {
      type: Object,
      default: null
    }
  },
  async mounted () {
    const _self = this
    window.onload = () => {
      _self.authentication()
    }
  },
  methods: {
    async authentication () {
      let result = await mywx.chatSignature({
        appId: this.appId,
        agentId: this.agentId,
        url: location.href.indexOf('#') >= 0 ? location.href.split('#')[0] : location.href
      })
      try {
        window.wx.agentConfig({
          corpid: this.appId,
          agentid: this.agentId,
          timestamp: result.data.timestamp,
          nonceStr: result.data.nonceStr,
          signature: result.data.signature,
          jsApiList: ['agentConfig', 'invoke', 'sendChatMessage'], // 必填
          success: res => { // 成功回调
            // this.getData()
          },
          fail: function (res) {
            if (res.errMsg.indexOf('function not exist') > -1) {
              alert('版本过低请升级')
            }
          }
        })
      } catch (error) {
        alert('agentConfig鉴权出错！')
      }
    },
    async sendChatMessage (callback) {
      window.wx.invoke('sendChatMessage', {
        msgtype: this.msgtype, // 消息类型，必填
        text: {
          content: this.msgObject.content // 文本内容
        },
        image: {
          mediaid: this.msgObject.mediaid // 图片的素材id
        },
        video: {
          mediaid: this.msgObject.mediaid // 视频的素材id
        },
        file: {
          mediaid: this.msgObject.mediaid // 文件的素材id
        },
        news: {
          link: this.msgObject.link, // H5消息页面url 必填
          title: this.msgObject.title, // H5消息标题
          desc: this.msgObject.desc, // H5消息摘要
          imgUrl: this.msgObject.imgUrl // H5消息封面图片url
        }
      }, function (res) {
        if (res.err_msg === 'sendChatMessage:ok') {
          this.$emit('sendSuccess')
          // callback()
        } else {
          // alert('sendChatMessage发送消息失败！')
        }
      })
    },
    handleClick () {
      this.$emit('handleClick')
    }
  }
}
</script>
