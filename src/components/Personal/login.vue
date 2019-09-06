<template>
    <div class="login">
        <div class="login_main">
            <div class="margin_center">
                <img src="../../assets/demo/loginlogo.png" alt="" class="login_logo">
            </div>
            <!--<form action="" class="login_form">
                <input type="text" placeholder="请输入手机号码"/>
                <input type="password" placeholder="请输入密码"/>
            </form>-->
            <div style="position: relative; padding: .42667rem 1.28rem 0;">
                    <x-input
                            type="text"
                            :is-type="bephone"
                            placeholder="请输入手机号码"
                            :max= '11'
                            v-model="loginForm.username"
                            class="mg_top20"
                            :show-clear="false"
                            style="font-size: 0.72rem; height: 0.8rem"
                            @on-blur="blurOut"
                    ></x-input>
                    <x-input
                            :type="this.registration_data.pwdType"
                            v-model="loginForm.password"
                            class="mg_top20"
                            :min= '6'
                            :max= '16'
                            style="font-size: 0.72rem"
                            placeholder="请输入密码"
                            :show-clear="false"
                    ></x-input>
                    <img :src="this.registration_data.src" @click="changeType()" class="eyes_img" />
                    <x-button
                            :gradients="['#1D62F0', '#19D5FD']" style="margin-top: 2.78rem"
                            action-type="submit"
                            @click.native="submit('top')"
                            type="default"
                    >登录</x-button>
                <toast
                        v-model="showPositionValue"
                        type="text"
                        :time="2500"
                        is-show-mask
                        text="登录失败,请确认用户名密码是否正确"
                        :position="position"
                        width="80%"
                ></toast>
                <toast
                        v-model="showUserNull"
                        type="text"
                        :time="2000"
                        is-show-mask
                        text="用户名不能为空"
                        :position="position"
                        width="80%"
                ></toast>
                <toast
                        v-model="showPwdNull"
                        type="text"
                        :time="2000"
                        is-show-mask
                        text="密码不能为空"
                        :position="position"
                        width="80%"
                ></toast>
            </div>
        </div>
        <div class="login_bottom">
            <router-link class="forget_psw" to="/changepwd">忘记密码</router-link>
            <router-link class="sign_up" to="/register">立即注册</router-link>
        </div>
    </div>
</template>

<script>
import { XInput, Group, XButton, Cell, Toast } from 'vux'
import md5 from 'js-md5'
export default {
  name: 'login',
  components: {
    XInput,
    XButton,
    Group,
    Cell,
    Toast
  },
  inject: ['reload'],
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      usersInfo: [],
      loginSuccee: false,
      position: 'default',
      showPositionValue: false,
      showUserNull: false,
      showPwdNull: false,
      registration_data: {
        pwdType: 'password',
        src: require('../../assets/demo/ico_eye_close.png')
      }
    }
  },
  methods: {
    // 密码可见切换changeType ()
    changeType () {
      this.registration_data.pwdType = this.registration_data.pwdType === 'password' ? 'text' : 'password'
      this.registration_data.src = this.registration_data.src === require('../../assets/demo/ico_eye_close.png') ? require('../../assets/demo/ico_eye_open.png') : require('../../assets/demo/ico_eye_close.png')
    },
    submit (position) {
      let user = /^[1][3,4,5,7,8][0-9]{9}$/
      let pwd = /^[0-9a-zA-Z]{6,16}$/
      let _this = this
      let usernamea = _this.loginForm.username
      let passworda = _this.loginForm.password
      if (user.test(usernamea) && pwd.test(passworda)) {
        this.$http.post('api/stcport/resjson.php', {
          emulateJSON: true,
          username: _this.loginForm.username,
          password: md5(_this.loginForm.password)
        }).then(response => {
          let success = response.data.code// 得到的code来判断是否能登录
          let tokens = response.data.token// 获取token值
          this.usersInfo = JSON.stringify(response.data.id)
          console.log(JSON.stringify(response.data.id))
          console.log(response.data.code)
          if (success === '1' && usernamea !== '' && passworda !== '') {
            console.log('登录成功')
            sessionStorage.setItem('token', tokens)
            sessionStorage.setItem('userInfo', this.usersInfo)// 存入用户信息到sessionStorage
            if (this.$route.query.redirect) {
              if (this.$route.query.redirect === '/setting') {
                this.$router.push('/me')
              } else {
                this.$router.push(this.$route.query.redirect)
              }
            } else {
              this.$router.push('/me')
            }
            this.loginSuccee = true
          } else {
            console.log('登录失败')
            this.position = position
            this.showPositionValue = true
          }
        }, response => {
          this.position = position
          this.showPositionValue = true
        })
      } else if (usernamea === '') {
        this.position = position
        this.showUserNull = true
      } else if (passworda === '') {
        this.position = position
        this.showPwdNull = true
      } else {
        this.position = position
        this.showPositionValue = true
      }
    },
    bephone: function (value) {
      let reg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (reg.test(value)) {
        return {valid: true}
      } else {
        return {valid: false, msg: '请输入正确的手机号'}
      }
    },
    blurOut: function () {
    }
  }
}
</script>

<style scoped>
    .mg_top20{
        margin-top: 1.12rem;
        border-bottom: 0.05rem solid #f7f7f7;
        font-size: 0.7rem;
        padding: 0.56rem 2rem 0.56rem 0;
    }
    .login{
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        z-index: 1009;
        min-height: 29rem;
    }
    .login_main{
        text-align: center;
    }
    .login_logo{
        width: 10.6rem;
        height: auto;
        margin: 1.06667rem 0 0;
    }
    .eyes_img{
        width: 1rem;
        height: 1rem;
        position: absolute;
        top: 5.5rem;
        right: 1.6rem;
    }
    .login_bottom{
        width: 100%;
        text-align: center;
        position: absolute;
        bottom: 2rem;
    }
    .forget_psw, .sign_up{
        position: relative;
        font-size: 0.68rem;
        color: #2381f9;
        margin: 0 0.28rem;
    }
</style>
