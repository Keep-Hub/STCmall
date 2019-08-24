<template>
    <div class="goods_List">
        <div class="goods_List_title">
            <tab v-model="activeIndex" :line-width="2" custom-bar-width="30px" bar-active-color="#ff7800" active-color='#ff7800'>
                <tab-item  @on-item-click="tabClick(0)" >全部</tab-item>
                <tab-item  @on-item-click="tabClick(1)">卡券</tab-item>
                <tab-item  @on-item-click="tabClick(2)">商品</tab-item>
            </tab>
        </div>
        <div class="goods_List_main">
            <div style="padding: 1.2rem 0; background-color: white">
                <router-link to="/mycoin">
                    <div class="my_coin clear_fix">
                        <span> <img src="../../assets/demo/zblogo.png" alt="">我的粽币: &nbsp;{{userInfo.zbCoin}}个</span>
                    </div>
                </router-link>
            </div>
            <div v-show="activeIndex === 0" class="tab_info">
                <p>0</p>
            </div>
            <div v-show="activeIndex === 1" class="tab_info">
                <ul>
                    <li class="list_wrap clear_fix" v-for="(c, index) in coupon" :key="index">
                        <div class="img_wrap">
                            <img :src="c.coupon_img" alt="" @click="cardDetailed(c.id)">
                        </div>
                        <div class="desc_wrap">
                            <p class="desc_wrap_title" ref="userinfo">{{c.coupon_title}}</p>
                            <div class="clear_fix" style="width: 100%;margin-top: 0.18rem">
                                <p class="price">{{c.coupon_price}}粽币</p>
                                <p class="exchange" @click="cardDetailed(c.id)">兑换</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div v-show="activeIndex === 2" class="tab_info">
                <scroller
                        lock-x
                        scrollbar-y
                        use-pullup
                        :pullup-config="pullupConfig2"
                        height="100%"
                        ref="demo2"
                        @on-pullup-loading="load2"
                        :bounce=false
                >
                <ul>
                    <li class="list_wrap clear_fix" v-for="(g, index) in list" :key="index">
                        <div class="img_wrap">
                            <img :src="g.goods_img" @click="goodsDetailed(g.id)" alt="">
                        </div>
                        <div class="desc_wrap">
                            <p class="desc_wrap_title" ref="goods_title">{{g.goods_title}}</p>
                            <div class="clear_fix" style="width: 100%;margin-top: 0.18rem">
                                <p class="price">{{g.goods_price}}粽币</p>
                                <p class="exchange" @click="goodsDetailed(g.id)">兑换</p>
                            </div>
                        </div>
                    </li>
                </ul>
                </scroller>
            </div>
        </div>
    </div>
</template>

<script>
import {Tab, TabItem, LoadMore, Scroller} from 'vux'
import globalLoading from '../../javascript/loading'
export default {
  name: 'goodsList',
  components: {
    Tab,
    TabItem,
    LoadMore,
    Scroller
  },
  data () {
    return {
      index: '',
      activeIndex: +this.$route.query.id,
      userInfo: [],
      coupon: [],
      goods: [],
      list: [],
      currentPage: 1,
      nomore: false,
      pullupConfig2: {
        content: ' ',
        downContent: ' ',
        upContent: ' ',
        loadingContent: ' '
      }
    }
  },

  watch: {
    '$route' (to, from) { // 监听路由是否变化
      if (to.query.id !== from.query.id) {
        // console.log(to.query.id)
        this.activeIndex = +to.query.id
      }
    }
  },
  mounted () {
    this.load2()
    this.init()
    this.$http.get('../../static/goodsList.json').then(response => {
      this.coupon = response.data.result.coupon
      // this.goods = response.data.result.goods
    })
  },
  methods: {
    tabClick (e) {
      this.$router.push({
        path: '/goodsList',
        query: {
          id: e
        }})
      console.log(this.activeIndex)
    },
    init () {
      this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
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
          imgs: this.list[id - 1].goods_img,
          price: this.list[id - 1].goods_price,
          title: this.list[id - 1].goods_title
        }})
    },
    fetchData (cb) {
      this.$http.get('../../static/goodsList.json').then(response => {
        console.log(response.data.result.goods)
        cb(response.data)
      })
    },
    load2 () {
      this.fetchData(data => {
        let a = this.currentPage++
        let b = 8
        if (a - 1 < Math.ceil(data.result.goods.length / b)) { // 计算出有多少页然后判断执行几次
          this.list = this.list.concat(this.getPageData(a, b, data.result.goods)) // 插入每次添加的数据
          this.$refs.demo2.donePullup()
          globalLoading.show()
          setTimeout(function () {
            globalLoading.hide()
          }, 200)
        } else {
          this.$refs.demo2.disablePullup()
        }
      })
    },
    getPageData (currentPage, pageSize, objData) {
      let totalPage = Math.ceil(objData.length / pageSize) // 先算出一共多少页
      // console.log(currentPage > 0 && currentPage <= totalPage)
      if (currentPage > 0 && currentPage <= totalPage) {
        return objData.slice(pageSize * (currentPage - 1), pageSize * currentPage)
      } else {
        return ['您输入的页码超出范围！']
      }
    }
  }
}
</script>

<style scoped>
    .clear_fix{
        clear:both;
        overflow: hidden;
    }
    .goods_List{
        background-color: #f5f5f5;
        width: 100%;
        min-height: 29rem;
        position: relative;
        z-index: 1001;
    }
    .goods_List_title{
        width: 100%;
        position: fixed;
        z-index: 1010;
    }
    .goods_List_main{
        padding-top: 44px;
        background-color: #efefef;
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
    .tab_info{
        width: 100%;
        height: 35rem;
        margin-top: 0.28rem;
        background-color: white;
    }
    ul li {
        list-style: none;
        background-color: white;
    }
    .list_wrap{
        margin: 0 0.64rem;
        height: 4.6rem;
        border-bottom: 1px solid #eee;
    }
    .img_wrap{
        float: left;
        width: 30%;
    }
    .desc_wrap{
        float: left;
        width: 70%;
    }
    .img_wrap > img{
        width: 4.6rem;
        height: 3rem;
        margin: .8rem .84rem .8rem 0;
    }
    .desc_wrap_title{
        font-size: 0.82rem;
        margin-top: 1.2rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .price{
        float: left;
        font-size: 0.82rem;
        color: #e3b87b;
        line-height: 1.2rem;
    }
    .exchange{
        width: 3.8rem;
        height: 1.2rem;
        float: right;
        font-size: 0.80rem;
        background-color: #2381f9;
        border-radius: 0.83rem;
        line-height: 1.2rem;
        color: white;
        text-align: center;
    }
</style>
