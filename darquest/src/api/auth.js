import router from './index'

export default new class {

  csrf () {
    return axios.get(router.auth['csrf-cookie'])
  }

  login ({ email, password }) {
    return axios.post(router.auth.login, { email, password })
  }

  register ({ username, email, password, confirmPassword }) {
    return axios.post(router.auth.register, {username, email, password, confirmPassword})
  }
}
