<template>
    <div class="productlists" v-if="categorys.length!=0">
        <div v-for="category in categorys" class="category" align="center" >
            <div v-for="product in category.productList" class="product">
                <home-product-item :productitem="product"/>
            </div >
        </div>
    </div>
</template>

<script>
import HomeProductItem from '../HomeProduct'

export default{
    name: 'product-list',
    components: {
        HomeProductItem
    },
    props: {
        products: {
            type: Array
        }
    },
    data () {
        return {
            categorys: this.products,
        }
    }
}
</script>
