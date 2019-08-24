<template>
    <div class="shopping_Cart">
        <x-header :left-options="{backText: ''}" class="x-header_fixed">购物车</x-header>
        <div v-if="(+Object.keys(this.listItemsOut).length) === 0" class="selected_address">
                <h1 style="color: #f5f5f5;text-align: center" @click="addressSelection">+</h1>
                <div class="address_img"></div>
        </div>
        <div v-else class="selected_address">
            <div class="selected_address_info" v-for="(g, index) in listItemsOut.slice(0, 1)" :key="index">
                <ul class="clear_fix">
                    <li style="float: left;">
                        <span>{{g[index].Addressee}}</span>
                        <span>{{g[index].Mobile}}</span>
                    </li>
                    <li style="float: right">
                        <img src="../../assets/demo/coinmall/arrow.png" alt="" @click="addressSelection">
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
                            <x-number
                                    :min="0"
                                    :max="99"
                                    v-model="changeValue"
                                    fillable
                                    width="26px"
                                    style="float: right; padding: 0;"
                                    @on-change="test"
                            ></x-number>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <sAddress  v-if="selectAddress"></sAddress>
        <section class="fixed_bottom">
            <router-link to="/mycoin">
                <div class="my_coin clear_fix">
                    <span><img src="../../assets/demo/zblogo.png" alt="">我的粽币: &nbsp;{{this.assets}}个</span>
                </div>
            </router-link>
            <div class="clear_fix">
                <div class="totalPrice">
                    <span>{{this.totalPrice}}</span>
                    <span>粽币</span>
                </div>
                <div class="confirm" @click="confirm()">确认兑换</div>
                <div v-transfer-dom>
                    <confirm
                            v-model="show4"
                            :close-on-confirm="false"
                            mask-transition
                            :title="('确认兑换')"
                            mask-z-index="1020"
                            @on-confirm="onConfirm">
                        <p style="text-align:center;">{{this.title}}</p>
                    </confirm>
                </div>
                <div v-transfer-dom>
                    <alert v-model="show2" :title="('提示')" :content="('粽币不足！')" mask-z-index="1200"></alert>
                    <alert v-model="show5" :title="('提示')" :content="('请填写要兑换商品的数量！')" mask-z-index="1200"></alert>
                    <alert v-model="show3" :title="('提示')" :content="('请先选择地址！')" mask-z-index="1200" @on-hide="onChange"></alert>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { XHeader, XNumber, Confirm, Alert, Popup, XButton, Group, Cell, TransferDomDirective as TransferDom } from 'vux'
import globalLoading from '../../javascript/loading'
import sAddress from '../mall/selectAddress'
export default {
  directives: {
    TransferDom
  },
  name: 'shoppingCart',
  components: {
    XHeader,
    XNumber,
    Confirm,
    Alert,
    Popup,
    XButton,
    Group,
    Cell,
    sAddress
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
      purchaseNumb: 1,
      show2: false,
      show3: false,
      show4: false,
      show5: false,
      show12: false,
      getAddress: [],
      username: '',
      password: '',
      selectAddress: false
    }
  },
  inject: ['reload'],
  watch: {
    '$route' (to, from) { // 监听路由是否变化
      this.id = this.$route.query.id
      this.imgs = this.$route.query.imgs
      this.price = this.$route.query.price
      this.title = this.$route.query.title
      this.totalPrice = (+this.$route.query.price) * this.purchaseNumb
      let getinfo = sessionStorage.getItem('userInfo')
      this.assets = JSON.parse(getinfo).zbCoin
    }
  },
  computed: {
    listItemsOut () { return this.$store.state.listItemsOut }
  },
  mounted () {
    let getinfo = sessionStorage.getItem('userInfo')
    this.assets = JSON.parse(getinfo).zbCoin
    this.username = JSON.parse(getinfo).username
    this.password = JSON.parse(getinfo).password
    this.totalPrice = (+this.$refs.unitPrice.textContent)// 默认总价格
    // console.log(+Object.keys(this.listItemsOut).length)
    this.init()
  },
  methods: {
    init () {
      this.$http.get('api/stcport/getAddress.php', {
        emulateJSON: true,
        params: {
          tableName: 'add' + this.username
        }
      }).then(response => {
        this.getAddress = response.data
      })
    },
    addressSelection () {
      this.onChange()
      // console.log(this.$route.query.id, this.$route.query.imgs, this.$route.query.price, this.totalPrice, this.purchaseNumb)
      /* this.$router.push({
        path: '/receivingAddress',
        query: {
          id: this.$route.query.id,
          imgs: this.$route.query.imgs,
          price: this.$route.query.price,
          totalPrice: this.totalPrice,
          title: this.$route.query.title,
          purchaseNumb: this.purchaseNumb
        }}) */
      this.reload()
    },
    test (val) {
      let unitPrice = (+this.$refs.unitPrice.textContent)// 获取物品单价
      this.totalPrice = val * unitPrice // 计算总价并赋值
      this.purchaseNumb = val
      // console.log(val)
      // console.log(this.totalPrice)
    },
    confirm () {
      if (this.listItemsOut.length === 0) {
        this.show3 = true
      } else if (this.totalPrice === 0 || this.purchaseNumb === 0) {
        this.show5 = true
      } else {
        if (+this.assets >= +this.totalPrice) {
          this.show4 = true
        } else {
          this.show2 = true
        }
      }
    },
    onConfirm () {
      this.$http.get('api/stcport/modifyAddress.php', {
        emulateJSON: true,
        params: {
          statusCode: 5,
          username: this.username,
          totalPrice: JSON.parse(sessionStorage.getItem('userInfo')).zbCoin - this.totalPrice
        }
      }).then(response => {
        this.getAddress = response.data
      })
      console.log(this.totalPrice)
      globalLoading.show()
      setTimeout(() => {
        globalLoading.hide()
        this.show4 = false
        this.reload()
        this.$router.push({
          path: '/orderDetails',
          query: {
            id: this.$route.query.id,
            imgs: this.$route.query.imgs,
            price: this.$route.query.price,
            totalPrice: this.totalPrice,
            title: this.$route.query.title,
            purchaseNumb: this.purchaseNumb
          }})
      }, 1000)
      this.getUserInfo()
    },
    /* onConfirmAddress () {
      this.$router.push({
        path: '/receivingAddress',
        query: {
          id: this.$route.query.id,
          imgs: this.$route.query.imgs,
          price: this.$route.query.price,
          totalPrice: this.totalPrice,
          title: this.$route.query.title,
          purchaseNumb: this.purchaseNumb
        }})
      this.reload()
    }, */
    onChange () {
      this.selectAddress = !this.selectAddress
      console.log(this.selectAddress)
    },
    testChange () {
      this.selectAddress = !this.selectAddress
      console.log(this.selectAddress)
    },
    getUserInfo () {
      this.$http.post('api/stcport/resjson.php', {
        emulateJSON: true,
        username: this.username,
        password: this.password
      }).then(response => {
        sessionStorage.setItem('userInfo', JSON.stringify(response.data.id))
        let getinfo = sessionStorage.getItem('userInfo')
        this.assets = JSON.parse(getinfo).zbCoin
        console.log(JSON.parse(sessionStorage.getItem('userInfo')).zbCoin)
      })
    }
  }
}
</script>

<style scoped>
    .clear_fix{
        clear:both;
        overflow: hidden;
    }
    .shopping_Cart{
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
        min-height: 3rem;
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
        width: 90%;
        overflow: hidden;
    }
    .address_img{
        position: absolute;
        bottom: 0;
        height: 5px;
        width: 100%;
        background: url("../../assets/demo/coinmall/addressbottom.png") no-repeat;
    }
    .shopping_cart_goods{
        background-color: white;
        margin-top: 10px;
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
    }.confirm{
         position: fixed;
         bottom: 0;
         width: 60%;
         height: 2.2rem;
         font-size: 0.86rem;
         text-align: center;
         color: white;
         right: 0;
         line-height: 2.2rem;
         background-color: #2381f9;
     }
</style>
