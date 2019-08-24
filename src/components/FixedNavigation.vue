<template>
    <div>
        <div class="fixed_navigation">
            <div class="menu_container">
                <p :class="[rotateShow? 're' : 'go']" class="default" @click.stop="rotate($event)"></p>
                <ul>
                    <li :class="[catapult? 'moveend' : 'movestart']" style="left: -6.6rem; bottom: 0.38rem;">
                        <img src="../assets/demo/return_me.png" alt="" @click="returnHome(1)">
                    </li>
                    <li  :class="[catapult? 'moveend1' : 'movestart']" style="left: -6rem; bottom: 2.8rem;">
                         <img src="../assets/demo/chuizi.png" alt="" @click="returnHome(2)">
                    </li>
                    <li  :class="[catapult? 'moveend2' : 'movestart']" style="left: -4.6rem; bottom: 4.8rem;">
                        <img src="../assets/demo/file.png" alt="" @click="returnHome(3)">
                    </li>
                    <li  :class="[catapult? 'moveend3' : 'movestart']" style="left: -2.4rem; bottom: 6.2rem;">
                        <img src="../assets/demo/Shopping_Cart.png" alt="" @click="returnHome(4)">
                    </li>
                    <li  :class="[catapult? 'moveend4' : 'movestart']" style="left: 0; bottom: 6.8rem;">
                        <img src="../assets/demo/return_home.png" alt="" @click="returnHome(5)">
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'FixedNavigation',
  data () {
    return {
      rotateShow: false,
      catapult: true
    }
  },
  methods: {
    rotate () {
      this.rotateShow = !this.rotateShow
      if (this.rotateShow === true) {
        // console.log('show')
        this.catapult = false
      } else {
        this.catapult = true
        // console.log('hide')
      }
    },
    returnHome (e) {
      if (e === 1) {
        this.$router.push('/me')
      } else if (e === 2) {
        // this.$router.push('')
      } else if (e === 3) {
        // this.$router.push('')
      } else if (e === 4) {
        this.$router.push('/shoppingCart')
      } else {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style scoped>
    .fixed_navigation{
        position: absolute;
        z-index: 1001;
    }
    ul{
        list-style: none;
        z-index: 1002;
        width: 1.9rem;
        height: 1.9rem;
    }
    .menu_container{
        width: 2.5rem;
        height: 2.5rem;
        position: fixed;
        bottom: 5rem;
        right: 0.5rem;
        background-color: white;
        border-radius: 50%;
    }
    .menu_container > p{
        position: absolute;
        width: 1.2rem;
        height: 1.2rem;
        left: 50%;
        top: 50%;
        margin-left: -0.6rem;
        margin-top: -0.6rem;
        z-index: 1005;
    }
   .go {
       background: url("../assets/demo/jiantou.png") no-repeat;
       background-size: 1.2rem 1.2rem;
       animation: rotation 0.3s linear ;
       -moz-animation: rotation 0.3s linear ;
       -webkit-animation: rotation 0.3s linear ;
       -o-animation: rotation 0.3s linear ;
   }
    .default {
        background: url("../assets/demo/jiantou.png") no-repeat;
        background-size: 1.2rem 1.2rem;
    }
    @-webkit-keyframes rotation {
        from {
            transform: rotate(360deg);
        }
        to {
            transform: rotate(0deg);
        }
    }
    .re {
        background: url("../assets/demo/X.png") no-repeat;
        background-size: 1.2rem 1.2rem;
        animation: rotation2 0.3s linear ;
        -moz-animation: rotation2 0.3s linear ;
        -webkit-animation: rotation2 0.3s linear ;
        -o-animation: rotation2 0.3s linear ;
    }
    @-webkit-keyframes rotation2 {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
    ul li{
        background:rgba(0,0,0,.75);
        width: 1.9rem;
        height: 1.9rem;
        border-radius: 50%;
        box-shadow: 1px 1px 5px #6e6e6e;
        position: absolute;
    }
    ul li > img{
        width: 1.2rem;
        height: 1.2rem;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -0.6rem;
        margin-top: -0.6rem;
    }
    .movestart{
         animation: catapult 0.2s linear ;
         animation-fill-mode: forwards;
     }
    .moveend{
        animation: catapultend 0.2s linear ;
        animation-fill-mode: forwards;
    }
    .moveend1{
        animation: catapultend1 0.2s linear ;
        animation-fill-mode: forwards;
    }
    .moveend2{
        animation: catapultend2 0.2s linear ;
        animation-fill-mode: forwards;
    }
    .moveend3{
        animation: catapultend3 0.2s linear ;
        animation-fill-mode: forwards;
    }
    .moveend4{
        animation: catapultend4 0.2s linear ;
        animation-fill-mode: forwards;
    }
    @-webkit-keyframes catapultend {
        0% {
            left: -6.6rem;
            bottom: 0.38rem;
        }
        100% {
            left: 0;
            bottom: 0;
            opacity: 0;
        }
    }
    @-webkit-keyframes catapultend1 {
        0% {
            left: -6rem;
            bottom: 2.8rem;
        }
        100% {
            left: 0;
            bottom: 0;
            opacity: 0;
        }
    }
    @-webkit-keyframes catapultend2 {
        0% {
            left: -4.6rem;
            bottom: 4.8rem;
        }
        100% {
            left: 0;
            bottom: 0;
            opacity: 0;
        }
    }
    @-webkit-keyframes catapultend3 {
        0% {
            left: -2.4rem;
            bottom: 6.2rem;
        }
        100% {
            left: 0;
            bottom: 0;
            opacity: 0;
        }
    }
    @-webkit-keyframes catapultend4 {
        0% {
            left: 0;
            bottom: 6.8rem;
        }
        100% {
            left: 0;
            bottom: 0;
            opacity: 0;
        }
    }
    @-webkit-keyframes catapult {
        0% {
            left: 0;
            bottom: 0;
        }
        100% {
            background:rgba(0,0,0,.75)
        }
    }
</style>
