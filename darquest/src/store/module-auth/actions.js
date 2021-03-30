import api from 'src/api/index'

export async function getUser ({ commit }) {
  const response = await api.auth.authUser()
  if (response.status === 200) {
    const data = response.data.data
    commit('setUser', data)
  }
}

export async function logout ({ commit, dispatch }) {
  return api.auth.logout()
    .then(() => {
      commit('setUser', null)
    })
    .catch((error) => {
      // ToDo set error to vuex state
      // commit("SET_ERROR", getError(error));
      console.log(error)
    })
}
