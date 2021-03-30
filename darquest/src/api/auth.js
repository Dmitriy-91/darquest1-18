import axios from '../boot/axios'
import router from './index'

class Auth {
  csrf () {
    return axios.get(router.routes.auth['csrf-cookie'])
  }

  async login ({ email, password, remember }) {
    await this.csrf()
    return axios.post(router.routes.auth.login, {
      email,
      password,
      remember
    })
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

  async resetPassword ({ email, password, confirmPassword, token }) {
    await this.csrf()
    return axios.post(router.routes.auth['reset-password'], {
      email, password, password_confirmation: confirmPassword, token
    })
  }

  logout () {
    return axios.post(router.routes.auth.logout)
  }

  async authUser () {
    await this.csrf()
    return await axios.get(router.routes.auth.user)
  }
}

export default new Auth()
