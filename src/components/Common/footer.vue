<template>
    <div class="fex">
        <tabbar @on-index-change="onIndexChange" class="fixed">
            <tabbar-item  :selected = "$route.path ==='/'" link = '/'>
                <img slot="icon" src="../../assets/demo/home_2x.png">
                <img slot="icon-active" src="../../assets/demo/home_active_2x.png">
                <span slot="label">首页</span>
            </tabbar-item>
            <tabbar-item :selected = "$route.path ==='/product'"  link = '/product'>
                <img slot="icon" src="../../assets/demo/product_2x.png">
                <img slot="icon-active" src="../../assets/demo/product_active_2x.png">
                <span slot="label">产品</span>
            </tabbar-item>
            <tabbar-item :selected = "$route.path ==='/find'" link = '/find'>
                <img slot="icon" src="../../assets/demo/find_2x.png">
                <img slot="icon-active" src="../../assets/demo/find_active_2x.png">
                <span slot="label">发现</span>
            </tabbar-item>
            <tabbar-item :selected = "$route.path ==='/me'" link = '/me'>
                <img slot="icon" src="../../assets/demo/mine_2x.png">
                <img slot="icon-active" src="../../assets/demo/mine_active_2x.png">
                <span slot="label">我的</span>
            </tabbar-item>
        </tabbar>
    </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'
export default {
  name: 'foote',
  components: {
    Tabbar,
    TabbarItem
  },
  methods: {
    onIndexChange (newIndex, oldIndex) {
      // console.log(newIndex, oldIndex)
    }
  }
}
</script>

<style scoped>
    .fex{
        position: absolute;
        bottom: 0;
        left: 0;
        background-color: #ffffff;
        z-index: 1000;
    }
    .fixed{
        position: fixed;
        background-color: white;
        bottom: 0;
    }
    a{
        text-decoration: none;
    }
</style>
