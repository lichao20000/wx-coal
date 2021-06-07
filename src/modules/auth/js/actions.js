import axios from 'comp/js/axios'
const hostname = window.location.hostname
const prefix = hostname === 'localhost' ? '1' : ''
const API_URL = {
  GET_USER_INFO: `${process.env.API_ROOT}${prefix}/user/findInfoForAction.json`
}

/**
 * 查询商品分类
 * @method GET
 */
export const getUserInfo = async () => {
  let ret = ''
  await axios(API_URL.GET_USER_INFO, {
    method: 'GET'
  }).then((data) => {
    ret = data
  }).catch(() => {
    ret = {}
  })
  return ret
}
