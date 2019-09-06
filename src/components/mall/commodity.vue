<template>
    <div class="commodity">
        <div class="swiper_img">
            <img class="previewer-demo-img" v-for="(item, index) in list" :key="index" :src="item.src" width="100%" @click="show(index)">
            <div v-transfer-dom>
                <previewer :list="list" ref="previewer" :options="options" @on-index-change="logIndexChange"></previewer>
            </div>
            <div class="swiper_info">
                <p>{{this.title}}</p>
                <div><span class="price">{{this.price}}</span><span>&nbsp;粽币</span></div>
            </div>
        </div>
        <section class="cd_details">
            <flexbox>
                <flexbox-item :span="5"><div class="cd_details_title">商品详细</div></flexbox-item>
                <flexbox-item><div class="stock"><i></i><span>库存 : 5</span></div></flexbox-item>
                <flexbox-item><div class="sales_volume"><i></i><span>销量 : 0</span></div></flexbox-item>
            </flexbox>
        </section>
        <section class="cd_details_info">
            <p>
                1、兑换成功后，商品将在3个工作日内寄出；
            </p>
            <p>
                2、商品兑换成功后，除运输途中发生损坏、损毁或本身存在残次问题以外，恕不提供退换服务，请确认清楚自身需求及商品参数再兑换；
            </p>
            <p>
                3、商品图片仅供参考，具体情况以实物为准；
            </p>
            <p>
                4、如遇商品缺货，粽币将原路退回账户；
            </p>
            <p>
                5、如有任何疑问，可在商品兑换后的30天内，致电客服热线咨询：400-868-7888（09:00-21:00）；
            </p>
            <p>
                6、若兑换超过30天，且订单状态显示已发货，平台默认商品无质量问题，将无法再处理售后问题；
            </p>
            <p>
                7、一经兑换，不予退还粽币（商品缺货除外）。
            </p>
        </section>
        <section class="fixed_bottom">
            <router-link to="/mycoin">
                <div class="my_coin clear_fix">
                    <span> <img src="../../assets/demo/zblogo.png" alt="">我的粽币: &nbsp;{{userInfo.zbCoin}}个</span>
                </div>
            </router-link>
            <div class="redeem_now" @click="redeemNow">立即兑换</div>
        </section>
    </div>
</template>

<script>
import { XHeader, Swiper, Flexbox, FlexboxItem, Previewer, TransferDom } from 'vux'
export default {
  directives: {
    TransferDom
  },
  name: 'commodity',
  components: {
    XHeader,
    Swiper,
    Flexbox,
    FlexboxItem,
    Previewer
  },
  data () {
    return {
      userInfo: [],
      imgs: '',
      price: '',
      title: '',
      id: '',
      assets: '',
      list: [],
      options: {
        // 缩略图getThumbBoundsFn()
        getThumbBoundsFn (index) {
          // find thumbnail element
          let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
          // get window scroll Y
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          // optionally get horizontal scroll
          // get position of element relative to viewport
          let rect = thumbnail.getBoundingClientRect()
          // w = width
          return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
          // Good guide on how to get element coordinates:
          // http://javascript.info/tutorial/coordinates
        }
      }
    }
  },
  watch: {
    '$route' (to, from) { // 监听路由是否变化
      if (to.path !== from.path) {
        // console.log(to.query.id)
        this.routePath()
      }
    }
  },
  mounted () {
    this.init()
    this.routePath()
    let getinfo = sessionStorage.getItem('userInfo')
    this.assets = JSON.parse(getinfo).zbCoin
  },
  methods: {
    init () {
      let getinfo = sessionStorage.getItem('userInfo')
      this.userInfo = JSON.parse(getinfo)
    },
    redeemNow () {
      this.$router.push({
        path: '/shoppingCart',
        query: {
          id: this.$route.query.id,
          imgs: this.$route.query.imgs,
          price: this.$route.query.price,
          title: this.$route.query.title
        }})
    },
    logIndexChange (arg) {
      console.log(arg)
    },
    show (index) {
      this.$refs.previewer.show(index)
    },
    routePath () {
      this.activeIndex = +this.$route.query.id
      this.id = this.$route.query.id
      this.imgs = this.$route.query.imgs
      this.price = this.$route.query.price
      this.title = this.$route.query.title
      this.list = [{
        src: this.$route.query.imgs
      }]
    }
  }
}
</script>

<style scoped>
    .clear_fix{
        clear:both;
        overflow: hidden;
    }
    .commodity{
        position: absolute;
        background-color: #f5f5f5;
        z-index: 1005;
        width: 100%;
        height: 100%;
        min-height: 29rem;
    }
    .swiper_img{
        background-color: white;
    }
    .swiper_img img{
        position: relative;
        width: 100%;
    }
    .swiper_info{
        padding: 0.68rem;
    }
    .swiper_info > p{
        margin-bottom: .56rem;
        font-size: .68rem;
        color: #2e353d;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
    }
    .swiper_info > div {
        font-size: .72rem;
        color: #e3b87b;
    }
    .price{
        font-size: .86rem;
    }
    .cd_details{
        margin-top: 0.38rem;
        background-color: white;
        border-bottom: 1px solid #eee;
    }
    .cd_details_title{
        padding: .5rem 0 .64rem .5rem;
        font-size: .72rem;
        color: #2e353d;
    }
    .stock,.sales_volume{
        display: flex;
        align-items: center;
        font-size: .6rem;
        color: #8e9399;
    }
    .stock > i,.sales_volume >i{
        flex-shrink: 0;
        margin-right: .22rem;
        display: inline-block;
        width: .6rem;
        height: .6rem;
    }
    .stock > i{
        background: url("../../assets/demo/coinmall/stock.png");
        background-size: contain;
    }
    .sales_volume >i{
        background: url("../../assets/demo/coinmall/wares.png");
        background-size: contain;
    }
    .cd_details_info{
        background-color: white;
        padding: .82rem .64rem;
        font-size: .68rem;
        color: #2e353d;
        margin-bottom: 6rem;
    }
    .cd_details_info > p{
        margin: 0.28rem 0;
    }
    .fixed_bottom{
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 5.6rem;
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
    .redeem_now{
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 2.5rem;
        font-size: 0.86rem;
        background-color: #2381f7;
        text-align: center;
        color: white;
        line-height: 2.5rem;
    }
</style>
