<template>
  <div class="my-nav">
    <div class="my-meme"><span><a href="/my/dashboard">我的美美箱</a></span></div>
    <div class="my-center"><span>个人中心</span></div>
    <div class="my-nav-list">
      <ul>
        <li><a href="/my/orderlist">我的订单</a></li>
        <li><a href="/my/wishlist">我的收藏</a></li>
        <li><a href="/my/voucher">我的优惠券</a></li>
        <li><a href="/my/melevel">我的蜜米等级</a></li>
        <li><a href="/my/mecoin">我的蜜豆</a></li>
        <li><a href="/my/userinfo">个人信息</a></li>
        <li><a href="/my/address">收货地址</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
import jq from 'jquery'

export default {
  data () {
    return {
    }
  },
  head: {
    link: [
      {rel:'stylesheet', href: '/common/css/mynav.css'}
    ]
  },
  mounted(){
    if(process.BROWSER_BUILD){
      jq(document).ready(function(jq) {
        jq('.my-nav a').each(function(){
          if(jq(jq(this))[0].href == String(window.location))
          {
            jq(this).addClass('chosen')
          }
        })
      })
    }
  }
}
</script>
