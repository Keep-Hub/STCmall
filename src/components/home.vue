<template>
    <div class="home">
        <div>
            <div class="home_nav bg_white">
                <h3>合众e贷</h3>
                <div class="home_nav_swiper">
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
                </div>
                <div class="home_nav_info">
                    <flexbox>
                        <flexbox-item><div class="flex-wrap"><img src="../assets/demo/msgwrap.png" alt=""><p>信息批漏</p></div></flexbox-item>
                        <flexbox-item><div class="flex-wrap"><img src="../assets/demo/signwrap.png" alt=""><p>签到领红包</p></div></flexbox-item>
                        <flexbox-item><div class="flex-wrap"><img src="../assets/demo/invitewrap.png" alt=""><p>邀友奖励</p></div></flexbox-item>
                        <flexbox-item><router-link to="/coinmall"><div class="flex-wrap"><img src="../assets/demo/stroewrap.png" alt=""><p>粽币商城</p></div></router-link></flexbox-item>
                    </flexbox>
                </div>
                <hr size="1"/>
                <div class="nav_marquee">
                    <div style="float: left; margin-right: 0.56rem">
                        <img src="../assets/demo/trumpet.png" alt="" >
                    </div>
                    <div style="float: left; color: #8e9399">
                        <marquee :interval="3500">
                            <marquee-item style="font-size: 0.72rem;" v-for="i in 5" :key="i" @click.native="onClick(i)">{{('活动期间，新用户注册即送2018元红包~')}}</marquee-item>
                        </marquee>
                    </div>
                </div>
            </div>
            <div class="rob_ticket bg_white clear_fix">
                <div class="rob_ticket-left">
                    <p>每天10点<span style="color: #f76432">限时抢券</span></p>
                    <span style="color: #999999; font-size: 0.62rem;">加息券、提现券每天抢</span>
                </div>
                <span class="rob_ticket-right">
                    <img src="../assets/demo/robticket.png" alt="">
                </span>
            </div>
            <div class="interest clear_fix bg_white">
                <div class="interest_title">
                    <span class="it_left">新手自盈存Plus30天</span>
                    <span class="it_right">新手/ 限投一次</span>
                </div>
                <flexbox style="margin-top: 0.56rem">
                    <flexbox-item>
                        <div class="interest_left">
                            <p class="percent fs1">
                                8<span class="fs3">%+3%</span>
                            </p>
                            <p class="rate">
                                <span>约定年化利率</span>
                            </p>
                        </div>
                    </flexbox-item>
                    <flexbox-item style="position: relative">
                        <div class="interest_center">
                            <p style="font-size: 0.82rem">30天</p>
                            <p class="rate">锁定期</p>
                        </div>
                    </flexbox-item>
                    <flexbox-item>
                        <div class="interest_right">
                                <p>去出借</p>
                        </div>
                    </flexbox-item>
                </flexbox>
            </div>
            <div class="interest clear_fix bg_white">
                <div class="interest_title">
                    <span class="it_left">新手自盈存Plus90天</span>
                    <span class="it_right">新手/ 限投一次</span>
                </div>
                <flexbox style="margin-top: 0.56rem">
                    <flexbox-item>
                        <div class="interest_left">
                            <p class="percent fs1">
                                9.5<span class="fs3">%+2.5%</span>
                            </p>
                            <p class="rate">
                                <span>约定年化利率</span>
                            </p>
                        </div>
                    </flexbox-item>
                    <flexbox-item style="position: relative">
                        <div class="interest_center">
                            <p style="font-size: 0.82rem">90天</p>
                            <p class="rate">锁定期</p>
                        </div>
                    </flexbox-item>
                    <flexbox-item>
                        <div class="interest_right">
                                <p>去出借</p>
                        </div>
                    </flexbox-item>
                </flexbox>
            </div>
            <div class="platform bg_white clear_fix">
                <div class="platform_left">
                    <p class="platform_left_title">合众e贷平台数据</p>
                    <p class="platform_left_info">累计投资 &nbsp;<span>55亿1111万3194元</span></p>
                </div>
                <div class="platform_right"><img src="../assets/demo/platform.png" alt=""></div>
            </div>
            <div style="width: 100%; padding: 40px 0 60px 0;">
                <div class="home_footer clear_fix">
                    <img src="../assets/demo/draw.png" alt="">
                    <p>&nbsp;&nbsp;银行存管已接入, 资金隔离更安全</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Badge, Swiper, Flexbox, FlexboxItem, Marquee, MarqueeItem } from 'vux'
const bList = [
  require('../assets/demo/banner1.png'),
  require('../assets/demo/yaoyou.png'),
  require('../assets/demo/shaichujie.png')
]
const baseList = bList.map((item, index) => ({
  url: 'www.baidu.com',
  img: item
}))
export default {
  name: 'home',
  components: {
    Badge,
    Swiper,
    Flexbox,
    FlexboxItem,
    Marquee,
    MarqueeItem
  },
  data () {
    return {
      demo01_list: baseList,
      demo01_index: 0
    }
  },
  methods: {
    demo01_onIndexChange (index) {
      this.demo01_index = index
    },
    onClick (i) {
      console.log(i)
    }
  }
}
</script>

<style scoped>
    .clear_fix{
        clear:both;
        overflow: hidden;
    }
    .home{
        width: 100%;
        margin-bottom: 50px;
        position: relative;
        background-color: #f5f5f5;
        z-index: 1000;
    }
    .bg_white{
        background-color: white;
        padding: 0.3rem 0.56rem;
    }
    .home_nav{
        padding: 0.3rem 0.56rem;
    }
    .home_nav > h3{
        font-size: 0.9rem;
        text-align: center;
        color: #2e353d;
        font-weight: bold;
        padding: 0.3rem 0 0.7rem 0;
    }
    .bd_radius{
        border-radius: 0.3rem!important;
    }
    .flex-wrap {
        text-align: center;
        background-clip: padding-box;
    }
    .home_nav_info{
        padding: 1rem 0;
    }
    .home_nav_info .flex-wrap > img{
        width: 1.75rem;
        height: 1.75rem;
    }
    .home_nav_info .flex-wrap > p{
        color: #37394d;
        font-size: 0.62rem;
        text-align: center;
    }
    hr{
        color: #eeeeee;
        height: 0.02rem;
        border: 0;
        border-top: 0.02rem solid #eeeeee;
    }
    .nav_marquee{
        margin: 0.5rem  0 0 0;
        overflow: hidden;
    }
    .nav_marquee img{
        width: 1rem;
        height: 1rem;
    }
    .rob_ticket{
        margin: 0.56rem 0;
        padding: 1rem 0.56rem;
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
    .interest{
        padding: 0.72rem 0.56rem;
        margin-bottom: 0.56rem;
    }
    .interest_title{}
    .interest_title .it_left{
        font-size: 0.88rem;
        color: #2e353d;
        font-weight: 600;
        margin-right: 0.83rem;
    }
    .interest_title .it_right{
        font-size: 0.72rem;
        color: #2381f9;
        padding: 0.05rem 0.22rem;
        border: 0.05rem solid #2381f9;
        background-color: #e8f2ff;
    }
    .fs1{
        font-size: 1.5rem;
    }
    .fs3{
        font-size: 0.92rem;
        color: #f76432;
    }
    .interest_left > .percent{
        color: #f76432 ;
        font-family: din-bold;
        font-weight: 600;
    }
    .rate{
        color: #8e9399;
        font-size: 0.75rem;
        line-height: 1.1rem;
    }
    .interest_center{
       margin: 0 0 -0.76rem 2rem;
    }
    .interest_right{
        float: right;
        margin: 0 0 -1.2rem 0;
    }
    .interest_right > p{
        width: 4.6rem;
        height: 1.36rem;
        font-size: 0.79rem;
        background-color: #2381f9;
        border-radius: 0.83rem;
        line-height: 1.36rem;
        color: white;
        text-align: center;
    }
    .platform{
        padding: 0.56rem;
    }
    .platform_left{
        float: left;
        padding-top: 0.68rem;
    }
    .platform_right{
        float: right;
    }
    .platform_right > img{
        width: 5rem;
        height: 4.16rem;
    }
    .platform_left_title{
        color: #2e353d;
        font-size: 1rem;
        font-weight: bold;
        padding-bottom:0.32rem;
    }
    .platform_left_info{
        color: #8e9399;
        font-size: 0.78rem;
    }
    .platform_left_info > span{
        color: #2381f9;
    }
    .home_footer{
        position: absolute;
        background-color: #f5f5f5;
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
