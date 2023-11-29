<template>
  <div class="root-wrapper">
    <RootHeader />
    <div class="container" />
    <ListProductsContainer
      :products="products"
    />
    <RootFooter />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'IndexPage',
  computed: {
    products () {
      return this.$store.state.listProducts
    }
  },
  mounted () {
    setTimeout(() => {
      if (this.$store.state.listProducts.length === 0) {
        this.loadProductsAct()
      }
    }, 10)
  },
  methods: {
    ...mapActions([
      'loadProductsAct'
    ])
  }
}
</script>

<style>
  body {
    background-color: #e8f1fe;
  }

  html, body, .root-wrapper {
    min-height: 100vh;
  }

  .root-wrapper {
    display: flex;
    flex-direction: column;
  }
</style>
