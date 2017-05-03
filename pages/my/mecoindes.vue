<template>
  <div class="my-wrapper">
    <div class="mecoin-des">
      <img src="/img/mecoindes.png" alt="">
      <div class="title">
        <a id="1" class="des" :class="{'chosen':tab==1}" @click="changeTab(1)">蜜豆说明</a>|
        <a id="2" class="des" :class="{'chosen':tab==2}" @click="changeTab(2)">蜜豆攻略</a>
      </div>
      <div class="showme">
        <div class="defination" v-if="tab==1">
          <div class="content">
            <li>什么是蜜豆？</li>
            <p>蜜豆是美美箱为所有蜜米（会员用户）准备的专属积分</p>
            <li>蜜豆有什么用途？</li>
            <p>蜜豆可在购物支付时抵扣部分金额，1蜜豆=1人民币，可抵扣的蜜豆额度根据会员等级高低会有不同</p>
            <li>蜜豆的有效期？</li>
            <p>每年2月1日清除前年12月31日前获得的所有蜜豆</p>
            <li>取消订单或退货后，蜜豆返还吗？</li>
            <p>取消订单：支付时所抵扣的蜜豆会返还到账户中</p>
            <p>退货：美美箱将收回此退货订单所发放的蜜豆，如收回时您账户中的蜜豆数额不足以扣还，将从您此退货订单支付的现金中扣除差额部分</p>
          </div>
        </div>
        <div class="getstart" v-else>
          <div class="content">
            <li>怎样快速赚取蜜豆:</li>
            <p>您可以通过如下途径赚取蜜豆</p>
            <p>1.      成功购买可返不同数额的蜜豆（MEMEBOX自有品牌商品返更多）。</p>
            <p>2.      邀请好友购买MEMEBOX商品，赚取蜜豆。</p>
            <p>3.      购买后分享红包，自己也可以抢蜜豆哦。</p>
            <p>4.      每日签到可以赚取蜜豆。</p>
            <p>5.      MEMEBOX会不定期举行送蜜豆活动，多多关注呦。</p>
            <li>怎样使用蜜豆:</li>
            <p>在购买商品时，根据您当前会员等级和商品金额可以使用一定比例的蜜豆抵扣等额现金，具体规则请见会员等级说明细则。</p>
          </div>
      </div>
      </div>
      <div class="return">
        <a href="/my/mecoin"><span>返回</span></a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  head: {
      link: [
          {rel: 'stylesheet', href: '/css/account/mecoindes.css'}
      ]
  },
  layout: 'account',
  data () {
    return {
      tab: true
    }
  },
  methods: {
    changeTab (num) {
      this.tab = num
    }
  }
}
</script>
