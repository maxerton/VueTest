import axios from 'axios'
import { Store } from 'vuex'
import { VuexPersistence } from 'vuex-persist'
// import vuexPersist from '~/plugins/vuex-persist'

const vuexLocal = new VuexPersistence({
  key: 'root',
  storage: window.localStorage
})

const createStore = () => new Store({
  state: {
    listProducts: [],
    filter: {
      open: false,
      categories: [],
      selectCategory: '',
      currentPage: 1,
      countProducts: 5,
      orderBy: 'name'
    },
    productInfo: {},
    tileOrList: false
  },
  mutations: {
    writeProducts (state, payload) {
      state.listProducts = payload.data
    },
    writeFilter (state, payload) {
      state.filter = payload.filter
    },
    writeProduct (state, payload) {
      state.productInfo = payload.product
    },
    changeTile (state, payload) {
      state.tileOrList = payload
    }
  },
  actions: {
    async loadProductsAct ({ commit }) {
      const f = await loadProducts()
      commit('writeProducts', { data: f })
    },
    async loadProductsLimitAct ({ commit }, { limit }) {
      const f = await loadProductsByLimit(limit)
      commit('writeProducts', { data: f })
    },
    async loadProductCategoriesAct () {
      return await loadProductCategories()
    },
    async loadProductCategoryAct ({ commit }, { category }) {
      const f = await loadProductCategory(category)
      commit('writeProducts', { data: f })
    },
    async loadProductAct ({ commit }, { id }) {
      const f = await loadProductById(id)
      commit('writeProduct', { product: f })
    }
  },
  plugins: [vuexLocal.plugin]
})

const loadProducts = async () => {
  const response = await axios.get('https://fakestoreapi.com/products')
  return response.data
}

const loadProductsByLimit = async (limit = 5) => {
  const response = await axios.get('https://fakestoreapi.com/products?limit=' + limit)
  return response.data
}

const loadProductCategories = async () => {
  const response = await axios.get('https://fakestoreapi.com/products/categories')
  return response.data
}

const loadProductCategory = async (category) => {
  const response = await axios.get('https://fakestoreapi.com/products/category/' + category)
  return response.data
}

const loadProductById = async (id) => {
  const response = await axios.get('https://fakestoreapi.com/products/' + id)
  return response.data
}

export default () => {
  return createStore
}
