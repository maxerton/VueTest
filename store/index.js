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
    }
  },
  plugins: [vuexLocal.plugin]
})

const loadProducts = async () => {
  const response = await axios.get('https://fakestoreapi.com/products')
  return response.data
}

export default () => {
  return createStore
}

// export const state = () => ({
//   listProducts: []
// })

// export const mutations = {
//   getProduct (state) {

//   },
//   writeProducts (state, payload) {
//     state.listProducts = payload.data
//   }
// }

// export const actions = {
//   async loadProductsAct ({ commit }) {
//     const f = await loadProducts()
//     commit('writeProducts', { data: f })
//   },
//   async nuxtServerInit ({ commit }) {
//     const f = await loadProducts()
//     commit('writeProducts', { data: f })
//   }
// }
