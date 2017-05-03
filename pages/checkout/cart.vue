<template>
<div class="cart-wrapper">
  <empty v-if="!detail.warehouses"></empty>
  <div class="cart" v-else>
    <table class="cart-head">
      <colgroup>
          <col width="6%">
          <col width="34%">
          <col width="15%">
          <col width="10%">
          <col width="15%">
          <col width="10%">
          <col width="10%">
      </colgroup>
      <thead>
      <tr>
          <th><i class="selectIcon" @click="markAll(detail)" :class="{chosen: detail.isSelected}"></i></th>
          <th class="prd-info">商品信息</th>
          <th>规格</th>
          <th>单价</th>
          <th>数量</th>
          <th>金额</th>
          <th>操作</th>
      </tr>
      </thead>
    </table>
    <table class="cart-warehouse" v-for="warehouse in detail.warehouses">
      <colgroup>
          <col width="6%">
          <col width="34%">
          <col width="15%">
          <col width="10%">
          <col width="15%">
          <col width="10%">
          <col width="10%">
      </colgroup>
      <thead>
      <tr>
          <th><i class="selectIcon" :class="{chosen: warehouse.isSelected}" @click="markWarehouse(warehouse)"></i></th>
          <th class="prd-info" colspan="6">{{stamap[warehouse.id].warehouse}}</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="product in warehouse.preferences[0].products">
          <td>
            <i class="selectIcon" :class="{chosen: product.isSelected}" @click="markProducts(product)"></i>
          </td>
          <td class='pro-img'>
            <a :href="'/product/' + product.productId"><img :src="product.img" alt=""></a>
            <span>{{product.name}}</span>
          </td>
          <td>{{product.option}}</td>
          <td>￥{{product.price}}</td>
          <td>
            <button class="reduce" @click="reduce(product)">-</button>
            <input type="text" v-model="product.qty" readonly="true">
            <button class="add" @click="add(product)">+</button>
          </td>
          <td>￥{{product.rowTotal}}</td>
          <td @click="deleteProduct(product)" class="delproduct">删除</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="7">
            <span class="sum-price">本仓总计:
              <a>￥{{warehouse.current}}</a>
              <span class="sum-dis">(优惠￥{{warehouse.warehouseDiscount.toFixed(2)}})</span>
            </span>
          </td>
        </tr>
      </tfoot>
    </table>
    <div class="cart-bot">
      <div class="bot-opt">
        <i class="selectIcon" @click="markAll(detail)" :class="{chosen: detail.isSelected}"></i>
        <a @click="deleteChosen(detail)"><i class="deleteIcon"></i>删除</a>
      </div>
      <div class="bot-total">
        <span>总计<a>￥{{detail.grandTotal}}</a>(不含运费)</span>
        <a href="/checkout/confirm" class="goConfirm">去结算</a>
      </div>
    </div>
    <!-- <div>{{detail}}</div> -->
  </div>
</div>
</template>

<script>
import CheckoutService from '../../service/checkout'
import axios from 'axios'
import Empty from '~components/Empty.vue'

export default {
  head: {
      link: [
          {rel: 'stylesheet', href: '/css/checkout/cart.css'}
      ]
  },
  layout: 'checkout',
  components: {
    Empty
  },
  async data ({store}) {
    let cartDetail = await CheckoutService.loadCart(store)
    return {
      detail: cartDetail.data || null,
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
        }
      }
    }
  },
  methods: {
    reduce (params) {
      params.qty --
      this.updateCart(params)
    },
    add (params) {
      params.qty ++
      this.updateCart(params)
    },
    updateCart (params) {
      let itemId = params.itemId
      let qty = params.qty
      let $this = this
      axios.post('/api/updateCart', {itemId, qty})
        .then(function(res){
          if(res.data.code == '1'){
            $this.detail = res.data.data
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            throw new Error('Bad credentialssss')
          }
        })
    },
    markCart (itemId, mark) {
      let $this = this
      axios.post('/api/mark', {itemId, mark})
        .then(function(res){
          if(res.data.code == '1'){
            $this.detail = res.data.data
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            throw new Error('Bad credentialssss')
          }
        })
    },
    deleteProduct (params) {
      let $this = this
      let itemId = params.itemId
      if(confirm('确认删除该商品吗？')){
        axios.post('/api/delete', {itemId})
        .then(function(res){
          if(res.data.code == '1'){
            $this.detail = res.data.data
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            throw new Error('Bad credentialssss')
          }
        })
      }
    },
    deleteChosen (params) {
      let $this = this
      let itemId = []
      params.warehouses.forEach(function(warehouse){
          warehouse.preferences[0].products.forEach(function(product){
            if(product.isSelected){
              itemId.push(product.itemId)
            }
        })
      })
      if(itemId.length == 0){
        alert('请选择要删除的商品')
      }
      else{
        if(confirm('确认删除已选商品吗？')){
          itemId = JSON.stringify(itemId)
          axios.post('/api/deleteChosen', {itemId})
          .then(function(res){
            if(res.data.code == '1'){
              $this.detail = res.data.data
            }
          })
        }
      }
    },
    markProducts (params) {
      params.isSelected = !params.isSelected
      let itemId = []
      itemId.push(params.itemId)
      itemId = JSON.stringify(itemId)
      let mark = Number(params.isSelected)
      this.markCart(itemId, mark)
    },
    markWarehouse (params) {
      params.isSelected = !params.isSelected
      let itemId = []
      params.preferences[0].products.forEach(function(item){
        itemId.push(item.itemId)
        item.isSelected = params.isSelected
      })
      itemId = JSON.stringify(itemId)
      let mark = Number(params.isSelected)
      this.markCart(itemId, mark)
    },
    markAll (params) {
      params.isSelected = !params.isSelected
      let itemId = []
      params.warehouses.forEach(function(warehouse){
        warehouse.isSelected = params.isSelected
        warehouse.preferences[0].products.forEach(function(product){
          itemId.push(product.itemId)
          product.isSelected = params.isSelected
        })
      })
      itemId = JSON.stringify(itemId)
      let mark = Number(params.isSelected)
      this.markCart(itemId, mark)
    }
  }
}
</script>
