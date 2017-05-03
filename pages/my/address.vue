<template>
  <div class="my-wrapper">
    <div class="my-address">{{name}}</div>
  </div>
</template>

<script>
export default {
  layout: 'account',
  data (context) {
    // called every time before loading the component
    return { name: 'address page' }
  }
}
</script>

