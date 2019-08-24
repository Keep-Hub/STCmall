<template>
    <div class="mycoin">
        <x-header :left-options="{backText: ''}" class="x-header_fixed">我的粽币</x-header>
        <div class="mycoin_title" >
            <div class="achieve_coin">
                <div class="achieve_coin_balance">
                    <span><img src="../../assets/demo/coinmall/mycoin.png" alt="">&nbsp;{{userInfo.zbCoin}}</span><span style="font-size: 0.82rem">&nbsp;个</span></div>
                <div class="achieve_coin_way" @click="Dialog">获取粽币</div>
            </div>
            <div v-transfer-dom>
                <x-dialog v-model="showDialogStyle" mask-z-index="1020" hide-on-blur :dialog-style="{'max-width': '100%', width: '100%', height: '50%', 'background-color': 'transparent'}">
                    <div style="color:#fff;text-align:center;" @click="showDialogStyle = false">
                        <div class="dialog_main">
                            <div class="dialog_info">
                                <p>粽币获取途径</p>
                                <dl>
                                    <dt><i></i><span style="float: left;height: .82rem;">投资立返</span></dt>
                                    <dd>根据会员等级，每笔投资按会员年化投资金额的12.0%～32.0%立返粽币。包括新手标。</dd>
                                </dl>
                                <dl>
                                    <dt><i></i><span style="float: left;height: .82rem;">升级奖励</span></dt>
                                    <dd>会员升级至青铜及以上等级时，每次升级可获粽币奖励。</dd>
                                </dl>
                                <x-button :gradients="['#1D62F0', '#2381f9']" class="dialog_button">去投资</x-button>
                            </div>
                        </div>
                        <x-icon type="ios-close-outline" size="36" style="fill:#fff;"></x-icon>
                    </div>
                </x-dialog>
            </div>
            <div>
                <flexbox>
                    <flexbox-item class="what_zb">什么是粽币</flexbox-item>
                    <flexbox-item class="zb_mall"><router-link to="/coinmall" class="color_blue">粽币商城</router-link></flexbox-item>
                </flexbox>
            </div>
        </div>
        <div class="income_expenses">
            <tab :line-width="2" custom-bar-width="1.2rem" bar-active-color="#367fe5" active-color='#367fe5'>
                <tab-item selected @on-item-click="tabClick(0)" style="font-size: 0.64rem">收入</tab-item>
                <tab-item  @on-item-click="tabClick(1)" style="font-size: 0.64rem">支出</tab-item>
            </tab>
        </div>
        <div class="income_expenses_info">
            <div v-show="activeIndex === 0">
                <div class="income_info">
                    <div class="income_info">
                        <div style="width: 100%">
                            <div class="income_info_ym">
                                <span>2019年6月</span>
                                <span style="float: right;color: #e3b87b;font-size: 0.78rem">收入: +<span>1888</span></span>
                            </div>
                            <div class="income_detailed">
                                <div class="clear_fix">
                                    <div  style="float: left">
                                        <p class="income_source"><span>会员权益-海量粽币</span></p>
                                        <p class="income_datetime">
                                            <span class="income_date"><span>2019:06:18</span></span>
                                            <span class="income_time"><span>11:18:20</span></span>
                                        </p>
                                    </div>
                                    <p class="income_count">+<span>6000</span></p>
                                </div>
                            </div>
                            <div class="income_detailed">
                                <div class="clear_fix">
                                    <div  style="float: left">
                                        <p class="income_source">兑换</p>
                                        <p class="income_datetime">
                                            <span class="income_date"><span>2019:06:18</span></span>
                                            <span class="income_time"><span>11:18:20</span></span>
                                        </p>
                                    </div>
                                    <p class="income_count">+<span>2000</span></p>
                                </div>
                            </div>
                            <div class="income_detailed">
                                <div class="clear_fix">
                                    <div  style="float: left">
                                        <p class="income_source"><span>投资返粽币</span></p>
                                        <p class="income_datetime">
                                            <span class="income_date"><span>2019:06:18</span></span>
                                            <span class="income_time"><span>11:18:20</span></span>
                                        </p>
                                    </div>
                                    <p class="income_count">+<span>1000</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="income_info">
                    <div class="income_info">
                        <div style="width: 100%">
                            <div class="income_info_ym">
                                <span>2019年5月</span>
                                <span style="float: right;color: #e3b87b;font-size: 0.78rem">收入: +<span>1888</span></span>
                            </div>
                            <div class="income_detailed">
                                <div class="clear_fix">
                                    <div  style="float: left">
                                        <p class="income_source"><span>会员权益-海量粽币</span></p>
                                        <p class="income_datetime">
                                            <span class="income_date"><span>2019:06:18</span></span>
                                            <span class="income_time"><span>11:18:20</span></span>
                                        </p>
                                    </div>
                                    <p class="income_count">+<span>6000</span></p>
                                </div>
                            </div>
                            <div class="income_detailed">
                                <div class="clear_fix">
                                    <div  style="float: left">
                                        <p class="income_source">兑换</p>
                                        <p class="income_datetime">
                                            <span class="income_date"><span>2019:06:18</span></span>
                                            <span class="income_time"><span>11:18:20</span></span>
                                        </p>
                                    </div>
                                    <p class="income_count">+<span>2000</span></p>
                                </div>
                            </div>
                            <div class="income_detailed">
                                <div class="clear_fix">
                                    <div  style="float: left">
                                        <p class="income_source"><span>投资返粽币</span></p>
                                        <p class="income_datetime">
                                            <span class="income_date"><span>2019:06:18</span></span>
                                            <span class="income_time"><span>11:18:20</span></span>
                                        </p>
                                    </div>
                                    <p class="income_count">+<span>1000</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-show="activeIndex === 1">
                <div class="income_info">
                    <div style="width: 100%">
                        <div class="income_info_ym">
                            <span>2019年6月</span>
                            <span style="float: right;color: #e3b87b;font-size: 0.78rem">支出: - <span>1888</span></span>
                        </div>
                        <div class="income_detailed">
                            <div class="clear_fix">
                                <div  style="float: left">
                                    <p class="income_source"><span> 兑换商品 - <span class="color_blue">查看物流</span></span></p>
                                    <p class="income_datetime">
                                        <span class="income_date"><span>2019:06:18</span></span>
                                        <span class="income_time"><span>11:18:20</span></span>
                                    </p>
                                </div>
                                <p class="income_count"> -<span>1888</span></p>
                            </div>
                        </div>
                        <div class="income_detailed">
                            <div class="clear_fix">
                                <div  style="float: left">
                                    <p class="income_source">兑换商品 - <span class="color_blue">待发货</span></p>
                                    <p class="income_datetime">
                                        <span class="income_date"><span>2019:06:18</span></span>
                                        <span class="income_time"><span>11:18:20</span></span>
                                    </p>
                                </div>
                                <p class="income_count">-<span>2000</span></p>
                            </div>
                        </div>
                        <div class="income_detailed">
                            <div class="clear_fix">
                                <div  style="float: left">
                                    <p class="income_source"><span>投资返粽币</span></p>
                                    <p class="income_datetime">
                                        <span class="income_date"><span>2019:06:18</span></span>
                                        <span class="income_time"><span>11:18:20</span></span>
                                    </p>
                                </div>
                                <p class="income_count">-<span>1000</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="income_info">
                    <div style="width: 100%">
                        <div class="income_info_ym">
                            <span>2019年5月</span>
                            <span style="float: right;color: #e3b87b;font-size: 0.78rem">支出: - <span>1888</span></span>
                        </div>
                        <div class="income_detailed">
                            <div class="clear_fix">
                                <div  style="float: left">
                                    <p class="income_source"><span> 兑换商品 - <span class="color_blue">查看物流</span></span></p>
                                    <p class="income_datetime">
                                        <span class="income_date"><span>2019:06:18</span></span>
                                        <span class="income_time"><span>11:18:20</span></span>
                                    </p>
                                </div>
                                <p class="income_count"> -<span>1888</span></p>
                            </div>
                        </div>
                        <div class="income_detailed">
                            <div class="clear_fix">
                                <div  style="float: left">
                                    <p class="income_source">兑换商品 - <span class="color_blue">待发货</span></p>
                                    <p class="income_datetime">
                                        <span class="income_date"><span>2019:06:18</span></span>
                                        <span class="income_time"><span>11:18:20</span></span>
                                    </p>
                                </div>
                                <p class="income_count">-<span>2000</span></p>
                            </div>
                        </div>
                        <div class="income_detailed">
                            <div class="clear_fix">
                                <div  style="float: left">
                                    <p class="income_source"><span>投资返粽币</span></p>
                                    <p class="income_datetime">
                                        <span class="income_date"><span>2019:06:18</span></span>
                                        <span class="income_time"><span>11:18:20</span></span>
                                    </p>
                                </div>
                                <p class="income_count">-<span>1000</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { XHeader, Swiper, Flexbox, FlexboxItem, LoadMore, Divider, Tab, TabItem, XTable, XDialog, XButton, TransferDomDirective as TransferDom } from 'vux'
export default {
  directives: {
    TransferDom
  },
  name: 'mycoin',
  components: {
    XHeader,
    Swiper,
    Flexbox,
    FlexboxItem,
    LoadMore,
    Divider,
    Tab,
    TabItem,
    XTable,
    XDialog,
    XButton
  },
  data () {
    return {
      activeIndex: 0,
      userInfo: [],
      showDialogStyle: false
    }
  },
  watch: {
    '$route' (to, from) { // 监听路由是否变化
      this.init()
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    tabClick (index) {
      this.activeIndex = index
    },
    init () {
      let getinfo = sessionStorage.getItem('userInfo')
      this.userInfo = JSON.parse(getinfo)
    },
    Dialog () {
      this.showDialogStyle = !this.showDialogStyle
    }
  }
}
</script>

<style scoped>
    .clear_fix{
        clear:both;
        overflow: hidden;
    }
    .mycoin{
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
    .mycoin_title{
        margin-top: 46px;
        background-color:#fff;
        padding-bottom: 1rem;
    }
    .achieve_coin{
        width: 10rem;
        margin: 0 auto;
        text-align: center;
        position: relative;
        line-height: 1.8rem;
    }
    .achieve_coin_balance{
        margin: 0 auto;
        padding: 0.86rem 0;
        font-size: 1.3rem;
        color: #e3b87b;
    }
    .achieve_coin_balance span{
    }
    .achieve_coin_balance img{
        width: 1.8rem;
        height: 1.8rem;
        vertical-align:middle;
    }.achieve_coin_way{
        width: 100%;
        height: 2rem;
        background-color: #2381f9;
        line-height: 2rem;
        border-radius: 2rem;
        color: white;
        font-size: 0.82rem;
        margin-bottom: 1rem;
     }
     .dialog_main{
         background-color: white;
         width: 15rem;
         margin: 0.58rem auto;
         padding-bottom: 1rem;
         border-radius: 0.5rem;
     }
     .dialog_info{
         position: relative;
         margin: 0 auto;
         width: 13rem;
         color: black;
     }
     .dialog_info >p{
         padding: 1rem 0;
         color: black;
         font-weight: 700;
         font-size: 0.92rem;
     }
     .dialog_info > dl{
         margin-bottom: 1rem;
         text-align: left;
     }
    .dialog_info > dl > dt{
        align-items: center;
        height: .82rem;
        font-size: 0.82rem;
        line-height: 0.82rem;
        font-weight: 700;
    }
    .dialog_info > dl > dt >i{
        float: left;
        display: inline-block;
        margin-right: .18rem;
        width: .13rem;
        height: .82rem;
        background: #80b8ff;
    }
    .dialog_info > dl >dd{
        margin-top: 0.28rem;
        font-size: 0.78rem;
    }
    .dialog_button{
        margin: 2rem 0 auto;
        border-radius: 1rem;
    }
    .zb_mall{
        border-left: 1px solid #e6e6e6;
        color: #2381f9!important;
    }
    .what_zb,.zb_mall{
        text-align: center;
        color: #37394d;
        font-size: 0.82rem;
    }
    .income_info{
        color: #2e353d;
        margin-top: 0.58rem;
    }
    .income_expenses{
        margin: 0.56rem auto;
        background-color: white;
    }
    .income_expenses_info{
    }
    .income_info_ym{
        padding: 0.38rem 0.58rem;
        font-size: 0.86rem;
        background-color: white;
    }
    .income_detailed{
        border-top: 1px solid #e6e6e6;
        padding: 0.58rem 0.58rem;
        background-color: white;
    }
    .income_datetime{
        margin-top: 0.28rem;
        color: #8e9399;
        font-size: 0.62rem;
    }
    .income_datetime span{
        margin-right: 0.78rem;
    }
    .income_source{
        font-size: 0.88rem;
    }
    .income_count{
        float: right;
        line-height: 2rem;
    }
    .color_blue{
        color: #2381f9;
    }
</style>
