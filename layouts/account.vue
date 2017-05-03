<template>
  <div class="main-wrapper">
    <my-header/>
    <Sidebar/>
    <div class="main-container">
      <my-nav></my-nav>
      <nuxt/>
    </div>
    <my-footer/>
  </div>
</template>

<script>
import MyFooter from '~components/global/Footer.vue'
import MyHeader from '~components/global/Header.vue'
import MyNav from '~components/MyNav.vue'
import Sidebar from '~components/global/Sidebar.vue'

export default {
  head: {
    title: '我的美美箱'
  },
  components: {
    MyFooter, MyHeader, MyNav, Sidebar
  }
}
</script>
