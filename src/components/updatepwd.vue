<template>
    <div class="update_pwd">
        <div>
            <h5 style="text-align: center; margin-top: 0.5rem;font-size: 1rem;color: #2e353d">更改密码</h5>
            <div style="position: relative; padding: .42667rem 1.28rem 0;">
                <x-input
                        v-model="loginForm.password"
                        class="mg_top20"
                        :min= '6'
                        :max= '16'
                        :type="pwd"
                        :is-type="bepwd"
                        placeholder="输入新密码，6-20位数字+字母组合"
                        style="font-size: 0.72rem; height: 0.8rem"
                        :show-clear="false"
                ></x-input>
                <x-input
                        v-model="loginForm.password1"
                        class="mg_top20"
                        :min= '6'
                        :max= '16'
                        :type="pwd"
                        :is-type="bepwd"
                        placeholder="请再次输入新密码"
                        style="font-size: 0.72rem; height: 0.8rem"
                        :show-clear="false"
                ></x-input>
                <x-button
                        :gradients="['#1D62F0', '#19D5FD']" style="margin-top: 2.78rem"
                        action-type="submit"
                        @click.native="submit()"
                >更改密码</x-button>
            </div>
        </div>
    </div>
</template>

<script>
import { XInput, Group, XButton, Cell } from 'vux'
import md5 from 'js-md5'
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
        password: '',
        password1: ''
      },
      pwd: 'password'
    }
  },
  mounted () {
  },
  methods: {
    submit () {
      let pwd = /^[0-9a-zA-Z]{6,16}$/
      let _this = this
      let password = _this.loginForm.password
      let password1 = _this.loginForm.password1
      if (password === '') {
        alert('请输入新密码')
      } else if (password1 === '') {
        alert('请再次输入新密码')
      } else if (password1 !== password) {
        alert('再次输入的密码不一致')
      } else if (pwd.test(password) === pwd.test(password1) && password === password1) {
        this.$http.post('api/stcport/updatepwd.php', {
          emulateJSON: true,
          username: sessionStorage.getItem('upusername'),
          password: md5(_this.loginForm.password1)
        }).then(response => {
          alert('更改密码成功')
          this.$router.go(0)
          this.$router.push('/login')
        }, response => {
        })
      }
    },
    bepwd (value) {
      let reg = /^[0-9a-zA-Z]{6,16}$/
      if (reg.test(value)) {
        return {valid: true}
      } else {
        return {valid: false, msg: '请输入正确的密码格式'}
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
    .update_pwd{
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        z-index: 1009;
        min-height: 29rem;
    }
</style>
