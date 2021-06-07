/*
  @Author:qianlihua
  @Date:2018-11-02
  @Desc: toast组件
  // 使用方式
  import Toast from 'comp/Toast'
  方式一：
    Toast(msg) // msg为要展示的内容，目前仅支持字符串
  方式二：
    Toast({
      message: msg, // msg为要展示的内容，目前仅支持字符串
      duration: 2000, // 展示持续时间，默认2秒
    })
*/
import Vue from 'vue'
import Toast from './Toast'

const ToastConstructor = Vue.extend(Toast)
export default (options = {}) => {
  const bbb = document.createElement('div')
  document.body.appendChild(bbb)
  var instance = new ToastConstructor().$mount(bbb)
  let duration = options.duration || 2000
  instance.message = typeof options === 'string' ? options : options.message
  instance.visible = true
  Vue.nextTick(() => {
    instance.timer = setTimeout(() => {
      instance.visible = false
      document.body.removeChild(instance.$el)
    }, duration)
  })
}
