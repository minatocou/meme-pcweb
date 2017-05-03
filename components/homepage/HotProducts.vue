<template>
<div>
    <div class="hotproducts" v-if="products.length != 0">
        <h3>猜你喜欢</h3>
        <span class="title">爱你所爱，为你寻觅世间好物</span>
        <el-carousel type="card" height="380px">
            <el-carousel-item v-for="product in products" class="swiper-container hotproduct">
                <a :href="'/product/' + product.id">
                    <img :src="product.imgUrl" alt="">
                    <div class="name">{{product.brandName}}{{product.name}}</div>
                    <div class="prices">￥{{product.price}}<del class="originPrice">￥{{product.originPrice}}</del></div>
                </a>
            </el-carousel-item>
        </el-carousel>
    </div>
</div>
</template>

<script>
    export default{
        name: 'hot-products',
        props: {
            products: {
                type: Array
            }
        }
    }
</script>
