import axios from '../boot/axios'
import router from './index'

class Auth {
  csrf () {
    return axios.get(router.routes.auth['csrf-cookie'])
  }

  login ({ email, password }) {
    return axios.post(router.auth.login, { email, password })
  }

  register ({ name, email, password, confirmPassword }) {
    return axios.post(router.routes.auth.register,
      { name, email, password, password_confirmation: confirmPassword }
    )
  }

  async forgotPassword ({ email }) {
    await this.csrf()
    return axios.post(router.routes.auth['forgot-password'], { email })
  }
}

export default new Auth()
