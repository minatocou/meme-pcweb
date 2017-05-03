<template>
  <div class="my-wrapper">
    <div class="my-mecoin-wrapper">
      <div class="my-mecoin">
        <div class="me-total">
          <i></i>
          <div class="me-detail">
            <div class="coin-num">我的蜜豆：</div>
            <div class="coin-number">320</div>
            <p>1蜜豆=1RMB 给蜜米们的诚意回馈</p>
          </div>
        </div>
        <div class="me-ice">
          <div class="me-total-get">
            <span class="des">总额</span>
            <span class="num">326</span>
          </div>
          <div class="me-total-ice">
            <span class="des">冻结</span>
            <span class="num">0</span>
          </div>
        </div>
        <div class="go-mecoin">
          <a href="/my/mecoindes">玩转蜜豆</a>
        </div>
      </div>
      <div class="my-meops">
        <span class="all" id="1">全部<i>|</i></span>
        <span class="income" id="2">收入<i>|</i></span>
        <span class="frozen" id="3">冻结<i>|</i></span>
        <span class="payment" id="4">支付</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head: {
      link: [
          {rel: 'stylesheet', href: '/css/account/mecoin.css'}
      ]
  },
  layout: 'account'
}
</script>
