<template>
  <div class="my-wrapper">
    <div class="my-dashboard">
      <div class="user-center">
        <div class="user-avatar">
        <a href="/my/userinfo"><img :src="customer.avatar" alt=""></a>
        </div>
        <div class="user-detail">
          <div><i></i><span class="user-level"><a href="/my/melevel">{{customer.chineseGrade}}</a></span></div>
          <div class="user-name" id=""><a href="/my/userinfo">{{customer.nickname}}</a></div>
          <div class="sign-up" @click="$store.dispatch('showDownload')">签到奖蜜豆</div>
        </div>
        <div class="user-profile">
          <div class="user-mecoin">
            <p class="total">{{customer.reward}}</p>
            <p class="title"><a href="/my/mecoin">我的蜜豆</a></p>
          </div>
          <div class="user-voucher">
            <p class="total">{{customer.couponNum}}</p>
            <p class="title"><a href="/my/voucher">我的优惠券</a></p>
          </div>
          <div class="user-wishlist">
            <p class="total">{{customer.wishListNum}}</p>
            <p class="title"><a href="/my/wishlist">我的收藏</a></p>
          </div>
        </div>
      </div>
      <div class="order-recent">
        <div class="order-header">
          <span>我的订单</span>
          <a href="/my/orderlist">查看全部订单</a>
        </div>
        <table class="order-table">
          <colgroup>
            <col width="10%">
            <col width="10%">
            <col width="10%">
            <col width="10%">
            <col width="13%">
            <col width="27%">
          </colgroup>
          <thead>
            <tr class="order-title">
              <th>订单编号</th>
              <th>日期</th>
              <th>收件人</th>
              <th>订单金额</th>
              <th>订单状态</th>
              <th>更多</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in recent">
              <td><span>{{order.orderNo}}</span></td>
              <td><span>{{order.orderDate}}</span></td>
              <td><span>{{order.userName}}</span></td>
              <td><span>{{order.sumPrice}}</span></td>
              <td><em>已取消</em></td>
              <td>
                <a :href="'/my/orderdetail?id=' + order.id">订单详情</a>
                <a @click="ops(order)" v-if="stamap[order.status].paydes">{{stamap[order.status].paydes}}</a>
                <a v-if="order.status == 'Pending'" @click="cancel(order)">{{stamap[order.status].candes}}</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- <div>{{recent}}</div> -->
  </div>
</template>

<script>
import OrderService from '../../service/order'
import CustomerService from '../../service/customer'
import axios from 'axios'

export default {
  head: {
      link: [
          {rel: 'stylesheet', href: '/css/account/dashboard.css'}
      ]
  },
  layout: 'account',
  middleware: 'auth',
  async data ({store}){
    let recentOrder = await OrderService.loadRecentOrder(store)
    let customerInfo = await CustomerService.loadCustomerInfo(store)
    return {
      recent: recentOrder.data,
      customer: customerInfo.data,
      stamap: {
          Completed: {
            des: '已发货',
            paydes: '确认收货'
          },
          Shipped: {
            des: '已发货',
            paydes: '确认收货'
          },
          Complete: {
            des: '待收货',
            paydes: '确认收货'
          },
          Pending: {
            des: '待支付',
            paydes: '去支付',
            candes: '取消订单'
          },
          Cancel: {
            des: '已取消',
            paydes: ''
          },
          Canceled: {
            des: '已取消',
            paydes: '再次购买'
          },
          Closed: {
            des: '关闭',
            paydes: ''
          },
          Processing: {
            des: '待发货',
            paydes: '再次购买'
          },
          'On Hold': {
            des: '暂停',
            paydes: ''
          },
          'Ready for Shipment': {
            des: '待发货',
            paydes: '再次购买'
          },
          Finish: {
            des: '已完成',
            paydes: ''
          },
          'Presale Waiting': {
            des: '待付尾款',
            paydes: ''
          }
        }
    }
  },
  methods: {
    ops (item) {
      if(item.status == 'Completed' || item.status == 'Shipped' || item.status == 'Complete'){
        this.conf(item)
      }
      else if(item.status == 'Ready for Shipment' || item.status == 'Processing' || item.status == 'Canceled'){
        this.reorder(item)
      }
      else if(item.status == 'Pending'){
        this.gopay(item)
      }
    },
    cancel (item) {
      let id = item.id
      axios.post('/api/cancelOrder', {id})
        .then(function(res){
          alert(res.data.msg)
            if(res.data.code == '1'){
              location.reload()
            }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            throw new Error('Bad credentialssss')
          }
        })
    },
    conf (item) {
      let id = item.id
      axios.post('/api/conf', {orderId})
      .then(function(res){
            alert(res.data.msg)
        })
        .catch((error) => {
          if (error.response.status === 401) {
            throw new Error('Bad credentialssss')
          }
        })
    },
    gopay (item) {
      let orderId = item.orderNo
      axios.post('/api/goPay', {id})
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
    },
    reorder (item) {
      let id = item.id
      axios.post('/api/reorder', {id})
        .then(function(res){
          alert(res.data.msg)
            if(res.data.code == '1'){
              location.href="/checkout/cart"
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
