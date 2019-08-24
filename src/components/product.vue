<template>
    <div class="product">
        <x-header :left-options="{backText: ''}" class="x-header_fixed" >产品</x-header>
        <div class="product_body">
            <div class="activity_title"></div>
            <div class="activity_tab">
                <div class="activity_tab_title">
                    <tab :line-width="2" custom-bar-width="30px" bar-active-color="#367fe5" active-color='#367fe5'>
                        <tab-item selected @on-item-click="tabClick(0)" >活动</tab-item>
                        <tab-item  @on-item-click="tabClick(1)">视频</tab-item>
                        <tab-item  @on-item-click="tabClick(2)">领券</tab-item>
                        <tab-item  @on-item-click="tabClick(3)">促销</tab-item>
                    </tab>
                    <div>
                        <!-- <keep-alive></keep-alive> -->
                        <div v-show="activeIndex === 0" class="tab_info">
                            <scroller
                                    use-pullup
                                    :pullup-config="pullupDefaultConfig"
                                    @on-pullup-loading="loadMore"
                                    lock-x
                                    ref="scrollerBottom"
                                    height=""
                                    style="color: #686868;font-size: 0.66rem;"
                            >
                                <div>
                                    <div class="activity" v-for="(item, index) in activity_loading" :key="index">
                                        <span >{{item.activity_title}}</span>
                                        <p>{{item.activity_date}}</p>
                                        <img :src="item.activity_img" alt="">
                                    </div>
                                    <load-more v-show="nomore" :show-loading="false" :tip="('已经全部加载完啦')" background-color="#fbf9fe" style="padding-bottom: 1rem"></load-more>
                                </div>
                            </scroller>
                        </div>
                        <div v-show="activeIndex === 1" class="tab_info">
                            <div class="activity_Invest">
                                <span>拜年视频｜新年好，合众e贷给您拜年啦！</span>
                                <p>2019-02-03</p>
                                <iframe frameborder="0" src="https://v.qq.com/txp/iframe/player.html?vid=s0833el33a7"  width="100%"></iframe>
                            </div>
                        </div>
                        <div v-show="activeIndex === 2" class="tab_info">
                            <div class="activity">
                                <span>双旦嘉年华 好友助力一起赚</span>
                                <p>活动时间：2018年12月10日-2019年01月04日</p>
                                <img src="../assets/demo/carnival.png" alt="">
                            </div>
                        </div>
                        <div v-show="activeIndex === 3" class="tab_info">
                            <div class="activity">
                                <span>投资就送iPhone XS Max256G</span>
                                <p>活动时间：12月3日-12月31日</p>
                                <img src="../assets/demo/investinXS.png" alt="">
                            </div>
                            <div class="activity">
                                <span>投资就送iPhone XS Max256G</span>
                                <p>活动时间：12月3日-12月31日</p>
                                <img src="../assets/demo/investinXS.png" alt="">
                            </div>
                            <div class="activity">
                                <span>投资就送iPhone XS Max256G</span>
                                <p>活动时间：12月3日-12月31日</p>
                                <img src="../assets/demo/investinXS.png" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {XHeader, Tab, TabItem, LoadMore, Scroller} from 'vux'
// import axios from 'axios'
const pullupDefaultConfig = {
  content: '上拉加载更多',
  pullUpHeight: 60,
  height: 250,
  autoRefresh: false,
  downContent: '加载中...',
  upContent: '上拉加载更多',
  loadingContent: '加载中...',
  clsPrefix: 'xs-plugin-pullup-'
}
export default{
  name: 'product',
  data () {
    return {
      isFixed: false,
      index: 0,
      activeIndex: 0,
      activity_loading: [],
      pullupDefaultConfig: pullupDefaultConfig,
      currentPage: 1,
      nomore: false
    }
  },
  components: {
    XHeader,
    Tab,
    TabItem,
    LoadMore,
    Scroller
  },
  mounted () {
    // window.addEventListener('scroll', this.handleScroll)
    this.$nextTick(() => {
      this.$refs.scrollerBottom.reset({top: 0})
    })
    this.loadMore()
  },
  methods: {
    tabClick (index) {
      this.activeIndex = index
    },
    fetchData (cb) {
      this.$http.get('../../static/activity.json').then(response => {
        this.$nextTick(() => {
          this.$refs.scrollerBottom.reset()
        })
        cb(response.data)
      })
    },
    loadMore () {
      this.fetchData(data => {
        let a = this.currentPage++
        if (a - 1 < Math.ceil(data.result.loadingMore.length / 3)) { // 计算出有多少页然后判断执行几次
          this.activity_loading = this.activity_loading.concat(this.getPageData(a, 3, data.result.loadingMore)) // 插入每次添加的数据
          this.$refs.scrollerBottom.donePullup()
        } else {
          this.$refs.scrollerBottom.disablePullup()
          this.nomore = true
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
    .product{
        width: 100%;
        background-color: #f5f5f5;
        position: relative;
        margin-bottom: 90px;
        z-index: 1000;
    }
    .x-header_fixed{
        background-color:#fff;
        width: 100%;
        position: fixed;
        z-index: 999
    }
    .product_body{
        position: relative;
        top: 45px;
        width: 100%;
    }
    .flex-demo p {
        color: #2e353d;
        font-size: 0.72rem;
        text-align: center
    }
    .flex-demo img {
        width: 100%;
        height: 100%;
    }
    .flex-demo span {
        color: #e3b87b;
        font-size: 0.66rem;
    }
    .activity_title{
        width: 100%;
        background-color: white;
        border-bottom: 0.05rem #f5f5f5 solid;
    }
    .activity_title p{
        text-align: center;
        padding: 0.84rem 0;
    }
    .activity_tab,.activity_tab_title{
        width: 100%;
        background-color: transparent;
    }
    .tab_info{
        background-color: #efefef;
    }
    .tab_info > div >img{
        border-radius: 5px;
        overflow: hidden;
    }
    .activity,.activity_Invest{
        padding: 0.96rem 4%;
        margin-top: 0.56rem;
        background-color: white;
        width: 92%;
    }
    .activity img{
        width: 100%;
        height: 100%;
    }
    .activity span,.activity_Invest span{
        font-size: 0.86rem;
        font-weight: 500;
        color: #2e353d;
    }
    .tab_info > div > img{
        width: 100%;
        height: 100%;
    }
    .activity p, .activity_Invest p{
        font-size: 0.66rem;
        padding: 0.28rem 0;
        color: #686868;
    }
</style>
