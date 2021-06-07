/*
* @Author: liurihui
* @Date: 20160708
* @module: loading
* @desc: dom节点注册在根节点，对外提供命令式调用
*/

import Vue from 'vue'
import LoadingTemplate from './loading.vue'

const Loading = Vue.extend(LoadingTemplate)
// 只能单例
let instance

const getAnInstance = () => {
  if (!instance) {
    instance = new Loading({
      el: document.createElement('div')
    })
  }
}

export default {
  show () {
    getAnInstance()

    Vue.nextTick(() => {
      if (instance) {
        instance.$mount()
        document.body.appendChild(instance.$el)
      }
    })
  },
  hide () {
    instance && instance.$el.parentNode.removeChild(instance.$el)
    instance = null
  }
}
