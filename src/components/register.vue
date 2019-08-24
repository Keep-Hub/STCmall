<template>
    <div class="register">
        <div class="register_main">
            <div class="register_title">
                欢迎注册合众e贷
            </div>
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
                <x-input placeholder="请输入验证码" class="mg_top20" :max="6" :show-clear="false" style="font-size: 0.72rem; height: 0.8rem">
                    <x-button
                            slot="right"
                            mini
                            :gradients="['#19D5FD', '#1D62F0']"
                            style="margin: 0"
                            v-show="sendAuthCode" class="auth_text auth_text_blue" @click.native="getAuthCode"
                    >发送验证码</x-button>
                    <x-button
                            slot="right"
                            type="default"
                            mini
                            style="margin: 0"
                            v-show="!sendAuthCode"
                    >{{auth_time}}秒后重发</x-button>
                </x-input>
                <x-input
                        :type="this.registration_data.pwdType"
                        v-model="loginForm.password"
                        class="mg_top20"
                        :min= '6'
                        :max= '16'
                        :is-type="bepsd"
                        placeholder="设置登录密码，6-20位数字+字母组合"
                        style="font-size: 0.72rem; height: 0.8rem"
                        :show-clear="false"
                ></x-input>
                <img :src="this.registration_data.src" @click="changeType()" class="eyes_img" />
                <x-button
                        :gradients="['#1D62F0', '#19D5FD']" style="margin-top: 2.78rem"
                        action-type="submit"
                        @click.native="submit()"
                >注册</x-button>
                <toast
                        v-model="userInt"
                        type="text"
                        :time="2500"
                        is-show-mask
                        text="用户名已存在！"
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
                <toast
                        v-model="showPositionValue"
                        type="text"
                        :time="2500"
                        is-show-mask
                        text="注册失败！请确认用户名是否存在"
                        :position="position"
                        width="80%"
                ></toast>
            </div>
        </div>
        <div class="register_bottom">
            <router-link class="sign_up" to="/login">立即登录</router-link>
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
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      position: 'bottom',
      showPositionValue: false,
      sendAuthCode: true, /* 布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */
      auth_time: 120, /* 倒计时 计数器 */
      auth_timetimer: '',
      msg: '',
      showUserNull: false,
      userInt: false,
      showPwdNull: false,
      registration_data: {
        pwdType: 'password',
        src: require('../assets/demo/ico_eye_close.png')
      }
    }
  },
  mounted () {
  },
  inject: ['reload'],
  methods: {
    // 密码可见切换changeType ()
    changeType () {
      this.registration_data.pwdType = this.registration_data.pwdType === 'password' ? 'text' : 'password'
      this.registration_data.src = this.registration_data.src === require('../assets/demo/ico_eye_close.png') ? require('../assets/demo/ico_eye_open.png') : require('../assets/demo/ico_eye_close.png')
    },
    submit (position) {
      let user = /^[1][3,4,5,7,8][0-9]{9}$/
      let pwd = /^[0-9a-zA-Z]{6,16}$/
      let _this = this
      let usernamea = _this.loginForm.username
      let passworda = _this.loginForm.password
      if (user.test(usernamea) && pwd.test(passworda)) {
        let _this = this
        this.$http.post('api/stcport/register.php', {
          emulateJSON: true,
          username: _this.loginForm.username,
          password: md5(_this.loginForm.password)
        }).then(response => {
          if (this.msg === 'no') {
            alert('注册成功，点击确认返回登录页面！')
            this.reload()
            this.$router.push('/login')
          } else {
            this.position = position
            this.showPositionValue = true
          }
        }, response => {
          if (this.msg === 'yes') {
            this.position = position
            this.userInt = true
          }
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
    // 发送手机验证码倒计时 getAuthCode ()
    getAuthCode () {
      this.sendAuthCode = false
      this.auth_time = 60
      this.auth_timetimer = setInterval(() => {
        this.auth_time--
        if (this.auth_time <= 0) {
          this.sendAuthCode = true
          clearInterval(this.auth_timetimer)
        }
      }, 1000)
    },
    bephone (value) {
      let reg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (reg.test(value)) {
        return {valid: true}
      } else {
        return {valid: false, msg: '请输入正确的手机号'}
      }
    },
    bepsd (value) {
      let reg = /^[0-9a-zA-Z]{6,16}$/
      if (reg.test(value)) {
        return {valid: true}
      } else {
        return {valid: false, msg: '请输入正确的密码格式'}
      }
    },
    blurOut (position) {
      let reg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (reg.test(this.loginForm.username)) {
        let _this = this
        this.$http.post('api/stcport/login.php', {
          emulateJSON: true,
          username: _this.loginForm.username
        }).then(response => {
          let msg = response.data.msg
          this.msg = response.data.msg
          console.log(msg)
          if (msg === 'yes') {
            this.position = position
            this.userInt = true
          } else {
          }
        }, response => {
        })
      }
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
    .register{
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        z-index: 1009;
        min-height: 29rem;
    }
    .register_title{
        font-size: 1.12rem;
        text-align: left;
        font-weight: bold;
        padding: 0.48rem 0 0 1.2rem;
        margin-top: 1.12rem;
        color: #334455;
    }
    .eyes_img{
        width: 1rem;
        height: 1rem;
        position: absolute;
        top: 8.2rem;
        right: 1.6rem;
    }
    .register_bottom{
        width: 100%;
        text-align: center;
        position: absolute;
        bottom: 2rem;
    }
    .sign_up{
        font-size: 0.68rem;
        color: #2381f9;
        margin: 0 0.28rem;
    }
</style>
