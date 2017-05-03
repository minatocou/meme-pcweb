<template>
  <div class="index-wrapper">
    <div class="index-container">
      <home-banner :banners="banners"/>
      <hot-products :products="hotProducts"/>
      <category-banner :appbanners="categoryBanners"/>
      <product-list :products="produceLists"/>
    </div>
    <!-- <div>{{homeData}}</div> -->
  </div>
</template>

<script>
import HomeService  from '../service/home'
import HotProducts from '../components/homepage/HotProducts'
import HomeBanner from '../components/homepage/HomeBanner'
import CategoryBanner from '../components/homepage/CategoryBanner'
import ProductList from '../components/homepage/ProductList'

export default{
  head: {
    link:[
      {rel: 'stylesheet', href: '/css/home/index.css'},
    ],
  },
  components: {
    HotProducts,HomeBanner,CategoryBanner,ProductList
  },
  async data (context) {
    let homeData = await HomeService.loadHomepage()
    if(homeData.code == '1'){
      return {
        homeData: homeData.data,
        banners: homeData.data.slides,
        hotProducts: homeData.data.hotProducts,
        categoryBanners: homeData.data.appCategoryList,
        produceLists: homeData.data.newProducts
      }
    }
    else{
      return {
        homeData: [],
        banners: [],
        hotProducts: [],
        categoryBanners: [],
        produceLists: []
      }
    }
  }
}
</script>
