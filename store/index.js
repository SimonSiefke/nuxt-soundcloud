import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      activeSoundcloudPlayerId: 0
    },
    mutations: {
      activate(state, id) {
        state.activeSoundcloudPlayerId = id
      }
    }
  })
}

export default createStore
