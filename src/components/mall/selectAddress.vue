<template>
    <div>
        <div class="select_address">
            <div v-transfer-dom>
                <popup v-model="show12" position="bottom" :popup-style="{zIndex: 1300}" height="100%" style="background-color: white">
                    <x-header :left-options="{showBack: false}" class="x-header_fixed">我的收货地址<a slot="right" @click="addNewAddress">添加新地址</a></x-header>
                    <div style="padding: 0 15px;">
                        <div v-if="this.getAddress.length === 245" class="selected_address"></div>
                        <div v-else-if="this.getAddress.length !== 245" class="selected_address">
                            <div class="selected_address_info" v-for="(g, index) in getAddress" :key="index">
                                <ul class="clear_fix">
                                    <li style="float: left;" @click="addressSelection(index)">
                                        <span>{{g.Addressee}}</span>
                                        <span>{{g.Mobile}}</span>
                                    </li>
                                    <li style="float: right">
                                        <x-button mini plain type="warn" @click.native="edit(g.id,index)">编辑</x-button>
                                    </li>
                                </ul>
                                <p @click="addressSelection(index)">{{g.regionAddress}} {{g.detailedAddress}}</p>
                                <img src="../../assets/demo/coinmall/addressbottom.png" alt="" style="width: 100%">
                            </div>
                        </div>
                    </div>
                </popup>
            </div>
        </div>
    </div>
</template>

<script>
import { Popup, XButton, Group, Cell, XHeader, TransferDomDirective as TransferDom } from 'vux'
export default {
  directives: {
    TransferDom
  },
  name: 'selectAddress',
  data () {
    return {
      show12: true,
      getAddress: [],
      username: '',
      id: ''
    }
  },
  components: {
    Popup,
    XButton,
    Group,
    Cell,
    XHeader
  },
  computed: {
    listItemsOut () { return this.$store.state.listItemsOut }
  },
  inject: ['reload'],
  mounted () {
    let getinfo = sessionStorage.getItem('userInfo')
    this.username = JSON.parse(getinfo).username
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
        console.log(this.getAddress)
      })
    },
    test1 () {
      this.$parent.testChange()
    },
    test () {
      this.show12 = false
      setTimeout(() => {
        this.test1()
      }, 200)
    },
    addNewAddress () {
      this.$router.push({
        path: '/addAddress',
        query: {
          id: this.$route.query.id,
          imgs: this.$route.query.imgs,
          price: this.$route.query.price,
          totalPrice: this.totalPrice,
          title: this.$route.query.title,
          purchaseNumb: this.purchaseNumb
        }})
      this.reload()
    },
    edit (i, e) {
      this.$router.push({
        path: '/reviseAddress',
        query: {
          ID: i,
          id: this.$route.query.id,
          imgs: this.$route.query.imgs,
          price: this.$route.query.price,
          totalPrice: this.totalPrice,
          title: this.$route.query.title,
          purchaseNumb: this.purchaseNumb,
          Addressee: this.getAddress[e].Addressee,
          Mobile: this.getAddress[e].Mobile,
          regionAddress: this.getAddress[e].regionAddress,
          detailedAddress: this.getAddress[e].detailedAddress
        }})
      console.log(i, e)
    },
    addressSelection (g) {
      this.$store.commit('mutationsReduceCount')
      this.$store.commit('mutationsAddCount', this.getAddress.slice(g, g + 1))
      this.$router.push({
        path: '/shoppingCart',
        query: {
          id: this.$route.query.id,
          imgs: this.$route.query.imgs,
          price: this.$route.query.price,
          totalPrice: this.totalPrice,
          title: this.$route.query.title,
          purchaseNumb: this.purchaseNumb
        }})
      this.test()
    }
  }
}
</script>

<style scoped>
    .select_address{
        position: relative;
        width: 100%;
        height: 100%;
        background-color: #f5f5f5;
        z-index: 1500;
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
        width: 94%;
        padding: 0.68rem 3%;
    }
    .selected_address_info > ul > li{
        list-style: none;
        font-size: 0.86rem;
        color: #2e353d;
        height: 1.2rem;
        line-height: 1.2rem;
        font-weight: 600;
        margin-bottom: 0.38rem;
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
        width: 80%;
        overflow: hidden;
    }
</style>
