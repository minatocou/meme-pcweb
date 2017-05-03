<template>
    <div class="category-list-wrapper">
      <empty v-if="classifyList.length == 0"></empty>
      <div v-else class="category-list-container">
          <div class="tp">
              <el-button class="recom">
                  <span class="recom-t">推荐</span>
                    <i class="el-icon-caret-top" @click="setSort('position','asc')" ></i>
                    <i class="el-icon-caret-bottom" @click="setSort('position','desc')" ></i>
              </el-button>
              <el-button class="pri">
                  <span class="pri-t">价格</span>
                    <i class="el-icon-caret-top" @click="setSort('price','asc')" ></i>
                    <i class="el-icon-caret-bottom" @click="setSort('price','desc')" ></i>
              </el-button>
          </div>
          <div class="pros" align="center">
            <div v-for="product in classifyList" class="cat-pro">
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
    async data ({params}) {
        let customParam = {
            id1: params.classify_id
        }
        let classify = await ProductService.loadClassifyList(customParam)
        return {
            id1: params.classify_id,
            classifyList: classify.data
        }
    },
    methods: {
      setSort (i, j){
        let $this = this
        let customParam = {
          id1: this.id1,
          order: i,
          dir: j
        }
        axios.post('/api/classifylist', customParam)
        .then(function(res){
            if(res.data.code == 1){
              $this.classifyList = res.data.data
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
</script>
