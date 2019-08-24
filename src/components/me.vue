<template>
    <div class="me">
        <div class="meTitle">
            <div class="title_ps">
                <!--<div class="newMsg">
                    <badge style="position: absolute;"></badge>
                    <img src="../assets/demo/msg.png" alt="">
                </div>-->
                <div class="setting_btn" >
                    <router-link to="/setting">
                        <img src="../assets/demo/setting.png" alt="">
                    </router-link>
                </div>
                <div class="account_info clear_fix">
                    <div class="user_img">
                        <img :src="userImgSrc" alt="">
                    </div>
                    <div class="nub_center ">
                       <p v-text="username"></p>
                        <flexbox style=" margin-top: 0.28rem">
                            <flexbox-item :span="5" class="vip_icon">
                                <p><img src="../assets/demo/vip.png" alt="">黄金会员</p>
                            </flexbox-item>
                            <flexbox-item :span="7" class="zb_coin">
                                <i></i>
                                <span style="float: left">粽币: {{userInfo.zbCoin}}个</span>
                            </flexbox-item>
                        </flexbox>
                    </div>
                </div>
            </div>
        </div>
        <div class="asset_info">
            <flexbox :gutter="0" wrap="wrap">
                <flexbox-item :span="1/2">
                    <div class="flex-demo">
                        <p>总资产(元)</p>
                        <span v-text="userInfo.totalAssets">1000,02.5</span>
                    </div>
                </flexbox-item>
                <flexbox-item :span="1/2">
                    <div class="flex-demo tl">
                        <p>累计收益(元)</p>
                        <span v-text="userInfo.accumulateEarnings">3,888.00</span>
                    </div>
                </flexbox-item>
                <flexbox-item :span="1/2">
                    <div class="flex-demo">
                        <p>可用余额(元)</p>
                        <span v-text="userInfo.availableBalance">1000</span>
                    </div>
                </flexbox-item>
                <flexbox-item :span="1/2" >
                    <div class="flex-demo top_up tl">
                        <div>充值 / 提现</div>
                    </div>
                </flexbox-item>
            </flexbox>
        </div>
        <div class="rob_ticket clear_fix">
            <div class="rob_ticket-left">
                <p>每天10点<span style="color: #f76432">限时抢券</span></p>
                <span style="color: #999999; font-size: 0.62rem;">加息券、提现券每天抢</span>
            </div>
            <span class="rob_ticket-right">
                    <img src="../assets/demo/robticket.png" alt="">
                </span>
        </div>
        <div>
            <group style="margin-top: -0.46rem">
                <div class="bg_white">
                    <div>
                        <img slot="restricted-label" src="../assets/demo/bankcard.png">
                        <cell class="cell_cl" is-link title="我的银行卡" ><span style="font-size: 0.72rem">绑定银行卡</span></cell></div>
                </div>
                <div class="bg_white">
                    <div class="bd_bottomNo">
                        <img slot="restricted-label" src="../assets/demo/myvip.png">
                        <cell class="cell_cl" is-link title="我的会员" ></cell></div>
                </div>
                <div class="bg_white mg_top10">
                    <div>
                        <img slot="restricted-label" src="../assets/demo/my_investment.png">
                        <cell class="cell_cl" is-link title="我的投资" ></cell></div>
                </div>
                <div class="bg_white">
                    <div>
                        <img slot="restricted-label" src="../assets/demo/moneyback.png">
                        <cell class="cell_cl" is-link title="回款计划" ></cell></div>
                </div>
                <div class="bg_white">
                    <div class="bd_bottomNo">
                        <img slot="restricted-label" src="../assets/demo/transactionrecord.png">
                        <cell class="cell_cl" is-link title="交易记录" ></cell></div>
                </div>
                <div class="bg_white mg_top10">
                    <div>
                        <img slot="restricted-label" src="../assets/demo/mywelfare.png">
                        <cell class="cell_cl" is-link title="我的福利" ><span style="font-size: 0.72rem">提现券</span></cell></div>
                </div>
                <div class="bg_white">
                    <div>
                        <img slot="restricted-label" src="../assets/demo/inviteprizes.png">
                        <cell class="cell_cl" is-link title="邀请有奖" ></cell></div>
                </div>
                <div class="bg_white">
                    <div class="bd_bottomNo">
                        <img slot="restricted-label" src="../assets/demo/checkinredenvelope.png">
                        <cell class="cell_cl" is-link title="签到红包" ></cell></div>
                </div>
                <div class="bg_white mg_top10">
                    <div class="bd_bottomNo">
                        <img slot="restricted-label" src="../assets/demo/contactus.png">
                        <cell class="cell_cl" is-link title="联系我们" ></cell></div>
                </div>
            </group>
        </div>
        <div style="width: 100%; padding: 40px 0 100px 0;">
            <div class="home_footer clear_fix">
                <img src="../assets/demo/draw.png" alt="">
                <p>&nbsp;&nbsp;银行存管已接入, 资金隔离更安全</p>
            </div>
        </div>
    </div>
</template>

<script>
import {Badge, Flexbox, FlexboxItem, Selector, Group, Cell, XInput} from 'vux'

export default {
  name: 'me',
  data () {
    return {
      defaultValue: 'bankcard',
      defaultValue6: 'ticket',
      userInfo: [],
      username: '',
      userImgSrc: '',
      list6: [{key: 'ticket', value: '提现券'}],
      demo02: 'vip',
      list: [{key: 'bankcard', value: '绑定银行卡'}, {key: 'bank', value: '绑定银行'}],
      list2: [{key: 'vip', value: '我的会员'}],
      list1: []
    }
  },
  components: {
    Badge,
    Flexbox,
    FlexboxItem,
    Selector,
    Group,
    Cell,
    XInput
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
    init () {
      let getinfo = sessionStorage.getItem('userInfo')
      this.userInfo = JSON.parse(getinfo)
      this.username = this.userInfo.username
      this.userImgSrc = this.userInfo.userimg
    }
  }
}
</script>

<style lang="less" scoped>
    .clear_fix{
        clear:both;
        overflow: hidden;
    }
    .me{
        width: 100%;
        background-color: #efefef;
        position: relative;
        z-index: 1000;
    }
    .padding5{
        padding: 0.45rem  0 0.45rem 0.84rem!important;
    }
    .meTitle{
        width: 94%;
        padding: 0 3%;
        background-color: white!important;
        height: 7.6rem;
    }
    .title_ps{
        position: relative;
    }
    .newMsg{
        position: absolute;
        right:2.65rem;
        top: 0.66rem;
    }
    .newMsg > img{
        width: 1.75rem;
        height: 1.45rem;
    }
    .setting_btn{
        position: absolute;
        right: 0.28rem;
        top: 0.84rem;
    }
    .setting_btn img{
        width: 1.18rem;
        height: 1.15rem;
    }
    .account_info{
        width: 94%;
        position: absolute;
        top: 2.78rem;
        padding: 0.39rem 3%;
    }
    .user_img {
        width: 3.04rem;
        background: url("../../static/userimg/defauituser.png") no-repeat;
        background-size: cover;
        height: 3.04rem;
        border-radius: 50%;
    }
    .user_img > img{
        width: 3.04rem;
        height: 3.04rem;
        border-radius: 50%;
    }
    .account_info >div{
        float: left;
        margin: 0 0.28rem;
    }
    .nub_center{
        color: #2e353d;
        overflow: hidden;
        min-width: 72%;
    }
    .nub_center p{
        margin-top: 0.28rem;
        font-size: 0.82rem;
    }
    .vip_icon{
        height: 0.9rem;
        border-right: 0.05rem solid #efefef;
    }
    .vip_icon > p{
        width: 4.2rem;
        height: 0.86rem;
        line-height: 0.86rem;
        border-radius: 0.43rem;
        margin: 0!important;
        font-size: 0.56rem;
        color: white;
        background-color: #f0c316;
    }
    .vip_icon > p > img{
        width: 0.86rem;
        height: 0.86rem;
        float: left;
        margin-right: 0.28rem;
    }
    .zb_coin{
        font-size: 0.58rem;
        color: #e3b87b;
    }
    .zb_coin > i{
        flex-shrink: 0;
        float: left;
        margin: 0  0.2rem;
        display: inline-block;
        width: .8rem;
        height: .8rem;
        background: url("../assets/demo/zblogo.png");
        background-size: contain;
    }
    .asset_info{
        margin-top: 0.48rem;
        width: 84%;
        padding: 0 8%;
        background-color: white!important;
    }
    .tl{
        text-align: left;
        margin-left: 1rem;
    }
    .asset_info .flex-demo{
        padding: 0.46rem 0;
    }
    .asset_info .flex-demo p{
        color: #8e9399;
        padding: 0.28rem 0;
        font-size: 0.78rem;
    }
    .asset_info .flex-demo span{
        padding: 0.28rem 0;
        color: #2e353d;
        font-weight: bolder;
        font-size: 1rem;
    }
    .top_up > div{
        width: 4.6rem;
        height: 1.36rem;
        font-size: 0.72rem;
        background-color: #2381f9;
        border-radius: 0.83rem;
        line-height: 1.36rem;
        color: white;
        text-align: center;
    }
    .rob_ticket{
        margin: 0.56rem 0;
        padding: 1rem 0.56rem;
        background-color: white;
    }
    .rob_ticket-left{
        float: left;
    }
    .rob_ticket-left p{
        color: #334455;
        font-size: 0.96rem;
        font-weight: bolder;
    }
    .rob_ticket-right{
        float: right;
    }
    .rob_ticket-right > img{
        width: 6.62rem;
        height: 2.46rem;
    }
    .bg_white{
        width: 100%;
        height: 100%;
        background-color: white;
        position: relative;
    }
    .bg_white > div{
        margin: 0 0 0 0.83rem;
        border-bottom: 0.05rem solid #eeeeee;
        padding: 0.28rem 0
    }
    .bg_white > div > img{
        display:inline-block;
        vertical-align:middle;
        position: absolute;
        top: 50%;
        margin-top: -0.61rem;
        width: 1.22rem;
        height: 1.22rem;
    }
    .mg_top10{
        margin-top: 0.56rem;
    }
    .bd_bottomNo{
        border-bottom: 0!important;
    }
    .cell_cl{
        padding-left: 10px!important
    }
    .home_footer{
        position: absolute;
        left: 40%;
        transform: translate(-30%,0);
    }
    .home_footer img{
        width: 0.66rem;
        height: 0.78rem;
        float: left;
        margin: 0.1rem 0 0 0;
    }
    .home_footer p{
        float: right;
        color: #8e9399;
        font-size: 0.66rem;
    }
</style>
