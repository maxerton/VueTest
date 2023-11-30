<template>
  <div class="container mt-5">
    <div class="settings-header mb-5 d-flex">
      <div class="btn-group ml-auto">
        <button class="btn btn-outline-primary" :class="{'active': !tileOrList}" @click="changeListTile(false)">
          <font-awesome-icon :icon="['fas', 'list']" />
        </button>
        <button class="btn btn-outline-primary" :class="{'active': tileOrList}" @click="changeListTile(true)">
          <font-awesome-icon :icon="['fas', 'border-all']" />
        </button>
      </div>
    </div>
    <div :class="tileOrList ? 'row row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1 px-2': ''">
      <div v-for="product in products" :key="product.id" class="mb-3">
        <ListProductItemCard v-if="tileOrList" :product="product" />
        <ListProductItemList v-else :product="product" />
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
  },
  data: () => ({
    tileOrList: false
  }),
  methods: {
    changeListTile (state) {
      this.tileOrList = state
    }
  }
}
</script>
