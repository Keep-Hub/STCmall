import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {//  要设置的全局访问的state对象
  listItemsOut: [],
  selectedGoods: [],
  zCoin: '',
  count: 0
  //  要设置的初始属性值
}
const mutations = {
  mutationsAddCount (state, n) {
    return (state.listItemsOut.unshift(n))
  },
  mutationsReduceCount (state, n) {
    return (state.listItemsOut.splice(0, 100))
  },
  mutationsSelectedGoods (state, n) {
    return (state.selectedGoods.unshift(n))
  },
  mutationsRemoveGoods (state, n) {
    return (state.selectedGoods.splice(0, 100))
  },
  mutationsRemovezCoin (state, n) {
    return (state.zCoin = '')
  },
  mutationszCoin (state, n) {
    return (state.zCoin = n)
  }
}
const getters = {}
const actions = {}
const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
export default store
