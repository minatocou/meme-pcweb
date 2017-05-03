<template>
  <div class="my-wrapper">
    <my-nav></my-nav>
    <div class="my-voucher">{{name}}</div>
  </div>
</template>

<script>
export default {
  layout: 'account',
  data (context) {
    // called every time before loading the component
    return { name: 'voucher page' }
  }
}
</script>
