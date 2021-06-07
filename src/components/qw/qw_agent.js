import qwAction from './qw_action.js'

// 引入sdk
const loadSdk = () => {
  loadScript([
    '//res.wx.qq.com/open/js/jweixin-1.4.0.js',
    '//open.work.weixin.qq.com/wwopen/js/jwxwork-1.0.0.js'
  ]).then(() => {
    let appVersion = navigator.appVersion
    let regexp = new RegExp(/wxwork\/(\d+)\.(\d+)\.(\d+)/g)
    let appInfo = appVersion.match(regexp)
    if (appInfo) {
      let version = appInfo[0].split('/')[1]
      console.log('version', version)
      if (compareVersion(version, '3.1.6') < 0) { // 目标版本3.1.6 若版本小，给出提示
        alert('版本过低，请升级')
      }
    }
    authentication()
  })
}

// 引入script
function loadScript (urls) {
  let urlScript = []
  urls.forEach(ele => {
    urlScript.push(new Promise((resolve, reject) => {
      let script = document.createElement('script')
      script.src = ele
      document.body.appendChild(script)
      script.onload = function () {
        resolve()
      }
      script.onerror = function (error) {
        reject(error)
      }
    }))
  })
  return Promise.all(urlScript)
}

/**
 * 版本号比较
 * @param v1 String 'x.x.x'
 * @param v2 String 'x.x.x'
 * @returns number v1大 返回1；v2大 返回-1； v1==v2 返回0
 */
function compareVersion (v1, v2) {
  let arr1 = v1.split('.')
  let arr2 = v2.split('.')
  let minLength = Math.min(arr1.length, arr2.length)
  for (let i = 0; i < minLength; i++) {
    let num1 = parseInt(arr1[i])
    let num2 = parseInt(arr2[i])
    if (num1 < num2) {
      return -1
    } else if (arr1[i] === arr2[i]) {
      continue
    } else {
      return 1
    }
  }
  if (arr1.length === arr2.length) {
    return 0
  } else if (arr1.length > arr2.length) {
    return 1
  } else {
    return -1
  }
}

// 鉴权
const authentication = async () => {
  let result1 = await qwAction.getWechatSign({
    appId: localStorage.getItem('appid') || process.env.APPID,
    url:
      location.href.indexOf('#') >= 0
        ? location.href.split('#')[0]
        : location.href,
    agentId: localStorage.getItem('agentId') || process.env.AGENTID
  })
  await window.wx.config({
    // 发送请求配置wx接口函数，验签完成之后即可调用联系他接口
    beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: localStorage.getItem('appid') || process.env.APPID, // 必填，企业微信的corpID
    timestamp: result1.data.timestamp, // 必填，生成签名的时间戳
    nonceStr: result1.data.nonceStr, // 必填，生成签名的随机串
    signature: result1.data.signature, // 必填，签名，见 附录-JS-SDK使用权限签名算法
    jsApiList: [
      'agentConfig'
      // 'updateAppMessageShareData',
      // 'updateTimelineShareData'
    ] // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
  })
  let result2 = await qwAction.chatSignature({
    appId: localStorage.getItem('appid') || process.env.APPID,
    agentId: localStorage.getItem('agentId') || process.env.AGENTID,
    url: location.href.indexOf('#') >= 0 ? location.href.split('#')[0] : location.href
  })
  try {
    window.wx.agentConfig({
      corpid: localStorage.getItem('appid') || process.env.APPID,
      agentid: localStorage.getItem('agentId') || process.env.AGENTID,
      timestamp: result2.data.timestamp,
      nonceStr: result2.data.nonceStr,
      signature: result2.data.signature,
      jsApiList: [
        'agentConfig',
        'invoke',
        'openEnterpriseChat',
        'sendChatMessage',
        'shareToExternalContact',
        'shareToExternalChat',
        'getCurExternalContact',
        'selectExternalContact',
        'shareAppMessage',
        'shareWechatMessage',
        'onMenuShareWechat',
        'onMenuShareAppMessage',
        'onMenuShareTimeline',
        'hideOptionMenu',
        'showOptionMenu'
      ], // 必填
      success: () => { // 成功回调
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
}

;(function () {
  loadSdk()
})()

const qyAgent = {
  /**
   * 聊天附件栏分享消息到当前会话(本方法目前测试过的类型：text、news、miniprogram类型)
   * @param type String 必填项 文本:text, 图片:image,视频:video,文件:file, H5:news, 小程序：miniprogram
   * @param message Object 必填项 发送的消息对象
   *            type='text'时
   *              {
   *                 content:"", //文本内容
   *              }
   *            type='image'、'video'、'file'时
   *              {
   *                 mediaid:"", //素材id
   *              }
   *            type='news'时
   *              {
   *                link: "", //H5消息页面url 必填
   *                title: "", //H5消息标题
   *                desc: "", //H5消息摘要
   *                imgUrl: "", //H5消息封面图片URL
   *              }
   *            type='miniprogram'时
   *              {
   *                appid: "",//小程序的appid
   *                title: "", //小程序消息的title
   *                imgUrl:"",//小程序消息的封面图。必须带http或者https协议头，否则报错 $apiName$:fail invalid imgUrl
   *                page:"/index/page.html", //小程序消息打开后的路径，注意要以.html作为后缀，否则在微信端打开会提示找不到页面
   *              }
   * @param callback 可填项 分享成功时的回调函数
   * @returns 无
   */
  sendChatMessage (type, message, callback) {
    let param = {
      msgtype: type
    }
    switch (type) {
      case 'text':
        param[type] = {
          content: message.content // 文本内容
        }
        break
      case 'image':
      case 'video':
      case 'file':
        param[type] = {
          mediaid: message.mediaid // 素材id
        }
        break
      case 'news':
        param[type] = {
          link: message.link, // H5消息页面url 必填
          title: message.title, // H5消息标题
          desc: message.desc, // H5消息摘要
          imgUrl: message.imgUrl // H5消息封面图片url
        }
        break
      case 'miniprogram':
        param[type] = {
          appid: message.appid, // 小程序的appid
          title: message.title, // 小程序消息的title
          imgUrl: message.imgUrl, // 小程序消息的封面图。必须带http或者https协议头，否则报错 $apiName$:fail invalid imgUrl
          page: message.page // 小程序消息打开后的路径，注意要以.html作为后缀，否则在微信端打开会提示找不到页面
        }
        break
      default:
        alert('发送数据有误！')
        return
    }
    window.wx.invoke('sendChatMessage', param, function (res) {
      if (res.err_msg === 'sendChatMessage:ok') {
        if (callback) callback()
      } else {
        alert('sendChatMessage发送消息失败！')
      }
    })
  },

  /**
   * 打开会话
   * @param params Object 必填项 参数对象
   * // 注意：userIds和externalUserIds至少选填一个，且userIds+externalUserIds总数不能超过2000。
   * {
   *    userIds, // 参与会话的企业成员列表，格式为userid1;userid2;...，用分号隔开。
   *    externalUserIds, // 参与会话的外部联系人列表，格式为userId1;userId2;…，用分号隔开。
   *    groupName, // 必填，会话名称。单聊时该参数传入空字符串""即可。
   *    chatId // 若要打开已有会话，需指定此参数。如果是新建会话，chatId必须为空串
   * }
   * @param callback 可填项 成功后回调函数
   * @returns 无
   */
  openEnterpriseChat (params, callback) {
    window.wx.openEnterpriseChat({
      userIds: params.userIds || '',
      externalUserIds: params.externalUserIds || '',
      groupName: params.groupName || '',
      chatId: params.chatId || '',
      success: function (res) {
        if (res.errMsg === 'openEnterpriseChat:ok') {
          if (callback) callback()
        }
      },
      fail: function (res) {
        if (res.errMsg.indexOf('function not exist') > -1) {
          alert('版本过低请升级')
        }
      }
    })
  },

  /**
   * 群发消息给客户
   * @param content String 必填项 文本内容 不想传内容时要传空字符或null或undefined
   * @param attachments Array 必填项 附件信息 最多支持传入9个
   * @param callback 可填项 成功后回调函数
   * @returns 无
   * 备注：attachments: [
   *        {
   *          msgtype: "image",    // 消息类型，必填
   *          image: {
   *            mediaid: "",      // 图片的素材id
   *            imgUrl: "",        // 图片的imgUrl,跟图片mediaid填其中一个即可
   *          },
   *        },
   *        {
   *          msgtype: "link",    // 消息类型，必填
   *          link: {
   *            title: "",        // H5消息标题
   *            imgUrl: "",    // H5消息封面图片URL
   *            desc: "",    // H5消息摘要
   *            url: "",        // H5消息页面url 必填
   *          },
   *        },
   *        {
   *          msgtype: "miniprogram",    // 消息类型，必填
   *          miniprogram: {
   *            appid: "",    // 小程序的appid
   *            title: "",        // 小程序消息的title
   *            imgUrl : "",    //小程序消息的封面图。必须带http或者https协议头
   *            page: "",        //小程序消息打开后的路径，注意要以.html作为后缀，否则在微信端打开会提示找不到页面
   *          },
   *        },
   *        {
   *          msgtype: "video",    // 消息类型，必填
   *          video:{
   *            mediaid:"",        // 视频的素材id
   *          },
   *        },
   *      ]
   */
  shareToExternalContact (content, attachments, callback) {
    if (!content) content = ''
    window.wx.invoke('shareToExternalContact', {
      text: {
        content: content // 文本内容
      },
      attachments: attachments // 附件
    }, function (res) {
      if (res.err_msg === 'shareToExternalContact:ok') {
        if (callback) callback()
      }
    })
  },

  /**
   * 群发消息到客户群
   * @param content String 必填项 文本内容
   * @param attachments Array 必填项 附件信息 最多支持传入9个
   * @param callback 可填 成功后回调函数
   * @returns 无
   * 备注：attachments: [
   *        {
   *          msgtype: "image",    // 消息类型，必填
   *          image: {
   *            mediaid: "",      // 图片的素材id
   *            imgUrl: "",        // 图片的imgUrl,跟图片mediaid填其中一个即可
   *          },
   *        },
   *        {
   *          msgtype: "link",    // 消息类型，必填
   *          link: {
   *            title: "",        // H5消息标题
   *            imgUrl: "",    // H5消息封面图片URL
   *            desc: "",    // H5消息摘要
   *            url: "",        // H5消息页面url 必填
   *          },
   *        },
   *        {
   *          msgtype: "miniprogram",    // 消息类型，必填
   *          miniprogram: {
   *            appid: "",    // 小程序的appid
   *            title: "",        // 小程序消息的title
   *            imgUrl : "",    //小程序消息的封面图。必须带http或者https协议头
   *            page: "",        //小程序消息打开后的路径，注意要以.html作为后缀，否则在微信端打开会提示找不到页面
   *          },
   *        },
   *        {
   *          msgtype: "video",    // 消息类型，必填
   *          video:{
   *            mediaid:"",        // 视频的素材id
   *          },
   *        },
   *      ]
   */
  shareToExternalChat (content, attachments, callback) {
    if (!content) content = ''
    window.wx.invoke('shareToExternalChat', {
      text: {
        content: content // 文本内容
      },
      attachments: attachments // 附件
    }, function (res) {
      if (res.err_msg === 'shareToExternalChat:ok') {
        if (callback) callback()
      }
    })
  },

  /**
   * 获取当前外部联系人userId
   * @param callback 成功后的回调函数 返回userId，失败值为null
   */
  getCurExternalContact (callback) {
    window.wx.invoke('getCurExternalContact', {}, function (res) {
      if (res.err_msg === 'getCurExternalContact:ok') {
        if (callback) callback(res.userId) // 返回当前外部联系人userId
      } else {
        if (callback) callback(null) // 失败
      }
    })
  },

  /**
   * 外部联系人选人接口
   * 调用此接口将唤起该成员里所有的外部联系人列表，获取员工选择的外部联系人的userid
   * @param filterType number 可填 0表示展示全部外部联系人列表，1表示仅展示未曾选择过的外部联系人。默认值为0；除了0与1，其他值非法。
   * @param callback 成功回调 返回userIds,是数组, 失败值为null
   */
  selectExternalContact (filterType = 0, callback) {
    window.wx.invoke('selectExternalContact', {
      'filterType': filterType // 0表示展示全部外部联系人列表，1表示仅展示未曾选择过的外部联系人。默认值为0；除了0与1，其他值非法。在企业微信2.4.22及以后版本支持该参数
    }, function (res) {
      if (res.err_msg === 'selectExternalContact:ok') {
        if (callback) callback(res.userIds) // 返回此次选择的外部联系人userId列表，数组类型
      } else {
        if (callback) callback(null) // 失败
      }
    })
  },

  /**
   * 自定义转发到会话
   * @param params Object 必填
   *  {
   *    title: '', // 分享标题
   *    desc: '', // 分享描述
   *    link: '', // 分享链接
   *    imgUrl: '' // 分享封面
   *  }
   * @param callback 成功后回调函数
   */
  shareAppMessage (params, callback) {
    window.wx.invoke(
      'shareAppMessage', {
        title: params.title, // 分享标题
        desc: params.desc, // 分享描述
        link: params.link, // 分享链接
        imgUrl: params.imgUrl // 分享封面
      }, function (res) {
        if (res.err_msg === 'shareAppMessage:ok') {
          if (callback) callback()
        }
      }
    )
  },

  /**
   * 自定义转发到微信
   * @param params Object 必填
   *  {
   *    title: '', // 分享标题
   *    desc: '', // 分享描述
   *    link: '', // 分享链接
   *    imgUrl: '' // 分享封面
   *  }
   * @param callback 成功后回调函数
   */
  shareWechatMessage (params, callback) {
    window.wx.invoke(
      'shareWechatMessage', {
        title: params.title, // 分享标题
        desc: params.desc, // 分享描述
        link: params.link, // 分享链接
        imgUrl: params.imgUrl // 分享封面
      }, function (res) {
        if (res.err_msg === 'shareWechatMessage:ok') {
          if (callback) callback()
        }
      }
    )
  },

  /**
   * 获取"微信"按钮点击状态及自定义分享内容接口
   * @param params Object 必填
   *  {
   *    title: '', // 分享标题
   *    desc: '', // 分享描述
   *    link: '', // 分享链接
   *    imgUrl: '' // 分享封面
   *  }
   * @param callback 成功回调函数
   */
  onMenuShareWechat (params, callback) {
    window.wx.onMenuShareWechat({
      title: params.title, // 分享标题
      desc: params.desc, // 分享描述
      link: params.link, // 分享链接
      imgUrl: params.imgUrl, // 分享图标
      success: function () {
        // 用户确认分享后执行的回调函数
        if (callback) callback()
      },
      cancel: function () {
      }
    })
  },

  /**
   * 获取"转发"按钮点击状态及自定义分享内容接口(微信即将废弃)
   * @param params Object 必填
   *  {
   *    title: '', // 分享标题
   *    desc: '', // 分享描述
   *    link: '', // 分享链接，在微信上分享时，该链接的域名必须与企业某个应用的可信域名一致
   *    imgUrl: '' // 分享封面
   *  }
   * @param callback 成功回调函数
   */
  onMenuShareAppMessage (params, callback) {
    window.wx.onMenuShareAppMessage({
      title: params.title, // 分享标题
      desc: params.desc, // 分享描述
      link: params.link, // 分享链接；在微信上分享时，该链接的域名必须与企业某个应用的可信域名一致
      imgUrl: params.imgUrl, // 分享图标
      success: function (res) {
        // 用户确认分享后执行的回调函数
        if (callback) callback()
      },
      fail: function () {
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
      }
    })
  },

  /**
   * 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口(微信即将废弃)
   * @param params Object 必填
   *  {
   *    title: '', // 分享标题
   *    desc: '', // 分享描述
   *    link: '', // 分享链接
   *    imgUrl: '' // 分享封面
   *  }
   * @param callback 成功回调函数
   */
  onMenuShareTimeline (params, callback) {
    window.wx.onMenuShareTimeline({
      title: params.title, // 分享标题
      link: params.link, // 分享链接；在微信上分享时，该链接的域名必须与企业某个应用的可信域名一致
      imgUrl: params.imgUrl, // 分享图标
      success: function (res) {
        // 用户确认分享后执行的回调函数
        if (callback) callback()
      },
      fail: function () {
        // console.log('onMenuShareTimeline fail')
      },
      cancel: function () {
        // console.log('onMenuShareTimeline cancel')
      }
    })
  },

  /**
   * 分享给微信朋友(微信新)
   * @param params Object 必填
   *  {
   *    title: '', // 分享标题
   *    desc: '', // 分享描述
   *    link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
   *    imgUrl: '' // 分享封面
   *  }
   * @param callback 成功回调函数
   */
  // updateAppMessageShareData (params, callback) {
  //   console.log('分享给朋友(新)2')
  //   try {
  //     // window.wx.ready(function () { // 需在用户可能点击分享按钮前就先调用
  //     window.wx.updateAppMessageShareData({
  //       title: params.title, // 分享标题
  //       desc: params.desc, // 分享描述
  //       link: params.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
  //       imgUrl: params.imgUrl, // 分享图标
  //       success: function (res) {
  //         // 设置成功
  //         console.log('updateAppMessageShareData success', res)
  //         if (callback) callback()
  //       },
  //       fail: function (res) {
  //         console.log('updateAppMessageShareData fail', res)
  //         // const errorObj = { msg: 'fail', code: '00000' }
  //         // throw errorObj
  //         if (res.errMsg.indexOf('permission denied') > -1) {
  //           // alert('版本过低请升级')
  //           console.log('1---')
  //           qyAgent.onMenuShareAppMessage(params)
  //         }
  //       },
  //       cancel: function () {
  //         console.log('updateAppMessageShareData cancel')
  //         alert('updateAppMessageShareData cancel')
  //       }
  //     })
  //     // })
  //   } catch (err) {
  //     console.log('新朋友异常捕获', err)
  //     qyAgent.onMenuShareAppMessage(params)
  //   }
  // },

  /**
   * 分享给微信朋友圈(微信新)
   * @param params Object 必填
   *  {
   *    title: '', // 分享标题
   *    desc: '', // 分享描述
   *    link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
   *    imgUrl: '' // 分享封面
   *  }
   * @param callback 成功回调函数
   */
  // updateTimelineShareData (params, callback) {
  //   console.log('分享到朋友圈(新)2')
  //   try {
  //     // window.wx.ready(function () { // 需在用户可能点击分享按钮前就先调用
  //     window.wx.updateTimelineShareData({
  //       title: params.title, // 分享标题
  //       link: params.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
  //       imgUrl: params.imgUrl, // 分享图标
  //       success: function (res) {
  //         // 设置成功
  //         console.log('updateTimelineShareData success', res)
  //         if (callback) callback()
  //       },
  //       fail: function (res) {
  //         console.log('updateTimelineShareData fail', res)
  //         if (res.errMsg.indexOf('function not exist') > -1) {
  //           // alert('版本过低请升级')
  //           console.log('2---')
  //           qyAgent.onMenuShareTimeline(params, callback)
  //         }
  //       },
  //       cancel: function () {
  //         console.log('updateTimelineShareData cancel')
  //       }
  //     })
  //     // })
  //   } catch (err) {
  //     console.log('新朋友圈捕获异常', err)
  //     qyAgent.onMenuShareTimeline(params)
  //   }
  // }

  /**
   * 隐藏右上角菜单接口
   */
  hideOptionMenu () {
    window.wx.hideOptionMenu()
  },

  /**
   * 显示右上角菜单接口
   */
  showOptionMenu () {
    window.wx.showOptionMenu()
  }
}

export default qyAgent
