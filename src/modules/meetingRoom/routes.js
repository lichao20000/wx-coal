const routes = [
  {
    path: '/',
    meta: { title: '会议室预定' },
    component: (resolve) => require(['./pages/list.vue'], resolve)
  },
  {
    path: '/detail',
    meta: { title: '会议室预定' },
    component: (resolve) => require(['./pages/detail.vue'], resolve)
  }
]
export default routes
