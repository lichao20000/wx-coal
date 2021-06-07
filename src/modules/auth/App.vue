<script>
import { getUrlSearch } from 'comp/js/buriedPoint.js'
export default {
  name: 'Auth',
  created () {
    const SERVER_URL = `${location.origin}/wep-api`
    const type = getUrlSearch().type || '1'
    const sendMassageType = getUrlSearch().sendMassageType || ''
    let jumpUrl1 = getUrlSearch().redirectUrl
    const appid = getUrlSearch().appid
    const agentId = getUrlSearch().agentId
    const flag = getUrlSearch().flag
    const wxwork_userid = getUrlSearch().wxwork_userid
    const thirdPartyCode = getUrlSearch().thirdPartyCode || ''
    const noticeUrl = `${location.origin}/wep-h5/notice/index.html`
    let data = "";
    if(wxwork_userid){
      data = decodeURIComponent(jumpUrl1);
      if(data.indexOf("?") != -1){
        data = data + "&wxwork_userid=" + wxwork_userid;
      }else {
        data = data + "?wxwork_userid=" + wxwork_userid;
      }
    }
    const jumpUrl = data ? data : jumpUrl1;
    localStorage.setItem('appid', appid)
    console.log('localStorage.getItem(appid)', localStorage.getItem('appid'))
    localStorage.setItem('agentId', agentId)
    // sendMassageType 1
    localStorage.setItem('sendMassageType', sendMassageType)
    localStorage.setItem('thirdPartyCode', thirdPartyCode)

    // 构造网页授权链接
    const authUri = 'https://open.weixin.qq.com/connect/oauth2/authorize'
    const failedUrl = `${location.origin}/wep-h5/denied/index.html`
    // 回调地址
    let authCallbackUrl = `${SERVER_URL}/wechat/zlAuthCallback.jhtml?redirectUrl=${encodeURIComponent(jumpUrl)}&failedUrl=${encodeURIComponent(failedUrl)}&cbUrl=${encodeURIComponent(noticeUrl)}&appid=${appid}&agentId=${agentId}&flag=${flag}`
    if (type === '2') {
      authCallbackUrl = `${SERVER_URL}/wechat/zlWechatAuthForAnniversaryCallback.json?redirectUrl=${encodeURIComponent(jumpUrl)}`
    } else if (type === '3') {
      authCallbackUrl = `${SERVER_URL}/wechat/zlWechatAuthIdCallback.json?redirectUrl=${encodeURIComponent(jumpUrl)}`
    }
    console.log(authCallbackUrl)
    const href = `${authUri}?appid=${appid}&redirect_uri=${encodeURIComponent(authCallbackUrl)}&response_type=code&scope=snsapi_base&state=#wechat_redirect`
    if(String(appid).length != 18){
      location.replace(failedUrl+'?type=2')
    }else{
      location.replace(href)
    }
    
  }
}
</script>
