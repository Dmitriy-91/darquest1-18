import axios from 'axios'
import Vue from 'vue'

axios.defaults.withCredentials = true

axios.defaults.baseURL = 'http://darquest.loc'

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.common['Content-Type'] = 'application/json'

axios.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

Vue.prototype.$axios = axios

export default axios
