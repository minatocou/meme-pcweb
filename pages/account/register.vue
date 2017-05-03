<template>
  <div class="reg-wrapper">
    <img src="/img/testlogin.jpg" alt="">
    <div class="reg-container">
      <p class="title">注册MEMEBOX帐号</p>
      <a href="/account/login" class="go-login">立即登录>></a>
      <div class="error">{{errormsg}}</div>
      <form class="reg-form">
        <ul>
          <li><input type="text" maxlength="50" placeholder="请输入有效手机号码" v-model="formUserName" @focus="clearerror"></li>
          <li><input type="password" minlength="6" maxlength="16" placeholder="请输入6~16位密码" v-model="formPassWord" @focus="clearerror"></li>
          <li><input type="text" class="auth-code" maxlength="5" placeholder="请输入验证码" v-model="formAuthCode" @focus="clearerror"><button class="sendCode"@click.prevent="clickable?getcode():sth()">发送验证码</button></li>
          <li class="reg-sub"><input type="submit" @click.prevent="clickable?register():sth()" value="注册"></li>
        </ul>
      </form>
      <div class="third-reg">
        <span>第三方账号登录：</span>
        <a id="wechat" href=""></a>
        <a id="weibo" href=""></a>
        <a id="qq" href=""></a>
      </div>
    </div>
  </div>
</template>

<script>
import common from '../../service/common'
import axios from 'axios'

export default {
  layout: 'login',
  head: {
      link: [
          {rel: 'stylesheet', href: '/css/account/reg.css'}
      ]
  },
  data (context) {
    return {
      name: 'reg page',
      errormsg: null,
      clickable: 1,
      formUserName: '',
      formPassWord: '',
      formAuthCode: ''
    }
  },
  methods: {
    getcode () {
      let $this = this
      $this.clickable = 0
      let username = this.formUserName
      axios.post('/api/authcode', {username})
      .then(function(res){
        $this.clickable = 1
        $this.errormsg = res.data.msg
      })
      .catch((error) => {
        if (error.response.status === 401) {
          throw new Error('Bad credentialssss')
        }
      })
    },
    register () {
      let $this = this
      $this.clickable = 0
      let username = this.formUserName
      let password = this.formPassWord
      let authcode = this.formAuthCode
      let now = new Date().getTime()
      let pwd = common.base64(password + now + '')
      let header = { headers: { 'nowdate': now }}
      axios.post('/api/register', {username, pwd, authcode}, header)
      .then(function(res){
        $this.clickable = 1
        if(res.data.code == '1'){
          $this.formUserName = ''
          $this.formPassWord = ''
          $this.formAuthCode = ''
          location.href = '/my/dashboard'
        }
        else{
          $this.errormsg = res.data.msg
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          throw new Error('Bad credentialssss')
        }
      })
    },
    clearerror () {
      this.errormsg = null
    },
    sth () {
      alert('请不要重复点击，请稍候或者刷新页面后再试')
    }
  }
}
</script>
