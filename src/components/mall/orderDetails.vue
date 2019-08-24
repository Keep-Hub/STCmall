<template>
    <div class="order_details">
        <x-header :left-options="{backText: ''}" class="x-header_fixed">订单详情</x-header>
        <div class="selected_address">
            <div class="selected_address_info" v-for="(g, index) in listItemsOut.slice(0, 1)" :key="index">
                <ul class="clear_fix">
                    <li style="float: left;">
                        <span>{{g[index].Addressee}}</span>
                        <span>{{g[index].Mobile}}</span>
                    </li>
                </ul>
                <p>{{g[index].regionAddress}}{{g[index].detailedAddress}}</p>
            </div>
            <div class="address_img">
            </div>
        </div>
        <div class="shopping_cart_goods">
            <p style="font-size: 0.88rem; color: #2e353d;">商品兑换</p>
            <ul>
                <li class="list_wrap clear_fix">
                    <div class="img_wrap">
                        <img :src="this.imgs" alt="">
                    </div>
                    <div class="desc_wrap">
                        <p class="desc_wrap_title">
                            {{this.title}}
                        </p>
                        <div class="clear_fix" style="width: 100%;margin-top: 0.18rem">
                            <p class="price"><span ref="unitPrice">{{this.price}}</span>粽币</p>
                            <span class="purchaseNumb">数量: {{this.purchaseNumb}}</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="order_info">
            <div style="font-size: 0.88rem; color: #2e353d;">订单信息</div>
            <timeline>
                <timeline-item>
                    <h4 class="recent">【广东】 广州市 已发出 <span style="color: #2381f9">物流详情</span></h4>
                    <p class="recent">2019-04-17 12:00:00</p>
                </timeline-item>
                <timeline-item>
                    <h4> 顺丰快递员 广东广州 收件员 陈橙橙 已揽件</h4>
                    <p>2019-04-16 10:23:00</p>
                </timeline-item>
                <timeline-item>
                    <h4> 商家正在通知快递公司揽件</h4>
                    <p>2019-04-15 9:00:00</p>
                </timeline-item>
            </timeline>
        </div>
        <section class="fixed_bottom">
            <div class="clear_fix">
                <div class="totalPrice">
                    <span>{{this.totalPrice}}</span>
                    <span>粽币</span>
                </div>
                <div class="confirm clear_fix">
                    <span style="border-right: 1px solid #4493f9;">联系客服</span>
                    <span>查看物流</span>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { XHeader, XNumber, Timeline, TimelineItem } from 'vux'
export default {
  name: 'orderDetails',
  components: {
    XHeader,
    XNumber,
    Timeline,
    TimelineItem
  },
  inject: ['reload'],
  computed: {
    listItemsOut () { return this.$store.state.listItemsOut }
  },
  data () {
    return {
      changeValue: 1,
      totalPrice: '',
      id: '',
      imgs: this.$route.query.imgs,
      price: this.$route.query.price,
      title: this.$route.query.title,
      assets: '',
      purchaseNumb: ''
    }
  },
  watch: {
    '$route' (to, from) { // 监听路由是否变化
      this.reload()
      this.init()
    }
  },
  mounted () {
    let getinfo = sessionStorage.getItem('userInfo')
    this.assets = JSON.parse(getinfo).zbCoin
    this.init()
    this.reload()
  },
  methods: {
    init () {
      this.id = this.$route.query.id
      this.imgs = this.$route.query.imgs
      this.price = this.$route.query.price
      this.title = this.$route.query.title
      this.totalPrice = (+this.$route.query.price) * (this.$route.query.purchaseNumb)// 默认总价格
      this.purchaseNumb = (this.$route.query.purchaseNumb)
    },
    test (val) {
      let unitPrice = (+this.$refs.unitPrice.textContent)// 获取物品单价
      this.totalPrice = val * unitPrice // 计算总价并赋值
      console.log(this.totalPrice)
    }
  }
}
</script>

<style scoped>
    .clear_fix{
        clear:both;
        overflow: hidden;
    }
    .order_details{
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #f5f5f5;
        z-index: 1010;
        min-height: 29rem;
    }
    .x-header_fixed{
        background-color:#fff;
        width: 100%;
        position: fixed;
        z-index: 999;
    }
    .selected_address{
        position: relative;
        margin-top: 55px;
        background-color: white;
    }
    .selected_address_info{
        padding: 0.68rem ;
    }
    .selected_address_info > ul > li{
        list-style: none;
        font-size: 0.86rem;
        color: #2e353d;
        height: 1.2rem;
        line-height: 1.2rem;
        font-weight: 600;
    }
    .selected_address_info > ul > li >span {
        font-size: 0.88rem;
        color: #2e353d;
        font-weight: normal;
        margin-right: 0.58rem;
    }
    .selected_address_info > ul > li >img {
        width: 0.48rem;
        height: 0.88rem;
    }
    .selected_address_info > p{
        margin: 0.38rem 0;
        font-size: 0.78rem;
        color: #cccccc;
        width: 100%;
        overflow: hidden;
    }
    .address_img{
        position: absolute;
        bottom: 0;
        height: 5px;
        width: 100%;
        background: url("../../assets/demo/coinmall/addressbottom.png") no-repeat;
    }
    .shopping_cart_goods, .order_info{
        background-color: white;
        margin-top: 0.48rem;
        padding: 0.68rem 0 0.68rem 0.68rem;
    }
    .list_wrap{
        margin: 0.38rem 0;
        height: 4.6rem;
        border-bottom: 1px solid #eee;
    }
    .img_wrap{
        float: left;
        width: 29%;
        height: 3.8rem;
        margin-top: 0.45rem;
    }
    .desc_wrap{
        float: left;
        width: 65%;
        margin-left: 5%;
    }
    .img_wrap > img{
        max-width: 100%;
        height: auto;
        margin:0 auto;
    }
    .desc_wrap_title{
        width: 100%;
        font-size: 0.72rem;
        margin-top: 0.48rem;
        height: 1.8rem;
        color: #2e353d;
        /*overflow: hidden;*/
        /*text-overflow:ellipsis;*/
        /*white-space: nowrap;*/
    }
    .price{
        float: left;
        font-size: 0.72rem;
        color: #e3b87b;
        line-height: 1.2rem;
    }
    .purchaseNumb{
        float: right;
        margin-right: 3rem;
        font-size: 0.68rem;
        line-height: 1.2rem;
        color: #cccccc;
    }
    p {
        color: #888;
        font-size: 0.8rem;
    }
    h4 {
        color: #31383f;
        font-weight: normal;
        font-size: 0.86rem;
    }
    .fixed_bottom{
        position: fixed;
        bottom: 0;
        width: 100%;
        z-index: 1200;
    }
    .totalPrice{
        position: fixed;
        bottom: 0;
        width: 40%;
        height: 2.2rem;
        font-size: 0.86rem;
        background-color: #e2b77b;
        text-align: center;
        color: white;
        left: 0;
        line-height: 2.2rem;
    }
    .confirm{
         position: fixed;
         bottom: 0;
         width: 60%;
         height: 2.2rem;
         font-size: 0.82rem;
         color: white;
         right: 0;
         background-color: #2381f9;
     }
    .confirm > span{
        width: 49%;
        float: left;
        height: 1.2rem;
        line-height: 1.2rem;
        margin-top: 0.5rem;
        text-align: center;
    }
</style>
