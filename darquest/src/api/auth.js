import axios from 'axios'
import router from './index'

class Auth {
  csrf () {
    return axios.get(router.auth['csrf-cookie'])
  }

  login ({ email, password }) {
    return axios.post(router.auth.login, { email, password })
  }

  register ({ name, email, password, confirmPassword, rememberToken }) {
    return axios.post(router.auth.register,
      { name, email, password, confirmPassword, rememberToken }
    )
  }
}

export default new Auth()
