<template>
  <div class="container mt-5">
    <ListProductFilter :changelt="changeListTile" />
    <div :class="tileOrList ? 'row row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1 px-2': ''">
      <div v-for="product in filteredList" :key="product.id" class="mb-3">
        <ListProductItemCard v-if="tileOrList" :product="product" />
        <ListProductItemList v-else :product="product" />
      </div>
    </div>
    <nav>
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: filter.currentPage <= 1 }">
          <button class="page-link" @click="filter.currentPage--; scrollTop()">
            <font-awesome-icon :icon="['fas', 'chevron-left']" />
          </button>
        </li>
        <li v-for="page in Math.ceil(products.length / filter.countProducts)" :key="page" class="page-item" :class="{active: page === filter.currentPage}">
          <button class="page-link" @click="filter.currentPage = page; scrollTop()">
            {{ page }}
          </button>
        </li>
        <li class="page-item" :class="{ disabled: filter.currentPage >= Math.ceil(products.length / filter.countProducts) }">
          <button class="page-link" @click="filter.currentPage++; scrollTop()">
            <font-awesome-icon :icon="['fas', 'chevron-right']" />
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  computed: {
    filteredList: function () {
      const startOffset = (this.filter.currentPage - 1) * this.filter.countProducts
      const endOffset = startOffset + this.filter.countProducts
      const filter = this.filter
      let g = this.products
      g = g.sort(function (a, b) {
        if (filter.orderBy === 'name') {
          const nameA = a.title.toUpperCase()
          const nameB = b.title.toUpperCase()
          if (nameA < nameB) {
            return -1
          }
          if (nameA > nameB) {
            return 1
          }
          return 0
        } else if (filter.orderBy === 'priceUp') {
          const pA = a.price
          const pB = b.price
          return pA - pB
        } else if (filter.orderBy === 'priceDown') {
          const pA = a.price
          const pB = b.price
          return pB - pA
        }
        return 0
      })
      g = g.slice(startOffset, endOffset)
      return g
    },
    filter () {
      return this.$store.state.filter
    },
    tileOrList () {
      return this.$store.state.tileOrList
    }
  },
  mounted () {
    setTimeout(() => {
      if (this.filter.categories.length === 0) {
        this.getCats()
      }
    }, 10)
  },
  methods: {
    changeListTile (state) {
      this.tileOrList = state
    },
    getCats () {
      const test = this.loadProductCategoriesAct()
      test.then((resp) => {
        this.filter.categories = resp
      })
    },
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
    scrollTop () {
      const currentPosition = document.documentElement.scrollTop || document.body.scrollTop
      if (currentPosition > 0) {
        window.requestAnimationFrame(this.scrollTop)
        window.scrollTo(0, currentPosition - currentPosition / 10)
      }
    },
    ...mapActions([
      'loadProductCategoriesAct',
      'loadProductCategoryAct',
      'loadProductsAct',
      'writeFilter'
    ])
  }
}
</script>
