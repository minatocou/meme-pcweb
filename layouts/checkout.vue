<template>
  <div class="main-wrapper">
    <my-header/>
    <Sidebar/>
    <header-nav/>
    <div class="main-container">
      <cart-load/>
      <nuxt/>
    </div>
    <my-footer/>
  </div>
</template>

<script>
import MyFooter from '~components/global/Footer.vue'
import MyHeader from '~components/global/Header.vue'
import HeaderNav from '~components/global/HeaderNav.vue'
import CartLoad from '~components/CartLoad.vue'
import Sidebar from '~components/global/Sidebar.vue'

export default {
  components: {
    MyFooter, MyHeader, CartLoad, Sidebar
  }
}
</script>
