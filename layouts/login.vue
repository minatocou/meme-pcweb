<template>
  <div class="main-wrapper">
    <my-header/>
    <Sidebar/>
    <header-nav/>
    <div class="main-container">
      <nuxt/>
    </div>
    <my-footer/>
  </div>
</template>

<script>
import MyFooter from '~components/global/Footer.vue'
import MyHeader from '~components/global/Header.vue'
import Sidebar from '~components/global/Sidebar.vue'

export default {
  components: {
    MyFooter, MyHeader, Sidebar
  }
}
</script>
