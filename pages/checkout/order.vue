<template>
  <div class="checkout-order-wrapper">
    <empty v-if="order.length == 0"></empty>
    <div v-else class="checkout-order-container">
        <div class="order-top">
            <div class="success"><i></i>订单提交成功,完成最后一步就可以愉快地等快递咯！</div>
            <div class="tips">请您在{{order.countdown}}s内完成支付,否则订单将会自动取消哦.</div>
        </div>
        <div class="order-address">
            <div class="info-title">收货人信息</div>
            <div class="info-detail">
                <span><p>姓名</p>{{order.address.name}}</span>
                <span><p>手机号</p>{{order.address.telephone}}</span>
                <span><p>身份证号</p>{{order.address.idcard}}</span>
                <span><p>收货地址</p>{{order.address.text}}</span>
            </div>
        </div>
        <div class="order-detail">
            <div v-for="warehouse in order.orders" class="payment" :class="warehouse.warehouse.sign">
                <div class="pay-head">
                    <span class="label">{{warehouse.warehouse.label}}</span>
                    <span class="mecoin">（本单可返{{warehouse.rewardpointsBack}}蜜豆）</span>
                    <span class="orderno">订单号：{{warehouse.incrementId}}</span>
                </div>
                <div class="pay-body" v-for="product in warehouse.items">
                    <a href=""><img :src="product.img" alt=""></a>
                    <div class="name">{{product.brand}}{{product.name}}</div>
                    <div class="num">共{{product.qty}}件</div>
                </div>
                <div class="pay-total">
                    <i class="chosen"></i><i class="zfb"></i><span>支付宝</span>
                    <span class="amount">￥{{warehouse.grandTotal}}</span>
                </div>
                <div class="pay-bot">
                    <a @click="gopay(warehouse)">确认支付</a>
                </div>
            </div>
        </div>
    </div>
    <!-- <div>{{order}}</div> -->
  </div>
</template>

<script>
import Empty from '~components/Empty.vue'
import CheckoutService from '../../service/checkout'
import axios from 'axios'

export default {
  middleware: 'auth',
  layout: 'checkout',
  components: {
    Empty
  },
  head: {
    link:[
        {rel: 'stylesheet', href: '/css/checkout/order.css'}
    ]
  },
  async data ({store}) {
    let orderDetail = await CheckoutService.loadCheckoutOrder(store)
    return { order: orderDetail.data }
  },
  methods: {
    gopay (item) {
      let orderId = item.incrementId
      axios.post('/api/goPay', {orderId})
      .then(function(res){
            if(res.data.code == '1'){
               location.href = res.data.data.redirectUrl
            }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            throw new Error('Bad credentialssss')
          }
        })
    }
  }
}
</script>
