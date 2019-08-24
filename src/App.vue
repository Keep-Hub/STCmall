<template>
  <div id="app">
    <keep-alive >
      <router-view v-if="isRouterAlive"></router-view>
    </keep-alive>
    <v-footer v-if="footerShow"></v-footer>
    <v-menu v-if="menuShow"></v-menu>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, Group, Cell } from 'vux'
import inste from './components/footer'
import load from './components/loadings'
import menu from './components/FixedNavigation'
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      footerShow: false,
      menuShow: true,
      isRouterAlive: true
    }
  },
  components: {
    Tabbar,
    TabbarItem,
    Group,
    Cell,
    'v-footer': inste,
    'v-loading': load,
    'v-menu': menu
  },
  mounted () {
    this.footerShow = true
    this.menuShow = false
  },
  methods: {
    onIndexChange (newIndex, oldIndex) {
      // console.log(newIndex, oldIndex)
    },
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  },
  watch: {
    $route (to, from) {
      if (to.path === '/' || '/find' || '/me' || '/product') {
        this.footerShow = true
      } else {
        this.footerShow = false
      }
      if (this.$route.path === '/' || this.$route.path === '/find' || this.$route.path === '/product' || this.$route.path === '/me' || this.$route.path === '/shoppingCart') {
        this.menuShow = false
      } else {
        this.menuShow = true
      }
    }
  }
}
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
  a{
    text-decoration: none;
  }
  .vux-slider > .vux-swiper > .vux-swiper-item > a > .vux-swiper-desc {
    background-image: none!important;
    text-shadow: none!important;
  }
  .weui-cell:before {
    border-top: 0!important;
  }
  .weui-cells{
    background-color: #efefef!important;
  }
  .weui-uploader__bd.small .weui-uploader__input-box[data-v-f43ed352] {
    width: 3.04rem!important;
    height: 3.04rem!important;
    border-radius: 50%;
    z-index: 999!important;
  }
  .vux-label{
    margin-left: 1.22rem;
    font-size: 0.82rem;
  }
  .vux-header-title {
    color: #2e353d!important;
    font-weight: bold;
  }
  .xs-plugin-pullup-container {
    line-height: 1.68rem!important;
  }
  ::-webkit-input-placeholder {
    color: #999!important;
  }
  .vux-cell-value {
    color: #2e353d!important;
  }
  .vux-number-selector-plus {
    margin-right: 5px;
    padding: 3px 2px!important;
  }
  .vux-number-selector-sub {
    padding: 3px 3px!important;
  }
</style>
