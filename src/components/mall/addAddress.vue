<template>
    <div class="add_address">
        <x-header :left-options="{backText: ''}" class="x-header_fixed">添加收货地址</x-header>
        <group style="margin-top: 55px; background-color: white;">
        <x-input
                v-model="addressee"
                placeholder="收货人姓名"
                :min= '2'
                :max= '8'
                :show-clear="false"
                style="background-color: #fff;"
        ></x-input>
        <x-input
                v-model="addresseeNub"
                placeholder="手机号码"
                :show-clear="false"
                :min= '11'
                :max= '11'
                style="background-color: #fff;"
        ></x-input>
         <x-address
                 :title="title6"
                 v-model="address"
                 :list="addressData"
                 :popup-style="{zIndex: 1011}"
                 @on-shadow-change="onShadowChange"
                 value-text-align="left"
                 placeholder="所在地区"
                 ref="address"
                 style="background-color: white; color: #2e353d;"
         ></x-address>
        <x-textarea
                :min= '5'
                :max= '150'
                v-model="detailedAddress"
                placeholder="详细地址: 如街道、小区、门牌号、楼栋号、单元号等"
                style="background-color: white; color: #2e353d!important;"
        ></x-textarea>
    </group>
        <div class="preserve" @click="addAddressee()">保存</div>
    </div>
</template>

<script>
import { XHeader, Group, XAddress, ChinaAddressData, XInput, XTextarea } from 'vux'
export default {
  name: 'addAddress',
  components: {
    XHeader,
    Group,
    XAddress,
    ChinaAddressData,
    XInput,
    XTextarea
  },
  inject: ['reload'],
  data () {
    return {
      addressData: ChinaAddressData,
      title6: '',
      address: [],
      addressee: '',
      addresseeNub: '',
      detailedAddress: '',
      username: ''
    }
  },
  watch: {
    '$route' (to, from) { // 监听路由是否变化
      this.reload()
    }
  },
  mounted () {
    let getinfo = sessionStorage.getItem('userInfo')
    this.username = JSON.parse(getinfo).username
    this.reload()
  },
  methods: {
    onShadowChange (ids, names) {
    },
    addAddressee () {
      if (this.addressee !== '' && this.addresseeNub !== '' && this.$refs.address.nameValue !== '' && this.detailedAddress !== '') {
        let numb = /^[1][3,4,5,7,8][0-9]{9}$/
        if (numb.test(this.addresseeNub)) {
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
          this.reload()
          this.$http.get('api/stcport/createTable.php', {
            emulateJSON: true,
            params: {
              statusCode: 1,
              tableName: 'add' + this.username,
              Addressee: this.addressee,
              Mobile: this.addresseeNub,
              regionAddress: this.$refs.address.nameValue,
              detailedAddress: this.detailedAddress
            }
          }).then(response => {
          })
        } else {
          alert('请填写正确的手机号码')
        }
      } else if (this.addressee === '') {
        alert('请填写收件人')
      } else if (this.addresseeNub === '') {
        alert('请填写收件人手机')
      } else if (this.$refs.address.nameValue === '') {
        alert('请选择地区')
      } else if (this.detailedAddress === '') {
        alert('请填写详细的收件地址')
      }
    }
  }
}
</script>

<style scoped>
    .add_address{
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
    .preserve{
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 2.2rem;
        font-size: 0.86rem;
        background-color: #2381f7;
        text-align: center;
        color: white;
        line-height: 2.2rem;
    }
</style>
