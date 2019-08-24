// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import globalLoading from './javascript/loading'
import store from './vuex/store'
// import globalmethod from './globalMethod'//引入全局函数的文件
import Vuex from 'vuex'
import axios from 'axios'
import qs from 'qs'
import { LoadingPlugin } from 'vux'
Vue.use(LoadingPlugin)
Vue.use(Vuex)

Vue.prototype.$http = axios
Vue.config.productionTip = false
// 处理传递的参数
axios.interceptors.request.use(function (config) {
  if (config.method !== 'get') {
    config.data = qs.stringify(config.data)
  }
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  let token = window.sessionStorage.getItem('TOKEN')
  if (token) {
    config.headers.common['Authorization'] = 'Bearer ' + token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})
// 路由权限
router.beforeEach((to, from, next) => {
  globalLoading.show()
  if (to.meta.title) { // 页面跳转更改标题
    document.title = to.meta.title
  }
  if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限
    if (!sessionStorage.getItem('token') && !localStorage.getItem('token')) {
      next({
        path: '/login',
        query: {redirect: to.fullPath}//  将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    } else {
      next()
    }
  } else {
    next()
  }
})
router.afterEach(route => {
  setTimeout(function () {
    globalLoading.hide()
  }, 600)
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
