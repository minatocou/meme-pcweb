<template>
    <div class="confirm-order-wrapper">
        <empty v-if="checkoutList.length == 0"></empty>
        <div class="confirm-order-container" v-else>
            <div class="address-wrapper">
                <p class="chose-address">选择收货地址</p>
                <div class="address-container">
                    <div v-if="addressList.address.length == 0" class="address-info def" @click="newAddress">
                        <div><em>+</em>新增地址</div>
                    </div>
                    <div v-else class="address-list">
                        <div v-for="(item,index) in addressList.address" class="address-info" :class="{chosen:index == 0}" @click="changeAddress(item,index)">
                            <div class="title">
                                <span>{{item.consignee}}</span>
                                <span v-if="item.type=='0'" class="default">默认地址</span>
                                <span v-else @click.stop="setDefault(item)" class="setDef">设为默认</span>
                            </div>
                            <div class="address-detail">
                                <p class="addr">{{item.province}} {{item.city}} {{item.district}} {{item.street}}</p>
                                <p class="phone">{{item.tel}}</p>
                                <p class="idcard">{{item.cardid}}</p>
                            </div>
                            <div class="ops">
                                <span @click.stop="editAddress(item)">修改</span>
                                <span @click.stop="deleteAddress(item,index)">删除</span>
                            </div>
                        </div>
                    </div>
                    <div class="addAddress" @click="newAddress" v-if="addressList.address.length != 0">新增地址</div>
                </div>
            </div>
            <div class="checkout">
                <table class="checkout-table" v-for="warehouse in checkoutList.warehouses">
                    <colgroup>
                        <col width="45%">
                        <col width="15%">
                        <col width="15%">
                        <col width="10%">
                        <col width="15%">
                    </colgroup>
                    <thead>
                        <tr>
                            <th class="fir-th">{{stamap[warehouse.origin].warehouse}}</th>
                            <th >规格</th>
                            <th >单价（元）</th>
                            <th >数量</th>
                            <th >小计</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in warehouse.items">
                            <td class="pro-img fir-td">
                                <a :href="'/product/' + product.product_id"><img :src="product.img_mobile" alt=""></a>
                                <span>{{product.name}}</span>
                            </td>
                            <td>{{product.option}}</td>
                            <td>￥{{product.final_price}}</td>
                            <td>{{product.stock}}</td>
                            <td>￥{{(product.stock*product.final_price).toFixed(2)}}</td>
                        </tr>
                        <tr>
                            <td colspan="6" class="warehouse-dis">
                                <div class="warehouse-info" v-for="info in warehouse.info">
                                    <span class="title">{{info.title}}:</span>
                                    <span class="mount">{{info.mount}}</span>
                                </div>
                            </td>
                        </tr>
                        <tr class="warehouse-foot">
                            <td colspan="6">
                                <span class="warehouse-sum">本仓应付:
                                    <a>￥{{warehouse.notUseReward.total}}</a>
                                    <span class="mecoin-dis">(蜜豆抵扣:￥{{warehouse.notUseReward.reward.toFixed(2)}})</span>
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="checkout-bot">
                <div class="mecoin-dis-all">
                    <i class="selectIcon" :class="{chosen: useReward}" @click="choseReward(checkoutList.total.totalReward)"></i>可使用{{checkoutList.total.totalReward}}蜜豆抵扣￥{{checkoutList.total.totalReward}}元
                </div>
                <div class="checkout-bot-total">
                    <a href="/checkout/cart" class="goback">返回购物车</a>
                    <a class="goPay" @click="saveOrder">去支付</a>
                    <div class="checkout-total">
                        应付<a>￥{{useReward?checkoutList.total.usedReward.duePaid:checkoutList.total.notUsedReward.duePaid}}</a>
                        <span>（可返 <em><span>{{useReward?checkoutList.total.usedReward.payback:checkoutList.total.notUsedReward.payback}}</span>蜜豆</em>）</span>
                    </div>
                </div>
            </div>
            <div class="address-edit-wrapper" v-show="showWindow">
                <div class="ad-ed-container">
                    <div class="he">修改收货人信息<i @click="newAddress">×</i></div>
                    <form @submit.prevent="submit">
                        <div class="change-address-container">
                            <ul>
                                <li><span>收货人:</span><input type="text" v-model="userAddress.name"></li>
                                <li><span>电话号码:</span><input type="text" v-model="userAddress.tel"></li>
                                <li  class="choseAdd">
                                    <span>收货地址:</span>
                                    <div data-toggle="distpicker" id="addPick">
                                      <select data-province="--- 选择省 ---" v-model="userAddress.province"></select>
                                      <select data-city="--- 选择市 ---" v-model="userAddress.city"></select>
                                      <select data-district="--- 选择区 ---" v-model="userAddress.district"></select>
                                    </div>
                                </li>
                                <li><span>详细地址:</span><input type="text" v-model="userAddress.street"></li>
                                <li><span>身份证号:</span><input type="text" v-model="userAddress.cardid"></li>
                            </ul>
                            <p class="warning">为了您的商品顺利通过海关，请填写与收件人一致的证件号码</p>
                            <p class="saveDef"><i class="selectIcon" :class="{chosen:defaultAdd}" @click="addDefault"></i>保存为默认地址</p>
                        </div>
                        <div class="save-ops">

                            <input class="access" type="submit" value="确定">
                            <span class="cancel">取消</span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Empty from '~components/Empty.vue'
import CustomerService from '../../service/customer'
import CheckoutService from '../../service/checkout'
import axios from 'axios'

export default {
  head: {
      link: [
          {rel: 'stylesheet', href: '/css/checkout/confirm.css'}
      ],
      script: [
        {src: '/js/jquery.min.js'},
        {src: '/js/distpicker.min.js'}
      ]
  },
  layout: 'checkout',
  middleware: 'auth',
  components: {
    Empty
  },
  mounted(){
    if(process.BROWSER_BUILD){
        this.$nextTick(function () {
            require('../../static/js/confirm.js')
        })
    }
  },
  async data ({store}) {
    let address = await CustomerService.loadAddress(store)
    let checkout = await CheckoutService.loadCheckout(store)
    return {
        addressList: address.data || null,
        checkoutList: checkout.data || null,
        showWindow: 0,
        msg: checkout.msg,
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
      },
      userAddress:{
            addressId: '',
            name: '',
            tel: '',
            regionId: '123',
            province: '',
            city: '',
            district: '',
            street: '',
            cardid: '',
            postcode: '13213'
        },
        defaultAdd: false,
        useReward: false,
        mecoinAmount: 0
    }
  },
  methods: {
    newAddress() {
        this.showWindow = !this.showWindow
    },
    addDefault() {
        this.defaultAdd = true
    },
    choseReward (mecoin) {
        if(mecoin){
            this.useReward = !this.useReward
        }
        if(this.useReward){
            this.mecoinAmount = mecoin
        }
        else{
            this.mecoinAmount = 0
        }
    },
    submit () {
        let $this = this
        let formData = this.userAddress
        if($this.defaultAdd){
            formData.default_shipping = 'on'
        }
        axios.post('/api/saveAddress', formData)
        .then(function(res){
          alert(res.data.msg)
          if(res.data.code == '1'){
            $this.showWindow = !$this.showWindow
            window.location.reload()
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            throw new Error('Bad credentialssss')
          }
        })
    },
    editAddress(param) {
        let $this = this
        this.showWindow = !this.showWindow
        let addressId = param.addressId
        axios.post('/api/editAddress', {addressId})
        .then(function(res){
          if(res.data.code == '1'){
            $this.userAddress = res.data.data
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            throw new Error('Bad credentialssss')
          }
        })
    },
    deleteAddress(param, index) {
        let $this = this
        let addressId = param.addressId
        if(confirm('确认删除该地址吗？')){
            axios.post('/api/deleteAddress', {addressId})
            .then(function(res){
              alert(res.data.msg)
              if(res.data.code == '1'){
                $this.addressList.address.splice(index,1)
              }
            })
            .catch((error) => {
              if (error.response.status === 401) {
                throw new Error('Bad credentialssss')
              }
            })
        }
    },
    changeAddress(param,index) {
        let $this = this
        let addressId = param.addressId
        let addList = $this.addressList.address
        axios.post('/api/changeAddress', {addressId})
        .then(function(res){
          if(res.data.code == '1'){
            addList.splice(index,1)
            addList.unshift(param)
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            throw new Error('Bad credentialssss')
          }
        })
    },
    setDefault(param){
        let $this = this
        let addressId = param.addressId
        axios.post('/api/setDefault', {addressId})
        .then(function(res){
          alert(res.data.msg)
          if(res.data.code == '1'){
            $this.addressList.address.forEach(function(item){
                item.type = '1'
            })
            param.type = '0'
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            throw new Error('Bad credentialssss')
          }
        })
    },
    saveOrder () {
        let $this = this
        if($this.addressList.address.length != 0){
            let address_id = $this.addressList.address[0].addressId
            // let address_id = '37005'
            let useReward = $this.mecoinAmount
            axios.post('/api/saveOrder', {address_id, useReward})
            .then(function(res){
              alert(res.data.msg)
              if(res.data.code == '1'){
                location.href="/checkout/order"
              }
            })
            .catch((error) => {
              if (error.response.status === 401) {
                throw new Error('Bad credentialssss')
              }
            })
        }
        else{
            alert('请填写收货地址')
        }
    }
  }
}
</script>
