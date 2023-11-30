<template>
  <div class="card product-card-horizontal mx-2 py-4 px-1">
    <img class="card-img-left custom-img-left" :src="product.image" alt="">
    <div class="card-body" style="width: 75%;">
      <h5 class="card-title text-truncate">
        <a :href="'/product?id=' + product.id" target="_blank">
          {{ product.title }}
        </a>
      </h5>
      <p class="card-text text-truncate">
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
      <p style="font-size: .8em; color: #00000055;">
        {{ product.category }}
      </p>

      <a :href="'/product?id=' + product.id" target="_blank" class="btn btn-outline-primary">
        <font-awesome-icon :icon="['fas', 'cart-shopping']" />
      </a>
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
.product-card-horizontal {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}

.custom-img-left {
  width: 25%;
  max-width: 20rem;
  min-width: 4rem;
  max-height: 15rem;
  object-fit:contain;
  object-position: center center;
  padding: 0.5rem;
}

.product-card__price {
  font-size: larger;
  font-weight: 500;
}
</style>
