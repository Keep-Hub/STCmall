<template>
    <div>
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
        <div class="box2">
            <p v-for="(i, index) in list" :key="index">占位 {{i.id}}</p>
        </div>
        </scroller>
    </div>
</template>

<script>
import { Previewer, TransferDom, Scroller } from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    Previewer,
    Scroller
  },
  mounted () {
    this.load2()
  },
  methods: {
    fetchData (cb) {
      this.$http.get('../../static/goodsList.json').then(response => {
        console.log(response.data.result.goods)
        cb(response.data)
      })
    },
    load2 () {
      this.fetchData(data => {
        let a = this.currentPage++
        let b = 6
        console.log(data.result.goods)
        if (a - 1 < Math.ceil(data.result.goods.length / b)) { // 计算出有多少页然后判断执行几次
          this.list = this.list.concat(this.getPageData(a, b, data.result.goods)) // 插入每次添加的数据
          console.log(Math.ceil(data.result.goods.length / b))
          console.log(1)
          this.$refs.demo2.donePullup()
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
  },
  data () {
    return {

      list: [],
      currentPage: 1,
      nomore: false,
      pullupConfig2: {
        content: '上拉加载更多',
        downContent: '松开进行加载',
        upContent: '上拉加载更多',
        loadingContent: '加载中...'
      }
    }
  }
}
</script>
