<!-- homepage product -->
<template>
    <div class="product-item">
        <a :href="'/product/' + product.productId">
            <div class="image">
                <i><img :src="stamap[product.warehouse].logo" alt=""></i>
                <img :src="product.img" alt="">
                <div class="name">
                    <div>{{product.brandName}}</div>
                    <div>{{product.name}}</div>
                </div>
            </div>
        </a>
        <div class="shop">
            <div class="price">
                <span class="new">￥{{product.price}}</span>
                <span class="old">
                    <del>￥{{product.originPrice}}</del>
                    <p>立省￥{{product.originPrice-product.price}}</p>
                </span>
            </div>
            <a class="cart" @click="addCart(product)">加入购物车</a>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default{
    name: 'home-product-item',
    props: {
        productitem: {
            type: Object
        }
    },
    data () {
        return {
            product: this.productitem,
            stamap: {
                local: {logo:'/img/goods-local.png'},
                kr: {logo:'/img/goods-global.png'},
                epass: {logo:'/img/goods-epass.png'},
                ftz: {logo:'/img/goods-ftz.png'}
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
@import '/common/css/product.css';
</style>
