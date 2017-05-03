<template>
  <div class="search-result-wrapper">
      <empty v-if="search.code != 1"></empty>
      <div v-else class="search-result-container">
          <el-row class="tac ops left">
              <el-col :span="8">
                  <el-menu class="out">
                      <el-submenu v-for="(v,k,i) in search.filter" :index="i.toString()">
                          <template slot="title">{{stamap[k]}}</template>
                          <el-menu-item v-for="(v1,k1,i1) in v" :index="i.toString() + i1.toString()" @click="orderitem(k,k1)">
                              {{stamap[k1] || k1}}
                          </el-menu-item>
                      </el-submenu>
                   </el-menu>
              </el-col>
          </el-row>
          <div class="ser right">
              <div class="gosearch">
                  <div class="cancelsort" >
                     <el-tag
                      v-for="(v,k,i) in tags"
                      v-if="v"
                      :closable="true"
                      @close="closesort(k,v)"
                    >
                    {{v}}
                    </el-tag>
                  </div>
                  <div class="orderby">
                    <el-button @click="setOrder(1)">综合</el-button>
                    <el-button @click="setOrder(2)">销量</el-button>
                    <el-button class="pri">
                      <span class="pri-t">价格</span>
                        <i class="el-icon-caret-top" @click="setOrder(3)" ></i>
                        <i class="el-icon-caret-bottom" @click="setOrder(4)" ></i>
                    </el-button>
                  </div>
                  <div class="pageblock">
                      <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page= statusmap.pageIndex
                        :page-size= statusmap.pageSize
                        layout="total, sizes, prev, pager, next, jumper"
                        :page-sizes="[10, 20, 50, 100]"
                        :total= totalPros>
                      </el-pagination>
                  </div>
              </div>
              <div class="pros" align="center">
                  <div v-for="product in products" class="ser-pro">
                  <!-- {{product}} -->
                      <common-product-item :productitem="product"/>
                  </div >
              </div>
          </div>
    </div>
  </div>
</template>

<script>
import SearchService from '../../service/search'
import CommonProductItem from '~components/CommonProduct'
import Empty from '~components/Empty.vue'
import axios from 'axios'

export default {
  async data ({query}) {
    let customParam = {
      query: query.query,
      filter: true
    }
    console.log(customParam)
    let searchResult = await SearchService.loadSearchResult(customParam)
    console.log(searchResult)
    return {
      search: searchResult,
      products: searchResult.product,
      totalPros: searchResult.page.total,
      statusmap: {
        q: query.query,
        filter: true,
        pageIndex: 1,
        order: '',
        price: '',
        origin: '',
        category: '',
        functions: '',
        brand: '',
        pageSize: 10,
      },
      stamap: {
        brand: '品牌',
        functions: '功效',
        origin: '发货地',
        category: '分类',
        price: '价格',
        '100.0': '￥0-￥100',
        '200.100': '￥100-￥200',
        '300.200': '￥200-￥300',
        '400.300': '￥300-￥400',
        '以上.400': '￥400以上'
      },
      pricemap: {
        '100.0': '0,100',
        '200.100': '100,200',
        '300.200': '200,300',
        '400.300': '300,400',
        '以上.400': '400,以上'
      },
      tags: {
        price: '',
        origin: '',
        category: '',
        functions: '',
        brand: '',
      }
    }
  },
  head: {
    link: [
        {rel: 'stylesheet', href: '/css/search/result.css'}
    ]
  },
  components: {
      Empty,CommonProductItem
  },
  methods: {
    handleSizeChange(val) {
      let $this = this
      this.statusmap.pageSize = val
      this.searchres($this.statusmap)
    },
    handleCurrentChange(val) {
      let $this = this
      this.statusmap.pageIndex = val
      this.searchres($this.statusmap)
    },
    searchres(param){
      let $this = this
      axios.post('/api/search', param)
      .then(function(res){
          if(res.data.code == 1){
            $this.totalPros = res.data.page.total
            $this.products = res.data.product
            $this.search = res.data
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            throw new Error('Bad credentialssss')
          }
        })
    },
    setOrder(i){
      let $this = this
      this.statusmap.order = i
      this.searchres($this.statusmap)
    },
    closesort(k){
      let $this = this
      this.tags[k] = ''
      this.statusmap[k] = ''
      this.searchres($this.statusmap)
    },
    orderitem( k, k1){
      let $this = this
      if(k == 'price'){
        $this.statusmap[k] = $this.pricemap[k1]
        $this.tags[k] = $this.stamap[k1]
      }
      else{
        $this.statusmap[k] = k1
        $this.tags[k] = k1
      }
      this.searchres($this.statusmap)
    }
  }
}
</script>
