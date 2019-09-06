<template>
    <div>
        <div v-transfer-dom>
            <loading :show="show1" :text="text1"></loading>
        </div>
    </div>
</template>

<script>
import { Loading, XButton, TransferDomDirective as TransferDom } from 'vux'
export default {
  directives: {
    TransferDom
  },
  name: 'loadings',
  components: {
    Loading,
    XButton
  },
  data () {
    return {
      show1: false,
      text1: 'Loading'
    }
  },
  mounted () {
    this.timer = setInterval(() => {
      console.log(this.$vux.loading.isVisible())
    }, 1000)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  beforeCreate () {
  },
  methods: {
    showLoading () {
      this.$vux.loading.show({
        text: ''
      })
      clearInterval(this.timer)
      setTimeout(() => {
        this.$vux.loading.hide()
      }, 300)
    },
    inste () {
      this.$options.methods.showLoading.bind(this)()
    },
    ceShi () {
      alert(1)
    }
  }
}
</script>

<style scoped>

</style>
