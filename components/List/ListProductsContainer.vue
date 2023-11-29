<template>
  <div class="container mt-5">
    <div class="row row-cols-md-4 px-2">
      <div v-for="product in products" :key="product.id" class="mb-3">
        <ListProductItemCard :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    products: {
      type: Array,
      required: true
    }
  }
}
</script>
