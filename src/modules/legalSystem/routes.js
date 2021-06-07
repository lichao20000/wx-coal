const routes = [
  {
    path: '/',
    meta: { title: '法务合同审批' },
    component: (resolve) => require(['./pages/index.vue'], resolve)
  },
  {
    path: '/detail',
    meta: { title: '法务合同审批2' },
    component: (resolve) => require(['./pages/detail.vue'], resolve)
  }
]
export default routes
