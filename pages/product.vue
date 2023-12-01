<template>
  <div class="root-wrapper">
    <RootHeader />
    <div class="container">
      <div class="card mx-auto my-5" style="max-width: 800px; min-width: 300px; width: 60%;">
        <img class="card-img-top custom-img" :src="product.image" alt="">
        <div class="card-body">
          <h5 class="card-title">
            {{ product.title }}
          </h5>
          <p style="color: #aaa; opacity: .6;">
            {{ product.category }}
          </p>
          <p class="card-text">
            {{ product.description }}
          </p>
          <div class="d-flex justify-content-between">
            <div>
              <div class="product-card__price mb-2">
                {{ product.price }} $
              </div>
            </div>
            <div>
              <ListProductItemRating :rating="product.rating" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <RootFooter />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data: () => ({
    product: {}
  }),
  computed: {
    getId: () => {
      const uri = window.location.search.substring(1)
      const params = new URLSearchParams(uri)
      return params.get('id')
    }
  },
  mounted () {
    // const t = this
    setTimeout(() => {
      const h = this.loadProductAct({
        id: this.getId
      })
      h.then((resp) => {
        this.$data.product = resp
      })
    }, 0)
  },
  methods: {
    ...mapActions([
      'loadProductsAct',
      'loadProductAct'
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
