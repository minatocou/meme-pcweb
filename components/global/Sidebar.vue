<template>
    <sidebar class="sidebar">
        <div class="mbar-main-panel">
            <el-popover
                  ref="minicart"
                  placement="left-start"
                  trigger="hover">
                  <div class="mini-cart">
                      <div class="title">购物车</div>
                      <div class="items" v-if="carts">
                          <div v-for="(v,warehouse) in carts" v-if="v.pro.length!=0" class="ware">
                            <span>{{stamap[warehouse]}}</span>
                            <li v-for="product in v.pro" v-if="product.qty">
                                <a href="">
                                    <img :src="product.image" alt="">
                                </a>
                                <div class="name">{{product.brand}}{{product.name}}</div>
                                <div class="qty">
                                    <button class="reduce" @click="reduce(product)">-</button>
                                    <input type="text" v-model="product.qty">
                                    <button class="add" @click="add(product)">+</button>
                                </div>
                                <span class="sprice">{{product.price}}</span>
                            </li >
                            <span class="des">本仓共{{v.length}}件商品</span>
                            <span class="total">￥{{v.pri}}</span>
                          </div >
                          <a href="/checkout/cart" class="gotocart">去购物车结算</a>
                      </div>
                      <div v-else class="emp">好可惜，购物车是空的呢( ⊙ o ⊙ )！</div>
                  </div>
            </el-popover>
            <ul class="mbar-top">
                <li class="me-cart" v-popover:minicart>
                    <a href="/checkout/cart" id="cart-panel">
                        <i class="me-smallIcon cartIcon"></i>
                        <span class="cart-name">购物车</span>
                        <span class="cart-num">0</span>
                    </a>
                </li>
            </ul>
            <ul class="mbar-center">
                <li class="me-login">
                    <el-tooltip content="个人中心" placement="left">
                        <a href="/my/dashboard">
                            个人中心
                            <i class="me-smallIcon userIcon"></i>
                        </a>
                    </el-tooltip>
                </li>
                <li class="me-favorite">
                    <el-tooltip content="我的收藏" placement="left">
                        <a href="/my/wishlist">
                            我的收藏
                            <i class="me-smallIcon favoriteIcon"></i>
                        </a>
                    </el-tooltip>
                </li>
                <li class="me-asset">
                    <el-tooltip content="我的订单" placement="left">
                        <a href="/my/orderlist">
                            <i class="me-smallIcon assetIcon"></i>我的订单
                        </a>
                    </el-tooltip>
                </li>
            </ul>
            <ul class="mbar-bottom">
                <li class="me-support" @click="$store.dispatch('conCS')">
                    <el-tooltip content="在线客服" placement="left">
                        <a href="javascript:void(0);">
                            在线客服
                            <i class="me-smallIcon supportIcon"></i>
                        </a>
                    </el-tooltip>
                </li>
                <li class="me-gotop">
                    <el-tooltip content="返回顶部" placement="left">
                        <a href="javascript:void(0);">
                            返回顶部
                            <i class="me-smallIcon gotopIcon"></i>
                        </a>
                    </el-tooltip>
                </li>
            </ul>
        </div>
    </sidebar>
</template>
<script>
import axios from 'axios'
    export default{
        data(){
            return {
                stamap: {
                    kr: '韩国仓',
                    local: '本地仓',
                    epass: '韩国直邮特快',
                    ftz: '保税仓'
                }
            }
        },
        computed:{
            carts(){
                let $this = this
                let cartitems = this.$store.state.minicart.cart.cart_items
                console.log(cartitems, 'mini cart')
                let products = {
                    local:{
                        pro: [],
                        pri: 0,
                    },
                    kr:{
                        pro: [],
                        pri: 0,
                    },
                    ftz:{
                        pro: [],
                        pri: 0,
                    },
                    epass:{
                        pro: [],
                        pri: 0,
                    }
                }
                if(cartitems.length){
                    cartitems.forEach(function(i){
                        products[i.type].pro.push(i)
                        products[i.type].pri += (parseFloat(i.price.substring(1))) * i.qty
                    })
                }
                return products
            }
        },
        methods: {
            reduce(item){
                let $this = this
                if(item.qty == 1){
                    if(confirm('确认删除该商品吗？')){
                        let params = {
                            itemId: item.id
                        }
                        axios.post('/api/delete', params)
                        .then(function(res){
                          if(res.data.code == '1'){
                            item.qty --
                          }
                          alert(res.data.msg)
                        })
                        .catch((error) => {
                          if (error.response.status === 401) {
                            throw new Error('Bad credentialssss')
                          }
                        })
                      }
                }
                else{
                    let customParam = {
                        itemId: item.id,
                        qty: item.qty-1
                    }
                    axios.post('/api/updateCart', customParam)
                    .then(function(res){
                        if(res.data.code == '1'){
                            item.qty --
                        }
                        alert(res.data.msg)
                    })
                    .catch((error) => {
                      if (error.response.status === 401) {
                        throw new Error('Bad credentialssss')
                      }
                    })
                }
            },
            add(item){
                let customParam = {
                    itemId: item.id,
                    qty: item.qty+1
                }
                axios.post('/api/updateCart', customParam)
                .then(function(res){
                    if(res.data.code == '1'){
                        item.qty ++
                    }
                    alert(res.data.msg)
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
