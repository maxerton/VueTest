<template>
  <div class="card mx-2" style="max-width: 100%; min-width: 80%; min-height: 30rem;">
    <img class="card-img-top custom-img" :src="product.image" alt="">
    <div class="card-body">
      <h5 class="card-title" style="height: 3em;">
        {{ truncateString(product.title, 35) }}
      </h5>
      <p class="card-text">
        {{ truncateString(product.description, 40) }}
      </p>
      <a href="#" class="btn btn-primary">Buy</a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: {
        id: Number,
        title: String,
        price: Number,
        description: String,
        category: String,
        image: String,
        rating: {
          rate: Number,
          count: Number
        }
      },
      required: true
    }
  },
  methods: {
    truncateString (str, maxLength) {
      if (str.length > maxLength) {
        return str.substring(0, maxLength) + '...'
      } else {
        return str
      }
    }
  }
}
</script>

<style>
.custom-img {
  height: 15rem;
  object-fit:contain;
  object-position: center center;
  padding: 0.5rem;
}
</style>
