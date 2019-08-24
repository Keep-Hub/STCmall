<template>
    <div class="coinmall">
        <x-header :left-options="{backText: ''}" class="x-header_fixed">粽币商城</x-header>
        <div class="coinmall_title" >
            <div class="coinmall_nav_swiper">
                <swiper
                        :list="demo01_list"
                        v-model="demo01_index"
                        @on-index-change="demo01_onIndexChange"
                        auto
                        loop
                        :aspect-ratio="600/1380"
                        :interval="5000"
                        dots-position="center"
                        class="bd_radius"
                ></swiper>
                <router-link to="/mycoin">
                    <div class="my_coin clear_fix">
                        <span><img src="../../assets/demo/zblogo.png" alt="">我的粽币: &nbsp;<span v-text="userInfo.zbCoin"></span>个</span>
                    </div>
                </router-link>
            </div>
        </div>
        <div class="card_ticket">
            <div class="card_ticket_title">
                <ul class="clear_fix">
                    <li style="float: left">卡券兑换</li>
                    <li style="float: right">
                        <span @click="goodsList(1)">全部卡券</span>
                        <span>
                            <img src="../../assets/demo/coinmall/arrow.png" alt="">
                        </span>
                    </li>
                </ul>
            </div>
            <div class="card_ticket_info">
                <flexbox :gutter="0" wrap="wrap">
                    <flexbox-item :span="1/3" v-for="(c, index) in coupon.slice(0, 6)" :key="index">
                        <div class="flex-demo" @click="cardDetailed(c.id)">
                            <img :src="c.coupon_img" alt="">
                            <div class="padding10">
                                <p>{{c.coupon_title}}</p>
                                <span>{{c.coupon_price}}粽币</span>
                            </div>
                        </div>
                    </flexbox-item>
                </flexbox>
            </div>
        </div>
        <div class="commodity">
            <div class="card_ticket_title">
                <ul>
                    <li style="float: left">商品兑换</li>
                    <li style="float: right">
                        <span  @click="goodsList(2)">全部商品</span>
                        <span>
                            <img src="../../assets/demo/coinmall/arrow.png" alt="">
                        </span>
                    </li>
                </ul>
            </div>
            <div class="card_ticket_info">
                <flexbox :gutter="0" wrap="wrap">
                    <flexbox-item :span="1/3" v-for="(g, index) in goods.slice(0, 9)" :key="index">
                        <div class="flex-demo" @click="goodsDetailed(g.id)">
                            <img :src="g.goods_img" alt="">
                            <div class="padding10">
                                <p>{{g.goods_title}}</p>
                                <span>{{g.goods_price}}粽币</span>
                            </div>
                        </div>
                    </flexbox-item>
                </flexbox>
            </div>
        </div>
        <divider style="font-size: 0.72rem!important; color: #b6babd">已经到底</divider>
    </div>
</template>

<script>
import { XHeader, Swiper, Flexbox, FlexboxItem, LoadMore, Divider } from 'vux'
const bList = [
  require('../../assets/demo/mallbanner1.jpg'),
  require('../../assets/demo/mallbanner2.jpg'),
  require('../../assets/demo/mallbanner3.png')
]
const baseList = bList.map((item, index) => ({
  url: '#',
  img: item
}))
export default {
  name: 'coinmall',
  components: {
    XHeader,
    Swiper,
    Flexbox,
    FlexboxItem,
    LoadMore,
    Divider
  },
  data () {
    return {
      demo01_list: baseList,
      demo01_index: 0,
      userInfo: [],
      coupon: [],
      goods: []
    }
  },
  mounted () {
    this.init()
    this.$http.get('../../static/goodsList.json').then(response => {
      this.coupon = response.data.result.coupon
      this.goods = response.data.result.goods
    })
  },
  watch: {
    '$route' (to, from) { // 监听路由是否变化
      this.init()
    }
  },
  methods: {
    demo01_onIndexChange (index) {
      this.demo01_index = index
    },
    onClick (i) {
      console.log(i)
    },
    goodsList (i) {
      if (i === 1) {
        this.$router.push({
          path: '/goodsList',
          query: {
            id: i
          }})
      } else if (i === 2) {
        this.$router.push({
          path: '/goodsList',
          query: {
            id: i
          }})
      }
    },
    init () {
      let getinfo = sessionStorage.getItem('userInfo')
      this.userInfo = JSON.parse(getinfo)
    },
    cardDetailed (id) {
      this.$router.push({
        path: '/commodity',
        query: {
          id: id - 1,
          imgs: this.coupon[id - 1].coupon_img,
          price: this.coupon[id - 1].coupon_price,
          title: this.coupon[id - 1].coupon_title
        }})
    },
    goodsDetailed (id) {
      this.$router.push({
        path: '/commodity',
        query: {
          id: id - 1,
          imgs: this.goods[id - 1].goods_img,
          price: this.goods[id - 1].goods_price,
          title: this.goods[id - 1].goods_title
        }})
    }
  }
}
</script>

<style scoped>
    .clear_fix{
        clear:both;
        overflow: hidden;
    }
    .coinmall{
        position: absolute;
        background-color: #f5f5f5;
        z-index: 1001;
        min-height: 29rem;
    }
    .x-header_fixed{
        background-color:#fff;
        width: 100%;
        position: fixed;
        z-index: 999;
    }
    .coinmall_nav_swiper{
        padding: 0 3%;
        margin-top: 46px;
    }
    .bd_radius{
        border-radius: 0.3rem!important;
    }
    .coinmall_title{
        background-color: white;
        padding-bottom: 0.01rem;
    }
    .my_coin{
        width: 60%;
        display: flex;
        margin: 0.48rem auto;
        height: 1.6rem;
        border: 0.05rem solid #e3b87b;
        line-height: 1.6rem;
        border-radius: 1.6rem;
        position: relative;
    }
    .my_coin img{
        width: 0.86rem;
        height: 0.86rem;
        float: left;
        padding: 0.38rem 0;
        margin-right: 0.26rem;
    }
    .my_coin > span{
        font-size: 0.72rem;
        color: #e3b87b;
        margin: 0 auto;
    }
    .card_ticket,.commodity{
        width: 94%;
        background-color: white;
        padding: 0.78rem 3%;
        margin: 0.48rem auto;
    }
    .card_ticket_title{
        height: 1.2rem;
    }
    .card_ticket_title> ul>li {
        list-style: none;
        font-size: 0.86rem;
        color: #2e353d;
        font-weight: bold;
    }
    .card_ticket_title> ul>li>span {
        font-size: 0.72rem;
        color: #8e9399;
        font-weight: normal;
    }
    .card_ticket_title> ul>li>span>img {
        width: 0.28rem;
        height: 0.58rem;
    }
    .flex-demo{
        margin: 0.48rem 0.18rem 0.18rem 0.18rem;
        border: 1px solid #f3f3f3;
    }
    .flex-demo p {
        color: #2e353d;
        font-size: 0.62rem;
        text-align: center;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .flex-demo img {
        width: 100%;
        height: 100%;
        background-color: white;
    }
    .flex-demo span {
        color: #e3b87b;
        font-size: 0.58rem;
    }
    .padding10{
        padding:0 0 0.28rem 0;
        text-align: center;
    }
</style>
