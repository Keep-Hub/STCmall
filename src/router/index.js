import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  // mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  },

  routes: [
    {
      path: '/',
      name: 'home',
      component: resolve => require(['@/components/home'], resolve),
      meta: { keepAlive: true, title: '合众e贷' }
    },
    {
      path: '/product',
      name: 'product',
      component: resolve => require(['@/components/product'], resolve),
      meta: { keepAlive: true, title: '产品' }
    }, {
      path: '/find',
      name: 'find',
      component: resolve => require(['@/components/find'], resolve),
      meta: { keepAlive: true, title: '发现' }
    }, {
      path: '/me',
      name: 'me',
      component: resolve => require(['@/components/me'], resolve),
      meta: { keepAlive: true, title: '我的', requireAuth: true }

    }, {
      path: '/test',
      name: 'test',
      component: resolve => require(['@/components/loadings'], resolve),
      meta: { keepAlive: true, title: '测试页' }

    }, {
      path: '/loadings',
      name: 'loadings',
      component: resolve => require(['@/components/loadings'], resolve),
      meta: { keepAlive: true }

    }, {
      path: '/coinmall',
      name: 'coinmall',
      component: resolve => require(['@/components/mall/coinmall'], resolve),
      meta: { keepAlive: true, title: '粽币商城', requireAuth: true }
    }, {
      path: '/mycoin',
      name: 'mycoin',
      component: resolve => require(['@/components/mall/mycoin'], resolve),
      meta: { keepAlive: true, title: '我的粽币', requireAuth: true }
    }, {
      path: '/exchange',
      name: 'exchange',
      component: resolve => require(['@/components/mall/exchange'], resolve),
      meta: { keepAlive: true, title: '', requireAuth: true }
    }, {
      path: '/commodity',
      name: 'commodity',
      component: resolve => require(['@/components/mall/commodity'], resolve),
      meta: { keepAlive: true, title: '商品详细', requireAuth: true }
    }, {
      path: '/goodsList',
      name: 'goodsList',
      component: resolve => require(['@/components/mall/goodsList'], resolve),
      meta: { keepAlive: true, title: '商品列表', requireAuth: true }
    }, {
      path: '/addAddress',
      name: 'addAddress',
      component: resolve => require(['@/components/mall/addAddress'], resolve),
      meta: { keepAlive: true, title: '添加收货地址', requireAuth: true }
    }, {
      path: '/reviseAddress',
      name: 'reviseAddress',
      component: resolve => require(['@/components/mall/reviseAddress'], resolve),
      meta: { keepAlive: true, title: '修改地址', requireAuth: true }
    }, {
      path: '/shoppingCart',
      name: 'shoppingCart',
      component: resolve => require(['@/components/mall/shoppingCart'], resolve),
      meta: { keepAlive: true, title: '购物车', requireAuth: true }
    }, {
      path: '/receivingAddress',
      name: 'receivingAddress',
      component: resolve => require(['@/components/mall/receivingAddress'], resolve),
      meta: { keepAlive: true, title: '我的收货地址', requireAuth: true }
    }, {
      path: '/orderDetails',
      name: 'orderDetails',
      component: resolve => require(['@/components/mall/orderDetails'], resolve),
      meta: { keepAlive: true, title: '订单详情', requireAuth: true }
    }, {
      path: '/setting',
      name: 'setting',
      component: resolve => require(['@/components/setting/setting'], resolve),
      meta: { keepAlive: true, title: '设置', requireAuth: true }
    }, {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/components/login'], resolve),
      meta: { keepAlive: true, title: '登录' }
    }, {
      path: '/register',
      name: 'register',
      component: resolve => require(['@/components/register'], resolve),
      meta: { keepAlive: true, title: '注册' }
    }, {
      path: '/changepwd',
      name: 'changepwd',
      component: resolve => require(['@/components/changepwd'], resolve),
      meta: { keepAlive: true, title: '修改密码' }
    }, {
      path: '/updatepwd',
      name: 'updatepwd',
      component: resolve => require(['@/components/updatepwd'], resolve),
      meta: { keepAlive: true, title: '修改密码' }
    }, {
      path: '/FixedNavigation',
      name: 'FixedNavigation',
      component: resolve => require(['@/components/FixedNavigation'], resolve),
      meta: { keepAlive: true }
    }
  ]
})
