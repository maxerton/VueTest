export const state = () => ({
  listProducts: []
})

export const mutations = {
  getProduct (state) {

  },
  writeProducts (state, payload) {
    state.listProducts = payload.data
  }
}
