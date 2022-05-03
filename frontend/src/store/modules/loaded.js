const state = {
  loaded: false,
}

const mutations = {
  SET_LOAD: (state, status) => {
    state.loaded = status
  },
}

const actions = {}

export default { namespaced: true, state, mutations, actions }
