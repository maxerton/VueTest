import { VuexPersistence } from 'vuex-persist'

export default ({ store }) => {
  new VuexPersistence({
    key: 'root',
    storage: window.localStorage
  }).plugin(store)
}
