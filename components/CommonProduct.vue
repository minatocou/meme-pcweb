<!-- common page product -->
<template>
    <div class="com-product-item">
        <a :href="'/product/' + productitem.productId">
            <div class="image">
                <i v-if="productitem.warehouse"><img v-if="productitem.warehouse" :src="stamap[productitem.warehouse].logo" alt=""></i>
                <img :src="productitem.img || productitem.imgPc" alt="">
                <div class="name">
                    <div class="brand">{{productitem.brandName}}</div>
                    <div>{{productitem.name}}</div>
                </div>
                <div class="price">
                    <del>￥{{productitem.originPrice}}</del>
                    <p>￥{{productitem.price}}</p>
                </div>
            </div>
        </a>
        <div class="shop">
            <a class="cart" @click="addCart(productitem)">加入购物车</a>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default{
    name: 'common-product-item',
    props: {
        productitem: {
            type: Object
        }
    },
    data () {
        return {
            // product: this.productitem,
            stamap: {
                local: {logo:'/img/goods-local.png'},
                kr: {logo:'/img/goods-global.png'},
                epass: {logo:'/img/goods-epass.png'},
                ftz: {logo:'/img/goods-ftz.png'},
                '2': {logo:'/img/goods-local.png'},
                '1': {logo:'/img/goods-global.png'},
                '8': {logo:'/img/goods-epass.png'},
                '4': {logo:'/img/goods-ftz.png'},
                '0': {logo: '/img/goods-ftz.png'},
            }
        }
    },
    methods: {
        addCart (param) {
            let $this = this
            let productId = param.productId
            let qty = 1
            if (param.hasOptions == '1') {
                location.href = "/product/" + productId
            }
            else{
                axios.post('/api/addCart', {productId, qty})
                .then(function(res){
                    if(res.data.code == 1){
                        $this.$store.state.minicart = res.data.data
                    }
                    // console.log(res.data)
                  alert(res.data.msg)
                  // location.href = "/checkout/cart"
                })
                .catch((error) => {
                  if (error.response.status === 401) {
                    throw new Error('Bad credentialssss')
                  }
                })
            }
        }
    }
}
</script>
<style>
@import '/common/css/commonproduct.css';
</style>
