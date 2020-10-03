export const state = () => ({
  name: ''
})

export const mutations = {
  updateData: function (state, payload) {
    state.name = payload
  }
}

export const actions = {
  updateDataAction({commit}, payload) {
    commit('updateData', payload)
  }
}