const routes = [
  {
    path: '/',
    meta: { title: 'test' },
    component: resolve => require(['./pages/index.vue'], resolve)
    // redirect: '/index',
    // children: [
    //   {
    //     path: 'index',
    //     meta: { title: 'test' },
    //     component: resolve => require(['./pages/testwx.vue'], resolve)
    //   }
    // ]
  },
  {
    path: '/testwx',
    meta: { title: 'test' },
    component: resolve => require(['./pages/testwx.vue'], resolve)
  }
]
export default routes
