import axios from 'axios'
import qs from 'qs'
import Toast from 'comp/Toast'
import Loading from 'comp/Loading'
// axios.defauls.baseURL = process.env.API_ROOT
axios.defaults.withCredentials = true // 允许跨域携带cookie
let pathname = ''
if (location.pathname.indexOf('spa-h5') !== -1) {
  pathname = location.pathname.replace(/\//g, '').replace('spa-h5', '')
} else if (location.pathname.indexOf('wep-h5') !== -1) {
  pathname = location.pathname.replace(/\//g, '').replace('wep-h5', '')
} else {
  pathname = location.pathname.replace(/\//g, '')
}
// 拦截器配置
axios.interceptors.request.use(
  config => {
    // 判断是否存在token，如果存在的话，则每个http header都加上token
    let token = ''
    token = localStorage.getItem(pathname + 'Token')
    if (!config.headers.hasOwnProperty('Authorization') && token) {
      config.headers.Authorization = token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 拦截器配置
axios.interceptors.response.use(response => {
  // 在这里你可以判断后台返回数据携带的请求码
  if (response.data.code === 401) {
    doLogin()
    return
  }
  return response.data
})
export default (url, params, config = '') => {
  // console.log('----------------', params)
  const { autoToast = true, method, timeout = 100000, contentType = ''} = params;
  const { autoToastPage = true } = params.params || params;
  let option = {}
  axios.defaults.timeout = timeout // 配置超时时间
  let [getData, postData, headers] = [null, null, null]
  if (method === 'POST') {
    // postData = qs.stringify(params.params)
    // postData = JSON.stringify(params.params)
    // console.log(postData)
    // console.log('test')
    // headers = contentType === '' ? {
    //   'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    // } : {
    //   'Content-Type': 'application/json;charset=UTF-8'
    // }
    if (contentType) {
      headers = {
        'Content-Type': 'application/json;charset=UTF-8'
      }
      postData = JSON.stringify(params.params)
    } else {
      headers = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
      postData = qs.stringify(params.params)
    }
  } else {
    getData = params.params
  }
  option = {
    method,
    url,
    params: getData,
    data: postData,
    headers: headers,
    withCredentials: true
  }
  return new Promise((resolve, reject) => {
    if (config === 'formdata') {
      axios.post(url, params.params, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        checkSuccessResult(res, resolve, reject)
      }, (req) => {
        checkFailResult(req, resolve, reject)
      })
    } else {
      axios(option).then(res => {
        // console.log('option.url', option.url,res)
        // fixme: 这里单独判断如果是群发接口 需要单独显示toast消息，
        //  因为axios的封装resole了res.data 取不到message的值
        if(option.url == '/wep-api/sendMsg/extContactSendMsg'){
          Toast(res.message)
        }
        checkSuccessResult(res, resolve, reject)
      }, (req) => {
        checkFailResult(req, resolve, reject)
      })
    }
  })
  function checkSuccessResult (res, resolve, reject) {
    // console.log(res)
    // console.log(autoToastPage)
    const status = res.code
    if (status === 200 || status === 0 || status === '0000') {
      autoToastPage ? resolve(res.data) : resolve(res)
    } else if (status === 401) {
      doLogin();
    } else if (status === 400) {
      autoToast ? Toast(res.msg || res.message || res.data.error || '网络超时，请重试') : reject(res)
    } else if ( status === 500) {
      autoToast && Toast(res.msg || res.message || res.data.error || '数据异常')
    } else if ( status === -1) {
      autoToast && Toast(res.msg || res.message || res.data.error || '数据异常')
    } else if (status === 408) {
      autoToast && Toast(res.msg || res.message || res.data.error || '网络超时，请重试')
    } else if (status >= 980 && status !== 9999 && status !== '9999') {
      if (status === 4001 || status === 4002) {
        reject(res.data)
        Toast(res.msg || res.data.error || '网络超时，请重试')
        return
      }
      // 跳转非合伙人页面
      // autoToast && Toast('您还不是合伙人，请联系管理员')
      setTimeout(() => {
        location.replace(`${location.origin}/spa-h5/denied/index.html`)
      }, 2000)
    } else {
      // reject(res.data)
      resolve(res)
      // console.log('result',res)
    }
  }
  function checkFailResult (req, resolve, reject) {
    if (req.response) {
      const { status } = req.response
      if (status === 401) {
        doLogin()
      } else if (status === 400) {
        autoToast && Toast('网络超时，请重试')
      } else if (status === 408) {
        autoToast && Toast('网络超时，请重试')
      } else if (status >= 980 && status !== 9999 && status !== '9999') {
        // 跳转非合伙人页面
        autoToast && Toast('您还不是合伙人，请联系管理员')
        setTimeout(() => {
          location.replace(`${location.origin}/spa-h5/denied/index.html`)
        }, 2000)
      } else {
        reject(req.data)
      }
    } else {
      setTimeout(() => {
        Loading.show()
      }, 1000)
      setTimeout(() => {
        Loading.hide()
        Toast('请求超时')
      }, 10000)
    }
  }
  function doLogin () {
    const jumpUrl = location.href
    const authUri = 'https://open.weixin.qq.com/connect/oauth2/authorize'
    const failedUrl = `${location.origin}/wep-h5/denied/index.html`
    const authCallbackUrl = `${location.origin}${process.env.API_ROOT}/wechat/zlAuthCallback.jhtml?redirectUrl=${encodeURIComponent(jumpUrl)}&failedUrl=${encodeURIComponent(failedUrl)}`
    const href = `${authUri}?appid=${process.env.APPID}&redirect_uri=${encodeURIComponent(authCallbackUrl)}&response_type=code&scope=snsapi_base&state=#wechat_redirect`
    location.replace(href)
  }
}
