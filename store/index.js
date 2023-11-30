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
    listProducts: []
  },
  mutations: {
    getProduct (state) {

    },
    writeProducts (state, payload) {
      state.listProducts = payload.data
    }
  },
  actions: {
    async loadProductsAct ({ commit }) {
      const f = await loadProducts()
      commit('writeProducts', { data: f })
    },
    async loadProductsLimitAct ({ commit, payload }) {
      const f = await loadProductsByLimit(payload.limit)
      commit('writeProducts', { data: f })
    },
    async loadProductCategoriesAct ({ commit, payload }) {
      const f = await loadProductCategories()
      commit('writeProducts', { data: f })
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

export default () => {
  return createStore
}
