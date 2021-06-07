// 页面埋点js
import axios from './axios'
const buriedPointUrl = `${process.env.API_ROOT}/userAction/actionCollect.json`
const executeDailyTaskUrl = `${process.env.API_ROOT}/partnerPoint/task/toExecuteDailyTask.json`

/**
 * 页面埋点js
 * @method GET
 */
export const userActionCollect = async params => {
  params.ip = window.returnCitySN.cip // window.returnCitySN.cip 是通过index.html引用的搜狐的js去获取
  await axios(buriedPointUrl, {
    method: 'GET',
    params: params
  })
}
/**
 *  获取页面传参
 */
export const getUrlSearch = (type = 'search') => {
  const url = type === 'hash' ? location.hash : location.search
  const restData = {}
  if (url.indexOf('?') !== -1) {
    let str = url.split('?')
    let strs = str[1].split('&')
    for (let i = 0; i < strs.length; i++) {
      restData[strs[i].split('=')[0]] = (strs[i].split('=')[1])
    }
  }else{
    let str = url.replace("&","?").split('?');
    let strs = str[1].split('&')
    for (let i = 0; i < strs.length; i++) {
      restData[strs[i].split('=')[0]] = (strs[i].split('=')[1])
    }
  }
  return restData
}

export const executeDailyTask = async params => {
  await axios(executeDailyTaskUrl, {
    method: 'GET',
    params: params,
    autoToast: false
  })
}
