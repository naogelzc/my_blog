const state = {
  // lang: 'zh-CN',
  lang: 'en-US',
}

const mutations = {
  SET_LANG: (state, lang) => {
    state.lang = lang
  },
}

const actions = {}

export default { namespaced: true, state, mutations, actions }
