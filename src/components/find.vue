<template>
    <div class="find">
        <x-header :left-options="{backText: ''}" class="x-header_fixed" >发现</x-header>
        <div class="find_body">
            <div class="zb_store">
                <div class="zb_store_commodity">
                    <flexbox>
                        <flexbox-item><div class="flex-demo"><img src="../assets/demo/chuifengji.png" alt=""><div class="padding10"><p>5%加息券</p><span>200粽币</span></div></div></flexbox-item>
                        <flexbox-item><div class="flex-demo"><img src="../assets/demo/xifashui.png" alt=""><div class="padding10"><p>10%加息券</p><span>350粽币</span></div></div></flexbox-item>
                        <flexbox-item><div class="flex-demo"><img src="../assets/demo/xijiejing.png" alt=""><div class="padding10"><p>8%加息券</p><span>300粽币</span></div></div></flexbox-item>
                    </flexbox>
                </div>
                <router-link to="/coinmall"><p class="more_commodities">更多商品 ></p></router-link>
            </div>
            <div class="visual_data" >
                <p>VISUAL_DATA</p>
            </div>
            <div>
                <div class="visual_data_title">
                    <div>
                        <span class="en">Distribution of investment users</span>
                        <span class="ch">投资用户分布情况</span>
                    </div>
                </div>
                <div>
                    <v-chart
                            ref="demo"
                            style="background-color: #f5f5f5"
                            :data="data">
                        <v-bar />
                        <v-tooltip :show-item-marker="false" />
                    </v-chart>

                    <x-button type="default" plain @click.native="$refs.demo.rerender()">重新加载数据</x-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {XHeader, Flexbox, FlexboxItem, XButton, VChart, VLine, VArea, VBar, VPie, VPoint, VScale, VAxis, VGuide, VTooltip, VLegend} from 'vux'
export default {
  name: 'find',
  data () {
    return {
      isFixed: false,
      data: [
        { province: '广东', count: 100 },
        { province: '浙江', count: 61 },
        { province: '江苏', count: 52 },
        { province: '上海', count: 45 },
        { province: '北京', count: 42 },
        { province: '山东', count: 38 },
        { province: '湖北', count: 35 },
        { province: '河北', count: 31 }
      ]
    }
  },
  components: {
    XHeader,
    Flexbox,
    FlexboxItem,
    XButton,
    VChart,
    VLine,
    VArea,
    VBar,
    VPie,
    VPoint,
    VScale,
    VAxis,
    VGuide,
    VTooltip,
    VLegend
  },
  mounted () {
    // window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    tabClick (index) {
      this.activeIndex = index
    }
  }
}
</script>

<style scoped>
    .find{
        width: 100%;
        height: 100%;
        background-color: #f5f5f5;
        position: absolute;
        z-index: 1000;
    }
    .x-header_fixed{
        background-color:#fff;
        width: 100%;
        position: fixed;
        z-index: 999
    }
    .find_body{
        position: relative;
        top: 45px;
        width: 100%;
    }
    .zb_store{
        width: 100%;
        background: url("../assets/demo/zb_store.png")  no-repeat;
        background-position:50% 0.56rem;
        background-size: 7.9rem 1.39rem;
        background-color: #eaeffa;
        padding: 2.5rem 0 0 0;
    }
    .zb_store_commodity{
        padding: 0 0.72rem;
    }
    .flex-demo p {
        color: #2e353d;
        font-size: 0.72rem;
        text-align: center
    }
    .flex-demo img {
        width: 100%;
        height: 100%;
        background-color: white;
    }
    .flex-demo span {
        color: #e3b87b;
        font-size: 0.67rem;
    }
    .padding10{
        padding: 0.28rem 0;
        text-align: center;
    }
    .more_commodities{
        text-align: center;
        color: #a2b0cd;
        font-size: 0.72rem;
        padding: 0.83rem 0;
        margin-top: 0.56rem
    }
    .visual_data{
        width: 100%;
        background-color: white;
        border-bottom: 1px #f5f5f5 solid;
    }
    .visual_data p{
        text-align: center;
        padding: 0.76rem 0;
        font-size: 0.78rem;
        font-weight: bold;
        color: #686868;
    }
    .visual_data_title{
        position: relative;
        color: #2381f9;
        background-color: #f5f5f5;
        padding: 0 1rem;
    }
    .visual_data_title .en{
        font-size: 0.56rem;
        font-style: italic;
        font-weight: bold;
        color: #b5c9e4;
    }
    .visual_data_title .ch{
        position: relative;
        font-size: 0.78rem;
        display: block;
    }
</style>
