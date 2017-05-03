<template>
  <div class="my-wrapper">
    <div class="my-wishlist">
        <div class="title">我的收藏</div>
        <empty v-if="wishlist.length == 0"></empty>
        <table v-else class="wishlist-table">
            <colgroup>
                <col width="45%">
                <col width="20%">
                <col width="15%">
                <col width="20%">
            </colgroup>
            <thead>
            <tr>
                <th>商品信息</th>
                <th>价格</th>
                <th>加入购物车</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="product in wishlist">
                    <td class="fir">
                        <a :href="'/product/' + product.productId"><img :src="product.imgUrl" alt=""></a>
                        <span>{{product.brandName}}{{product.name}}</span>
                    </td>
                    <td>¥{{product.price}}</td>
                    <td><a class='addcart' @click="addCart(product)">加入购物车</a></td>
                    <td><a @click="cancelwish(product)">取消收藏</a></td>
                </tr>
            </tbody>
        </table>
    </div>
    <!-- <div>{{wishlist}}</div> -->
  </div>
</template>

<script>
import CustomerService from '../../service/customer'
import Empty from '~components/Empty.vue'
import axios from 'axios'

export default {
  layout: 'account',
  middleware: 'auth',
  components: {
    Empty
  },
  head: {
    link: [
        {rel: 'stylesheet', href: '/css/account/wishlist.css'}
    ]
  },
  async data ({store}) {
    let wishlistInfo = await CustomerService.loadWishlist(store)
    return {
        wishlist: wishlistInfo.data
    }
  },
  methods: {
    cancelwish (product) {
        let cusparams = {
            itemId: product.itemId
        }
        axios.post('/api/cancelwish', cusparams)
        .then(function(res){
          alert(res.data.msg)
          window.location.reload()
        })
        .catch((error) => {
          if (error.response.status === 401) {
            throw new Error('Bad credentialssss')
          }
        })
    },
    addCart (product) {
        let productId = product.productId
        let qty = 1
        if(product.hasOptions == '1'){
            window.location.href = '/product/' + product.productId
        }
        else{
            axios.post('/api/addCart', {productId, qty})
            .then(function(res){
              alert(res.data.msg)
              if(res.data.code == '1'){
                location.href = '/checkout/cart'
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
}
</script>

