import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
let routes = [
]

/**
 * 扫描各个模块并自动注册
 */
const routerContext = require.context('./', true, /index\.js$/)
routerContext.keys().forEach(route => {
  // 忽略根目录index.js
  if (route.startsWith('./index')) {
    return
  }
  const routerModule = routerContext(route)
  /**
   * 兼容 import export 和 require module.export 两种规范
   */
  routes = [
    ...routes,
    ...(routerModule.default || routerModule)
  ]
})

export default new Router({
  mode: 'hash',
  routes: routes
})
