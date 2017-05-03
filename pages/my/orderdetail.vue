<template>
  <div class="my-wrapper">
    <div class="my-orderdetail">
      <div class="my-orderdetail-head">
        <div class="acu-head">
            <a class="acu-back" href="/my/orderlist">我的订单</a> &gt; <span>订单详情</span>
        </div>
        <div class="acu-orders">订单详情<span>请谨防钓鱼链接或诈骗短信</span></div>
      </div>
      <div class="my-orderdetail-body">
        <div class="title">
          <span class="status">发货状态：{{stamap[detail.status].des}}</span>
          <span class="ops">
            <a class="ops-pay" @click="ops(detail)">{{stamap[detail.status].paydes}}</a>
            <a class="ops-can" v-if="detail.status == 'Pending'" @click="cancel(detail)">{{stamap[detail.status].candes}}</a>
          </span>
        </div>
        <div class="express"></div>
        <div class="orderinfo">
            <div class="tit">订单信息</div>
            <div class="row">
                <div class="order-num lef">订单编号：</div>
                <div class="order-num rig">{{detail.orderNo}}</div>
            </div>
            <div class="row">
                <div class="address lef">收货地址：</div>
                <div class="order-add">
                    <span>{{detail.userName}}</span>
                    <span>{{detail.phoneNum}}</span>
                    <span>{{detail.address}}</span>
                    <span>{{detail.identity}}</span>
                </div>
            </div>
        </div>
        <div class="order-container">
            <table class="orderInfo-table">
                <colgroup>
                    <col width="40%"/>
                    <col width="20%"/>
                    <col width="10%"/>
                    <col width="15%"/>
                </colgroup>
                <thead>
                  <tr>
                      <th>{{detail.warehouse}}</th>
                      <th>规格</th>
                      <th>数量</th>
                      <th>单价</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="product in detail.items">
                    <td class="pro">
                        <a :href="'/product/' + product.id"><img :src="product.image" alt=""></a>
                        <span>{{product.brand}}{{product.name}}</span>
                    </td>
                    <td>{{product.options || '-'}}</td>
                    <td>{{product.qty}}</td>
                    <td>￥{{product.price}}</td>
                  </tr>
                </tbody>
            </table>
        </div>
        <div class="order-bot">
          <div class="bot-row">
            <span class="lef">小计</span>
            <span class="rig">￥{{detail.simpleSum}}</span>
          </div>
          <div class="bot-row">
            <span class="lef">运费</span>
            <span class="rig">￥{{detail.postage}}</span>
          </div>
          <div class="bot-row">
            <span class="lef">立减折扣</span>
            <span class="rig">￥{{detail.discount}}</span>
            </div>
          <div class="bot-row">
            <span class="lef">蜜豆抵扣</span>
            <span class="rig">￥{{detail.MEDeduction}}</span>
          </div>
          <div class="bot-row">
            <span class="lef">应付总额</span>
            <span class="rig sum">￥{{detail.totalSum}}</span>
          </div>
          <div class="bot-row">
            <span class="rig">本单返（<a>{{detail.rewardBack}}</a>）蜜豆</span>
          </div>
        </div>
      </div>
    </div>
    <!-- <div>{{detail}}</div> -->
  </div>
</template>

<script>
import OrderService from '../../service/order'
import axios from 'axios'

export default {
  layout: 'account',
  middleware: 'auth',
  head: {
    link: [
      { rel: 'stylesheet', href: '/css/account/orderdetail.css'}
    ]
  },
  async data ({store, query}) {
    let orderDetail = await OrderService.loadOrderDetail(store, query)
    return {
        detail: orderDetail.data,
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
            des: '已取消'
          },
          Canceled: {
            des: '已取消',
            paydes: '再次购买'
          },
          Closed: {
            des: '关闭'
          },
          Processing: {
            des: '待发货',
            paydes: '再次购买'
          },
          'On Hold': {
            des: '暂停'
          },
          'Ready for Shipment': {
            des: '待发货',
            paydes: '再次购买'
          },
          Finish: {
            des: '已完成'
          },
          'Presale Waiting': {
            des: '待付尾款'
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
      axios.post('/api/conf', {id})
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
