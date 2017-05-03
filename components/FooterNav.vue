<template>
  <div id="leftnav-wrapper" class="f-l">
      <div class="leftnav-items">
          <div class="leftnav-title">帮助中心<i class="leftnav-unfold"></i></div>
          <ul>
              <li class="" ><a href="/stapages/problem">常见问题</a><i class="leftnav-sub-unfold"></i>
                  <ul class="left-nav-list">
                      <li><a href="/stapages/problem#problem-shop-proce">购物流程</a></li>
                      <li><a href="/stapages/problem#problem-register">新用户注册</a></li>
                      <li><a href="/stapages/problem#problem-login">登录</a></li>
                      <li><a href="/stapages/problem#problem-forgot">忘记密码？</a></li>
                      <li><a href="/stapages/problem#problem-shop-known">购买须知</a></li>
                  </ul>
              </li>
              <li class=""><a href="/stapages/account">账户相关</a><i class="leftnav-sub-unfold"></i>
                  <ul class="left-nav-list">
                      <li><a href="/stapages/account#account-cash">现金券制度</a></li>
                      <li><a href="/stapages/account#account-coupon">优惠券制度</a></li>
                  </ul>
              </li>
              <li class=""><a href="/stapages/shipment">包邮政策</a></li>
              <li class=""><a href="/stapages/payment">支付相关</a></li>
              <li class=""><a href="/stapages/logistics">物流相关</a></li>
              <li class=""><a href="/stapages/refund">退换政策</a></li>
          </ul>
      </div>
      <div class="leftnav-items">
          <div class="leftnav-title">关于美美箱<i class="leftnav-unfold"></i></div>
          <ul>
              <li class=""><a href="/stapages/global">美美全球</a></li>
              <li class=""><a href="/stapages/advance">品牌优势</a></li>
              <li class=""><a href="/stapages/guarantee">消费保障</a></li>
          </ul>
      </div>
      <div class="leftnav-items">
          <div class="leftnav-title">服务协议<i class="leftnav-unfold"></i></div>
          <ul>
              <li class=""><a href="/stapages/serve">服务协议</a></li>
              <li class=""><a href="/stapages/protocol">个人网申协议</a></li>
          </ul>
      </div>
      <div class="leftnav-items">
          <div class="leftnav-title">联系我们<i class="leftnav-unfold"></i></div>
          <ul>
              <li class=""><a href="/stapages/cooperation">商务合作</a></li>
              <li class=""><a href="/stapages/distribution">分销合作</a></li>
              <li class=""><a href="http://memebox.zhiye.com/">加入我们</a></li>
          </ul>
      </div>
  </div>
</template>
<script>
import jq from 'jquery'

  export default{
    head: {
      link: [
        {rel:'stylesheet', href:'/common/css/footernav.css'}
      ]
    },
    mounted (){
      if(process.BROWSER_BUILD){
        jq(document).ready(function() {
          jq("#leftnav-wrapper").on("click",".leftnav-unfold",function(){
            var sinblingul = jq(this).closest(".leftnav-items").find("ul");
            if(jq(sinblingul).is(":visible")){
                jq(sinblingul).slideUp("fast");
                jq(this).addClass("leftnav-fold");
            }else{
                jq(sinblingul).slideDown("fast");
                jq(this).removeClass("leftnav-fold");
            }
          });
          jq("#leftnav-wrapper").on("click",".leftnav-sub-unfold",function(){
              var sinblingul = jq(this).parent("li").find("ul");
              if(jq(sinblingul).is(":visible")){
                  jq(sinblingul).slideUp("fast");
                  jq(this).addClass("leftnav-sub-fold");
              }else{
                  jq(sinblingul).slideDown("fast");
                  jq(this).removeClass("leftnav-sub-fold");
              }
          });
        });
      }
    }
  }
</script>
