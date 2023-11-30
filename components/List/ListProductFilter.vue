<template>
  <div class="settings-header mb-5">
    <div class="d-flex">
      <b-button variant="outline-primary" @click="filter.open = !filter.open">
        Filter
        <font-awesome-icon :icon="['fas', filter.open ? 'caret-up' : 'caret-down']" />
      </b-button>
      <div class="btn-group ml-auto">
        <button class="btn btn-outline-primary" :class="{'active': !tileOrList}" @click="changeTile(false)">
          <font-awesome-icon :icon="['fas', 'list']" />
        </button>
        <button class="btn btn-outline-primary" :class="{'active': tileOrList}" @click="changeTile(true)">
          <font-awesome-icon :icon="['fas', 'border-all']" />
        </button>
      </div>
    </div>

    <b-collapse v-model="filter.open" class="mt-2 w-100">
      <p>Categories:</p>
      <div class="">
        <select v-model="filter.selectCategory" class="custom-select" @change="loadCategory()">
          <option value="" selected>
            All
          </option>
          <option v-for="cat in filter.categories" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>
      </div>
      <p>Count products on page:</p>
      <div class="input-group mb-3" style="width: 10rem;">
        <div class="input-group-prepend">
          <button class="btn btn-outline-secondary" type="button" @click="filter.countProducts > 1 ? filter.countProducts-- : ''">
            <font-awesome-icon :icon="['fas', 'minus']" />
          </button>
        </div>
        <input
          v-model="filter.countProducts"
          type="number"
          min="1"
          max="30"
          class="form-control"
          style="text-align: center;"
        >
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="filter.countProducts < 30 ? filter.countProducts++ : ''">
            <font-awesome-icon :icon="['fas', 'plus']" />
          </button>
        </div>
      </div>

      <p>Order By:</p>
      <select v-model="filter.orderBy" class="custom-select">
        <option v-for="order in orders" :key="order.value" :value="order.value">
          {{ order.name }}
        </option>
      </select>
    </b-collapse>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
export default {
  data: () => ({
    orders: [
      { name: 'By name', value: 'name' },
      { name: 'From cheap to expencive', value: 'priceUp' },
      { name: 'From expencive to cheap', value: 'priceDown' }
    ]
  }),
  computed: {
    filter () {
      return this.$store.state.filter
    },
    tileOrList () {
      return this.$store.state.tileOrList
    }
  },
  methods: {
    loadCategory () {
      if (this.filter.selectCategory !== '') {
        this.loadProductCategoryAct({
          category: this.filter.selectCategory
        })
      } else {
        this.loadProductsAct()
      }
      this.filter.currentPage = 1
    },
    ...mapActions([
      'loadProductCategoryAct',
      'loadProductsAct'
    ]),
    ...mapMutations([
      'changeTile'
    ])
  }
}
</script>
