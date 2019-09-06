<template>
    <div class="setting">
        <x-header :left-options="{backText: ''}" class="x-header_fixed">设置</x-header>
        <div class="meTitle">
            <div class="title_ps">
                <!--<div class="newMsg">
                    <badge style="position: absolute;"></badge>
                    <img src="../assets/demo/msg.png" alt="">
                </div>-->
                <div class="setting_btn" >
                    <router-link to="/setting">
                        <img src="../../assets/demo/setting.png" alt="">
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
                                <p><img src="../../assets/demo/vip.png" alt="">黄金会员</p>
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
        <div class="quit_btn">
            <x-button :gradients="['#8F9298', '#8F9298']" link="/changepwd">修改密码</x-button>
            <x-button :gradients="['#F46C6C', '#F46C6C']" @click.native="quitLogin">退出登录</x-button>
        </div>
    </div>
</template>

<script>
import { XInput, Group, XButton, Cell, XHeader, Badge, Flexbox, FlexboxItem, Selector } from 'vux'
import Uploader from 'vux-uploader'
export default {
  name: 'setting',
  data () {
    return {
      userInfo: [],
      username: '',
      userImgSrc: '',
      images: []
    }
  },
  components: {
    XInput,
    XButton,
    Group,
    Cell,
    XHeader,
    Badge,
    Flexbox,
    FlexboxItem,
    Selector,
    Uploader
  },
  mounted () {
    this.init()
  },
  methods: {
    quitLogin () {
      sessionStorage.clear()
      this.$router.go(0)
      this.$router.push('/login')
    },
    init () {
      let getinfo = sessionStorage.getItem('userInfo')
      this.userInfo = JSON.parse(getinfo)
      this.username = this.userInfo.username
      this.userImgSrc = this.userInfo.userimg
    },
    tijiao () {
      alert(1)
    }
  }
}
</script>

<style scoped>
    .setting{
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        z-index: 1009;
        min-height: 29rem;
    }
    .x-header_fixed{
        background-color:#fff;
        width: 100%;
        position: fixed;
        z-index: 999
    }
    .quit_btn{
        margin-top: 50px;
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
        background: url("../../../static/userimg/defauituser.png") no-repeat;
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
        background: url("../../assets/demo/zblogo.png");
        background-size: contain;
    }
</style>
