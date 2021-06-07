import axios from 'comp/js/axios'
const API_URL = {
  wxSignUrl: `${process.env.API_ROOT}/wechat/signature`, // 获取企业微信js签名
  chatSignature: `${process.env.API_ROOT}/wechat/chatSignature` // 获取企业微信js签名
}
const actions = {
  async getWechatSign (params) {
    let ret = ''
    await axios(API_URL.wxSignUrl, {
      method: 'GET',
      params: params
    }).then((data) => {
      ret = data
    }).catch(() => {
      ret = {}
    })
    return ret
  },
  async chatSignature (params) {
    let ret = ''
    await axios(API_URL.chatSignature, {
      method: 'GET',
      params: params
    }).then((data) => {
      ret = data
    }).catch(() => {
      ret = {}
    })
    return ret
  }
}
export default actions
