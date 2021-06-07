import axios from 'comp/js/axios'
// import Toast from 'comp/Toast'

// const BaseUrl = `http://169.254.68.82:19901/wep_api_war_exploded` // 查询订单列表的本地接口域名

const prefix = ''
const textServe = 'https://testzyxt.newbuy.chinaunicom.cn/wep-api'
const API_URL = {
  getUserId: `${process.env.API_ROOT}${prefix}/wechat/getUserId`,
  getMobile: `${process.env.API_ROOT}${prefix}/wechat/getMobile`,
  qryPersonas: `${process.env.API_ROOT}${prefix}/paintCentre/qryPersonas`,
  queryFriendInfo: `${process.env.API_ROOT}${prefix}/paintCentre/queryFriendInfo`,
  queryTypeNumber: `${process.env.API_ROOT}${prefix}/paintCentre/queryTypeNumber`,
  getCorpTagList: `${process.env.API_ROOT}${prefix}/externalContact/getCorpTagList`,
  editExternalBatchTag: `${process.env.API_ROOT}${prefix}/externalContact/editExternalBatchTag`,
  getExtContactTagInfo: `${process.env.API_ROOT}${prefix}/externalContact/getExtContactTagInfo`,
  wxSignUrl: `${process.env.API_ROOT}${prefix}/wechat/signature`, // 获取企业微信js签名
  chatSignature: `${process.env.API_ROOT}${prefix}/wechat/chatSignature`,
  getCustInfo: `${process.env.API_ROOT}${prefix}/maintenance/getCustInfo`,
  getCustTaskList: `${process.env.API_ROOT}${prefix}/maintenance/getCustTaskList`,
  updateUserExeByGroup: `${process.env.API_ROOT}${prefix}/maintenance/updateUserExeByGroup`,
  // getUserId: `${textServe}/wechat/getUserId`,
  // getMobile: `${textServe}/wechat/getMobile`,
  // qryPersonas: `${textServe}/paintCentre/qryPersonas`,
  // queryFriendInfo: `${textServe}/paintCentre/queryFriendInfo`,
  // queryTypeNumber: `${textServe}/paintCentre/queryTypeNumber`,
  // getCorpTagList: `${textServe}/externalContact/getCorpTagList`,
  // editExternalBatchTag: `${textServe}/externalContact/editExternalBatchTag`,
  // getExtContactTagInfo: `${textServe}/externalContact/getExtContactTagInfo`,
  // wxSignUrl: `${textServe}/wechat/signature`, // 获取企业微信js签名
  // chatSignature: `${textServe}/wechat/chatSignature`,
  // getCustInfo: `${textServe}/maintenance/getCustInfo`,
  // getCustTaskList: `${textServe}/maintenance/getCustTaskList`,
  // updateUserExeByGroup: `${textServe}/maintenance/updateUserExeByGroup`,
}

const actions = {
  // 获取userId
  async getUserId () {
    let ret = ''
    await axios(API_URL.getUserId, {
      method: 'GET'
    }).then((data) => {
      ret = data
    }).catch(() => {
      ret = {}
    })
    return ret
  },
  /**
   * 获取企业微信js签名
   * @method GET
   */
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
  // 获取手机号码
  async getMobile () {
    let ret = ''
    await axios(API_URL.getMobile, {
      method: 'GET'
    }).then((data) => {
      ret = data
    }).catch(() => {
      ret = {}
    })
    return ret
  },
  // 客户大数据标签查询
  async qryPersonas (params) {
    let ret = ''
    await axios(API_URL.qryPersonas, {
      method: 'POST',
      contentType: true,
      params: params
    }).then((data) => {
      ret = data
    }).catch(() => {
      ret = {}
    })
    return ret
  },
  // 用户好友接口
  async queryFriendInfo (params) {
    let ret = ''
    await axios(API_URL.queryFriendInfo, {
      method: 'POST',
     contentType: true,
      params: params
    }).then((data) => {
      ret = data
    }).catch(() => {
      ret = {}
    })
    return ret
  },
  // 用户添加客户基本信息
  async queryTypeNumber (params) {
    let ret = ''
    await axios(API_URL.queryTypeNumber, {
      method: 'GET',
      params: params
    }).then((data) => {
      ret = data
    }).catch(() => {
      ret = {}
    })
    return ret
  },
  // 企业客户标签查询
  async getCorpTagList (params) {
    let ret = ''
    await axios(API_URL.getCorpTagList, {
      method: 'POST',
      contentType: 'application/x-www-form-urlencoded',
      params: params
    }).then((data) => {
      ret = data
    }).catch(() => {
      ret = {}
    })
    return ret
  },
  // 客户打标签操作
  async  editExternalBatchTag (params) {
    let ret = ''
    await axios(API_URL. editExternalBatchTag, {
      method: 'POST',
      contentType: 'application/json',
      params: params
    }).then((data) => {
      ret = data
    }).catch(() => {
      ret = {}
    })
    return ret
  },
  // 客户已打标签查询
  async getExtContactTagInfo (params) {
    let ret = ''
    await axios(API_URL.getExtContactTagInfo, {
      method: 'GET',
      params: params
    }).then((data) => {
      ret = data
    }).catch(() => {
      ret = {}
    })
    return ret
  },
  async getCustInfo(params) {
    return axios(API_URL.getCustInfo, {
      method: 'POST',
      contentType: true,
      params
    })
  },
  async getCustTaskList(params) {
    let res = ''
    await axios(API_URL.getCustTaskList, {
      method: 'POST',
      contentType: true,
      params
    }).then((data) => {
      res = data;
    }).catch(() => {
      res = {}
    });
    return res;
  },
  // 更新群发任务
  async updateUserExeByGroup(params) {
    let result = ''
    await axios(API_URL.updateUserExeByGroup, {
      method: 'POST',
      contentType: true,
      params
    }).then((data) => {
      result = data;
    }).catch(() => {
      result = {}
    });
    return result;
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
  },
}

export default actions
