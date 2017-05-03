<template>
    <div class="category-list-wrapper">
      <empty v-if="categoryList.length == 0"></empty>
      <div v-else class="category-list-container">
          <div v-html="categoryList.description" class="description"></div>
          <div class="pros" align="center">
            <div v-for="product in categoryList.products" class="cat-pro">
              <common-product-item :productitem="product"/>
            </div >
          </div>
      </div>
    </div>
</template>

<script>
import Empty from '~components/Empty.vue'
import ProductService from '../../service/product'
import axios from 'axios'
import CommonProductItem from '~components/CommonProduct'

export default{
    head: {
      link: [
          {rel: 'stylesheet', href: '/css/product/category.css'}
      ]
    },
    components: {
        Empty,CommonProductItem
    },
    validate ({ params }) {
        return !isNaN(params.category_id)
    },
    async data ({params}) {
        let category = await ProductService.loadCategoryList(params)
        return {
            categoryList: category.data
        }
    }
}
</script>
