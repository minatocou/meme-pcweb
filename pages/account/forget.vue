<template>
  <h1 class="red">{{ name }}!</h1>
</template>

<script>
export default {
  data (context) {
    // called every time before loading the component
    return { name: 'forget page' }
  },
  fetch () {
    // The fetch method is used to fill the store before rendering the page
  }
}
</script>
