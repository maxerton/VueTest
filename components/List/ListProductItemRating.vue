<template>
  <span style="text-wrap: nowrap;">
    <span style="position: relative;">
      <span>
        <ListProductItemStar v-for="c in 5" :key="c" reg />
      </span>
      <span class="list-products__rating-second-star" :style="{'width': `${Math.round(rating.rate * 20)}%`}">
        <div style="width: max-content;">
          <ListProductItemStar v-for="c in 5" :key="c" />
        </div>
      </span>
    </span>
    <span>{{ rating.count }}</span>
  </span>
</template>

<script>
export default {
  props: {
    rating: {
      type: {
        rate: Number,
        count: Number
      },
      require: true,
      default: {
        rate: 0,
        count: 0
      }
    }
  }
}
</script>

<style>
.list-products__rating-second-star {
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
}
</style>
