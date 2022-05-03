const state = {
  positionX: 0,
  positionY: 0,
}

const mutations = {
  SET_POSITION: (state, x, y) => {
    state.positionX = x
    state.positionY = y
  },
}

const actions = {}

export default { namespaced: true, state, mutations, actions }
