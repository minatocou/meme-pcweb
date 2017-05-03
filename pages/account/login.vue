<template>
  <div class="login-wrapper">
    <img src="/img/testlogin.jpg" alt="">
    <div class="login-container">
      <p class="title">登录MEMEBOX帐号</p>
      <a href="/account/register" class="go-reg">立即免费注册>></a>
      <div class="error">{{errormsg}}</div>
      <form @submit.prevent="clickable?login():sth()" class="login-form">
        <ul>
          <li><input type="text" maxlength="50" placeholder="请输入账号" v-model="formUserName" @focus="clearerror"></li>
          <li><input type="password" maxlength="16" placeholder="请输入密码" v-model="formPassWord" @focus="clearerror"></li>
          <li class="login-sub"><input type="submit" value="登录"></li>
        </ul>
      </form>
      <a href="/account/forget" class="forget">忘记密码?</a>
      <div class="third-login">
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
          {rel: 'stylesheet', href: '/css/account/login.css'}
      ]
  },
  data () {
    return {
      formUserName: '',
      formPassWord: '',
      errormsg: null,
      clickable: 1
    }
  },
  methods: {
    login () {
      let $this = this
      $this.clickable = 0
      let username = this.formUserName
      let password = this.formPassWord
      if(username && password){
        let now = new Date().getTime()
        let pwd = common.base64(password + now + '')
        let access_token = localStorage.token || ''
        let header = { headers: {
          'nowdate': now
        }}
        axios.post('/api/login', {username, pwd}, header)
        .then(function(res){
          $this.clickable = 1
          if(res.data.code == '1'){
            $this.formUserName = ''
            $this.formPassWord = ''
            location.href = document.referrer || '/my/dashboard'
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
      }
      else{
        $this.errormsg = '请输入用户名和密码'
      }
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
