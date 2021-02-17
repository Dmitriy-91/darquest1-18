import Vue from 'vue'
import axios from 'axios'

axios.defaults.withCredentials = true;

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Content-Type'] = 'application/json';

Vue.prototype.$axios = axios
