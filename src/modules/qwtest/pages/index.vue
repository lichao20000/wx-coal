<template>
  <div class="contaniner-box">
    <div class="sendBtn" @click="contact()">联系ta</div>
    <div class="sendBtn" @click="shareToExternalContact()">群发消息给客户</div>
    <div class="sendBtn" @click="shareToExternalChat()">群发消息到客户群</div>
    <div class="sendBtn" @click="selectExternalContact()">外部联系人选人</div>
    <div class="sendBtn" @click="onMenuShareAppMessage()">转发(弃)</div>
    <div class="sendBtn" @click="onMenuShareWechat()">微信</div>
    <div class="sendBtn" @click="onMenuShareTimeline()">分享到朋友圈(弃)</div>
    <div class="sendBtn" @click="shareAppMessage()">自定义转发到会话</div>
    <div class="sendBtn" @click="shareWechatMessage()">自定义转发到微信</div>
    <!-- <div class="sendBtn" @click="updateAppMessageShareData()">分享给朋友(新)</div>
    <div class="sendBtn" @click="updateTimelineShareData()">分享到朋友圈(新)</div> -->
    <div class="sendBtn" @click="hideOptionMenu()">隐藏右上角菜单接口</div>
    <div class="sendBtn" @click="showOptionMenu()">显示右上角菜单接口</div>
  </div>
</template>
<script>
import qwAgent from '@/components/qw/qw_agent.js'
export default {
  data () {
    return {
      params: {
        title: '分享标题', // 分享标题
        desc: '分享描述', // 分享描述
        link: 'http://testzyxt.newbuy.chinaunicom.cn/bucket-testbcp/2021-02-18/B89390C3326045E3A71EB7D6F9D23F25.jpg', // 分享链接；在微信上分享时，该链接的域名必须与企业某个应用的可信域名一致
        imgUrl: 'http://testzyxt.newbuy.chinaunicom.cn/bucket-testbcp/2021-02-18/B89390C3326045E3A71EB7D6F9D23F25.jpg' // 分享图标
      }
    }
  },
  methods: {
    contact () {
      console.log('contact enter')
      qwAgent.openEnterpriseChat({
        externalUserIds: 'wmfLN_CgAAT4d-3cLS-AzEF8Pl9n-1dw'
        // externalUserIds: 'wmfLN_CgAA22m4I9q6wl8xyMfbC53b9w'
      })
      console.log('contact end')
    },
    shareToExternalContact () {
      console.log('2 enter')
      let attachments = [
        {
          msgtype: 'link',
          link: {
            title: '群发的消息标题',
            imgUrl: 'http://testzyxt.newbuy.chinaunicom.cn/bucket-testbcp/2021-02-18/B89390C3326045E3A71EB7D6F9D23F25.jpg',
            desc: '群发的消息摘要',
            url: 'http://www.baidu.com'
          }
        },
        {
          msgtype: 'miniprogram',
          miniprogram: {
            appid: 'wx4decd42b7eea209b',
            title: '小程序标题',
            imgUrl: 'http://testzyxt.newbuy.chinaunicom.cn/bucket-testbcp/2021-02-18/B89390C3326045E3A71EB7D6F9D23F25.jpg',
            page: '/pages/index/index.html?appId=ww8f0366b20d0446db'
          }
        }
      ]
      qwAgent.shareToExternalContact(undefined, attachments, function () {
        console.log('2 success callback')
      })
    },
    shareToExternalChat () {
      console.log('2 enter')
      let attachments = [
        {
          msgtype: 'link',
          link: {
            title: '群发的消息标题',
            imgUrl: 'http://testzyxt.newbuy.chinaunicom.cn/bucket-testbcp/2021-02-18/B89390C3326045E3A71EB7D6F9D23F25.jpg',
            desc: '群发的消息摘要',
            url: 'http://www.baidu.com'
          }
        },
        {
          msgtype: 'miniprogram',
          miniprogram: {
            appid: 'wx4decd42b7eea209b',
            title: '小程序标题',
            imgUrl: 'http://testzyxt.newbuy.chinaunicom.cn/bucket-testbcp/2021-02-18/B89390C3326045E3A71EB7D6F9D23F25.jpg',
            page: '/pages/index/index.html?appId=ww8f0366b20d0446db'
          }
        }
      ]
      qwAgent.shareToExternalChat('hello 内容', attachments, function () {
        console.log('2 success callback')
      })
    },
    selectExternalContact () {
      qwAgent.selectExternalContact(0, function (userIds) {
        console.log('callback userIds', userIds)
        alert(JSON.stringify(userIds))
      })
    },
    onMenuShareAppMessage () {
      let obj = {
        title: '转发-标题', // 分享标题
        desc: '转发-分享描述', // 分享描述
        link: 'http://testzyxt.newbuy.chinaunicom.cn/bucket-testbcp/2021-02-18/B89390C3326045E3A71EB7D6F9D23F25.jpg', // 分享链接；在微信上分享时，该链接的域名必须与企业某个应用的可信域名一致
        imgUrl: 'http://testzyxt.newbuy.chinaunicom.cn/bucket-testbcp/2021-02-18/B89390C3326045E3A71EB7D6F9D23F25.jpg' // 分享图标
      }
      console.log('转发1')
      qwAgent.onMenuShareAppMessage(obj)
    },
    onMenuShareWechat () {
      let obj = {
        title: '微信-标题', // 分享标题
        desc: '微信-分享描述', // 分享描述
        link: 'http://testzyxt.newbuy.chinaunicom.cn/bucket-testbcp/2021-02-18/B89390C3326045E3A71EB7D6F9D23F25.jpg', // 分享链接；在微信上分享时，该链接的域名必须与企业某个应用的可信域名一致
        imgUrl: 'http://testzyxt.newbuy.chinaunicom.cn/bucket-testbcp/2021-02-18/B89390C3326045E3A71EB7D6F9D23F25.jpg' // 分享图标
      }
      console.log('微信1')
      qwAgent.onMenuShareWechat(obj)
    },
    onMenuShareTimeline () {
      let obj = {
        title: '微信朋友圈-标题', // 分享标题
        link: 'http://testzyxt.newbuy.chinaunicom.cn/bucket-testbcp/2021-02-18/B89390C3326045E3A71EB7D6F9D23F25.jpg', // 分享链接；在微信上分享时，该链接的域名必须与企业某个应用的可信域名一致
        imgUrl: 'http://testzyxt.newbuy.chinaunicom.cn/bucket-testbcp/2021-02-18/B89390C3326045E3A71EB7D6F9D23F25.jpg' // 分享图标
      }
      console.log('分享到朋友圈1')
      qwAgent.onMenuShareTimeline(obj)
    },
    shareAppMessage () {
      let obj = {
        title: '自定义转发到会话-标题', // 分享标题
        desc: '自定义转发到会话-分享描述', // 分享描述
        link: 'http://testzyxt.newbuy.chinaunicom.cn/bucket-testbcp/2021-02-18/B89390C3326045E3A71EB7D6F9D23F25.jpg', // 分享链接；在微信上分享时，该链接的域名必须与企业某个应用的可信域名一致
        imgUrl: 'http://testzyxt.newbuy.chinaunicom.cn/bucket-testbcp/2021-02-18/B89390C3326045E3A71EB7D6F9D23F25.jpg' // 分享图标
      }
      console.log('自定义转发到会话1')
      qwAgent.shareAppMessage(obj)
    },
    shareWechatMessage () {
      let obj = {
        title: '自定义转发到微信-标题', // 分享标题
        desc: '自定义转发到微信-分享描述', // 分享描述
        link: 'http://testzyxt.newbuy.chinaunicom.cn/bucket-testbcp/2021-02-18/B89390C3326045E3A71EB7D6F9D23F25.jpg', // 分享链接；在微信上分享时，该链接的域名必须与企业某个应用的可信域名一致
        imgUrl: 'http://testzyxt.newbuy.chinaunicom.cn/bucket-testbcp/2021-02-18/B89390C3326045E3A71EB7D6F9D23F25.jpg' // 分享图标
      }
      console.log('自定义转发到微信1')
      qwAgent.shareWechatMessage(obj)
    },
    updateAppMessageShareData () {
      let obj = {
        title: '分享标题新', // 分享标题
        desc: '分享描述新', // 分享描述
        link: 'http://testzyxt.newbuy.chinaunicom.cn/bucket-testbcp/2021-01-25/0956836618894E7190099FDA7F4FF409.jpg', // 分享链接；在微信上分享时，该链接的域名必须与企业某个应用的可信域名一致
        imgUrl: 'http://testzyxt.newbuy.chinaunicom.cn/bucket-testbcp/2021-01-25/0956836618894E7190099FDA7F4FF409.jpg' // 分享图标
      }
      console.log('分享给朋友(新)1')
      qwAgent.updateAppMessageShareData(obj)
    },
    updateTimelineShareData () {
      let obj = {
        title: '分享标题新朋友圈', // 分享标题
        link: 'http://testzyxt.newbuy.chinaunicom.cn/bucket-testbcp/2021-01-25/0956836618894E7190099FDA7F4FF409.jpg', // 分享链接；在微信上分享时，该链接的域名必须与企业某个应用的可信域名一致
        imgUrl: 'http://testzyxt.newbuy.chinaunicom.cn/bucket-testbcp/2021-01-25/0956836618894E7190099FDA7F4FF409.jpg' // 分享图标
      }
      console.log('分享到朋友圈(新)1')
      qwAgent.updateTimelineShareData(obj)
    },
    hideOptionMenu () {
      qwAgent.hideOptionMenu()
    },
    showOptionMenu () {
      qwAgent.showOptionMenu()
    }
  }
}
</script>
<style lang="postcss" scoped>
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
