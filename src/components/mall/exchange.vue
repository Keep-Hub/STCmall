<template>
    <div class="exchange">
        <scroller
           use-pullup
           :pullup-config="pullupDefaultConfig"
           @on-pullup-loading="loadMore"
           lock-x
           :bounce=false
           ref="scrollerBottom"
           style="color: #686868;font-size: 0.66rem;"
        >
            <div class="scrollPt">
                <div class="activity" v-for="(item, index) in list" :key="index">
                    <span class="list">{{item.activity_title}}</span>
                    <p class="list">{{item.activity_date}}</p>
                    <img :src="item.activity_img" alt="">
                </div>
                <load-more v-show="nomore" :show-loading="false" :tip="('已经全部加载完啦')" background-color="#fbf9fe"></load-more>
            </div>
        </scroller>
        <div v-transfer-dom>
            <loading :show="show1" :text="text1"></loading>
        </div>
    </div>
</template>

<script>
import { Scroller, LoadMore, Loading, XButton, TransferDomDirective as TransferDom } from 'vux'
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
export default {
  directives: {
    TransferDom
  },
  name: 'exchange',
  components: {
    Scroller,
    LoadMore,
    Loading,
    XButton
  },
  data () {
    return {
      list: [],
      pullupDefaultConfig: pullupDefaultConfig,
      currentPage: 1,
      nomore: false,
      show1: false,
      text1: 'Processing'
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.scrollerBottom.reset({top: 0})
    })
    this.loadMore()
  },
  methods: {
    fetchData (cb) {
      this.$http.get('../../static/activity.json').then(response => {
        console.log(response.data.result.loadingMore)
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
          this.list = this.list.concat(this.getPageData(a, 3, data.result.loadingMore)) // 插入每次添加的数据
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
    },
    showLoading () {
      this.$vux.loading.show({
        text: 'Loading'
      })
      setTimeout(() => {
        this.$vux.loading.hide()
      }, 2000)
    }
  }
}
</script>

<style scoped>
    .exchange{
        background-color: #f5f5f5;
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 1003;
    }
    .scrollPt{
        width: 100%;
        height: 100%;
        overflow:auto
    }
    .activity{
        padding: 0.48rem 4%;
        margin-top: 0.56rem;
        background-color: white;
    }
    .activity img{
        width: 100%;
        height: 100%;
    }
    .activity span{
        font-size: 0.86rem;
        font-weight: 500;
    }
    .activity p{
        font-size: 0.66rem;
        padding: 0.28rem 0;
        color: #686868;
    }
</style>
