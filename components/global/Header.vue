<template>
  <header class="Header">
    <div id="head-container">
    	<div class="head-top-container">
    		<ul class="link-l">
    			<li><i class="icon-welcome-white"></i>100%韩国正品美美箱</li>
    			<li><i class="icon-sign-white"></i><span class="sign-in" @click="$store.dispatch('showDownload')">[每日签到]</span>每月累计签到满10次，即可获得5蜜豆</li>
    		</ul>
    		<ul class="link-r">
                <template v-if="!$store.state.isLoggedIn">
                    <li><a href="/account/login">登录</a></li>
                    <li><a href="/account/register">注册</a></li>
                </template>
                <template v-else>
                    <li><a @click="logout">退出</a></li>
                    <li><a href="/my/dashboard"><i class="meme-icon"></i>我的MEMEBOX</a></li>
                </template>
    			<li>|</li>
    			<li class="app-download">
    				<a href="javascript:void(0)"><i class="icon-phone-white"></i>手机APP</a>
    				<div class="app-qrcode">
						<div class="qr-angel"></div>
						<div class="qr-code"></div>
    				</div>
    			</li>
    			<li @click="$store.dispatch('conCS')"><i class="icon-service-white" ></i>联系客服</li>
    		</ul>
    	</div>
    	<div class="head-main-container">
    		<div class="logo-wrapper">
    			<h1 class="logo">
	    			<a href="/">
	    				<img src="/img/header/home_logo.png" alt="">
	    			</a>
	    		</h1>
    		</div>
    		<div class="search-wrapper">
                <el-input
                  icon="search"
                  v-model="searchItem"
                  :on-icon-click="handleIconClick">
                </el-input>
    		</div>
    	</div>
    </div>
    <div v-if="$store.state.showDCode" class="download-qr-wrapper">
        <div class="dq-container">
            <div class="title">下载APP，签到赢蜜豆</div>
            <i class="close-dq" @click="$store.dispatch('showDownload')">×</i>
            <i class="dq-code"></i>
            <p>每月累计签到满10次，即可获得5蜜豆</p>
        </div>
    </div>
  </header>
</template>
<script>
import axios from 'axios'
export default{
    head: {
        link: [
          {rel: 'stylesheet', href: 'https://unpkg.com/element-ui/lib/theme-default/index.css'}
        ],
        script: [
            { src: 'http://dl.ntalker.com/js/xn6/ntkfstat.js?siteid=kf_9366'}
        ]
    },
    data (){
        return {
            searchItem: ''
        }
    },
    methods: {
        logout () {
          axios.post('/api/logout').then(function(res){
            if(res.data.code == '1'){
                location.href = location.href || '/'
            }
          })
        },
        handleIconClick(ev) {
          location.href = '/search/result?query=' + this.searchItem
        }
    },
    mounted () {
        if(process.BROWSER_BUILD){
            this.$nextTick(function () {
                window.NTKF_PARAM = {
                    siteid:"kf_9366",
                    settingid:"kf_9366_1469771719610",
                    uid:"",
                    uname:"",
                    isvip:0,
                    userlevel:1,
                }
            })
        }
    }
}
</script>
