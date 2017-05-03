<template>
  <div class="my-wrapper">
    <div class="my-orderlist">
    <!-- <div>{{sortedOrders}}</div> -->
        <div class="acu-orders">我的订单<span>请谨防钓鱼链接或诈骗短信</span></div>
        <div class="page-title">
            <ul class="order-status" id="order-item">
                <li class="fir" :class="{'current':tab == 0}" @click="changeTab(0)"><a>全部订单<span>{{count.all || 0}}</span></a></li>
                <li :class="{'current':tab == 2}" @click="changeTab(2)"><a>待支付<span>{{count.pend || 0}}</span></a></li>
                <li :class="{'current':tab == 3}" @click="changeTab(3)"><a>待发货<span>{{count.process || 0}}</span></a></li>
                <li :class="{'current':tab == 1}" @click="changeTab(1)"><a>待收货<span>{{count.complete || 0}}</span></a></li>
                <li :class="{'current':tab == 4}" @click="changeTab(4)"><a>待评价<span>{{count.pending_review || 0}}</span></a></li>
            </ul>
            <div class="order-search">
                <input name="key" type="text" value="" placeholder="请输入订单号"/>
                <a>订单搜索</a>
            </div>
        </div>
        <div class="orderlists">
            <!-- <paginate name="orders" :list="sortedOrders" class="paginate-list" :per="5">
                <li v-for="item in paginated('orders')">{{item}}</li>
            </paginate>
            <paginate-links for="orders" :limit="2"  :show-step-links="true"  @change="onOrderPageChange"></paginate-links> -->
            <div v-if="sortedOrders.length != 0" class="order-table">
                <table class="order-table-head">
                <colgroup>
                    <col width="40%"/>
                    <col width="8%"/>
                    <col width="8%"/>
                    <col width="12%"/>
                    <col width="10%"/>
                    <col width="10%"/>
                    <col width="12%"/>
                </colgroup>
                    <thead>
                        <tr>
                            <th>商品</th>
                            <th>单价</th>
                            <th>数量</th>
                            <th>订单金额</th>
                            <th>收件人</th>
                            <th>状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                </table>
                <table v-for="order in sortedOrders" class="order-table-container">
                    <colgroup>
                        <col width="40%"/>
                        <col width="8%"/>
                        <col width="8%"/>
                        <col width="12%"/>
                        <col width="10%"/>
                        <col width="10%"/>
                        <col width="12%"/>
                    </colgroup>
                    <thead>
                        <th colspan="7">
                            <span>{{stamap[order.type].warehouse}}</span>
                            <span>订单号：{{order.orderNo}}</span>
                            <span>订单时间：{{order.orderDate}}</span>
                            <a class="detail" :href="'/my/orderdetail?id=' + order.id">订单详情>></a>
                        </th>
                    </thead>
                    <tbody>
                        <tr v-for="(product,index) in order.items">
                            <td class="pro">
                                <a :href="'/product/' + product.id"><img :src="product.image" alt=""></a>
                                <span>{{product.name}}</span>
                            </td>
                            <td>¥{{product.price}}</td>
                            <td>{{product.qty}}</td>
                            <template v-if="index==0">
                                <td :rowspan="order.items.length">¥{{order.sumPrice}}<p>(返{{order.rewardBack}}蜜豆)</p></td>
                                <td :rowspan="order.items.length">{{order.userName}}</td>
                                <td :rowspan="order.items.length">{{stamapsec[order.status].des}}</td>
                                <td :rowspan="order.items.length"><a @click="ops(order)" class="rebuy">{{stamapsec[order.status].paydes}}</a></td>
                            </template>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else>这里没有有效的订单哦亲～</div>
        </div>
    </div>
  </div>
</template>

<script>
import OrderService from '../../service/order'
import axios from 'axios'

export default {
  layout: 'account',
  middleware: 'auth',
  head: {
    link: [{rel:'stylesheet', href: '/css/account/orderlist.css'}]
  },
  async data ({store}) {
    let orderCount = await OrderService.loadAllOrderCount(store)
    let allOrders = await OrderService.loadSortedOrders(store)
    return {
        tab: 0,
        count: orderCount.data,
        sortedOrders: allOrders.data || [],
        stamap: {
            1: {
              warehouse: '韩国仓'
            },
            2: {
              warehouse: '中国仓'
            },
            4: {
              warehouse: '保税仓'
            },
            8: {
              warehouse: '韩国直邮 特快'
            },
        },
        stamapsec: {
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
        // paginate: ['orders']
    }
  },
  methods: {
    changeTab(item){
        let $this = this
        this.tab = item
        let formData = {
            page: 1,
            size: 5,
            status: this.tab
        }
        axios.post('/api/getSortedOrder', formData)
        .then(function(res){
          $this.sortedOrders = res.data.data
        })
        .catch((error) => {
          if (error.response.status === 401) {
            throw new Error('Bad credentialssss')
          }
        })
    },
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
    // onOrderPageChange(){
    //     let $this = this
    //     let formData = {
    //         page: 1,
    //         size: 5,
    //         status: this.tab
    //     }
    //     axios.post('/api/getSortedOrder', formData)
    //     .then(function(res){
    //       alert(res.data.msg)
    //       if(res.data.code == '1'){
    //         // console.log(res.data.data)
    //       }
    //     })
    //     .catch((error) => {
    //       if (error.response.status === 401) {
    //         throw new Error('Bad credentialssss')
    //       }
    //     })
    // }
  }
}
</script>
