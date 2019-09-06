<template>
    <div class="change_pwd">
        <div>
            <div style="position: relative; padding: .42667rem 1.28rem 0;">
                <x-input
                        type="text"
                        :is-type="bephone"
                        placeholder="请输入手机号码"
                        :max= '11'
                        v-model="loginForm.username"
                        class="mg_top20"
                        :show-clear="false"
                        @on-blur="blurOut"
                        style="font-size: 0.72rem; height: 0.8rem"
                ></x-input>
                <x-input placeholder="请输入验证码" class="mg_top20" :max="6" :show-clear="false" style="font-size: 0.72rem">
                    <x-button
                            slot="right"
                            mini
                            :gradients="['#19D5FD', '#1D62F0']"
                            style="margin: 0;"
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
                <x-button
                        :gradients="['#1D62F0', '#19D5FD']" style="margin-top: 2.78rem"
                        action-type="submit"
                        @click.native="submit()"
                >下一步</x-button>
            </div>
        </div>
    </div>
</template>

<script>
import { XInput, Group, XButton, Cell } from 'vux'
export default {
  name: 'changepwd',
  components: {
    XInput,
    XButton,
    Group,
    Cell
  },
  data () {
    return {
      loginForm: {
        username: ''
      },
      sendAuthCode: true, /* 布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */
      auth_time: 120, /* 倒计时 计数器 */
      auth_timetimer: '',
      msg: ''
    }
  },
  mounted () {
  },
  methods: {
    // 密码可见切换changeType ()
    changeType () {
      this.registration_data.pwdType = this.registration_data.pwdType === 'password' ? 'text' : 'password'
      this.registration_data.src = this.registration_data.src === require('../../assets/demo/ico_eye_close.png') ? require('../../assets/demo/ico_eye_open.png') : require('../../assets/demo/ico_eye_close.png')
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
    },
    submit () {
      if (this.msg === 'yes') {
        sessionStorage.setItem('upusername', this.loginForm.username)
        this.$router.push('/updatepwd')
      } else {
        alert('该账号不存在')
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
    .change_pwd{
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        z-index: 1009;
        min-height: 29rem;
    }
</style>
