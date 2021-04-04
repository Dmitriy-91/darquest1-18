import axios from 'axios'
import Vue from 'vue'
import router from '../api/routes'
import auth from '../api/auth'

const csrfUri = router.auth['csrf-cookie']

axios.defaults.withCredentials = true

axios.defaults.baseURL = 'http://darquest.loc'

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.common['Content-Type'] = 'application/json'

axios.interceptors.request.use(async function (config) {
  const currentUri = config.url
  // Если нет заголовка csrf token, то сделаем запрос на его получение
  if (axios.defaults.headers.common['X-XSRF-TOKEN'] === undefined &&
    currentUri !== csrfUri) {
    await auth.csrf()
  }
  return config
}, function (error) {
  if (
    error.response &&
    [401, 419].includes(error.response.status)
    // &&
    // store.getters["auth/authUser"] &&
    // !store.getters["auth/guest"]
  ) {
    // store.dispatch("auth/logout");
  }

  console.log(error)
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response.data
}, error => {
  // if (error.response && error.response.data) {
  //   // handle your errors here.
  //   handleServerErrors(error.response.data)
  // }
  return Promise.reject(error)
})

Vue.prototype.$axios = axios

export default axios
