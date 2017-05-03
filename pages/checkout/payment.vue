<template>
  <div class="payment-wrapper"></div>
</template>

<script>
export default {
  head: {
      link: [
          {rel: 'stylesheet', href: '/css/checkout/payment.css'}
      ]
  },
  layout: 'checkout',
  data (context) {
    return { name: 'payment page' }
  },
  fetch () {
    // The fetch method is used to fill the store before rendering the page
  }
  // and more functionality to discover
}
</script>
