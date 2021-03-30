import Vue from 'vue'
import Vuex from 'vuex'
import VuexORM from '@vuex-orm/core'
import VuexORMAxios from '@vuex-orm/plugin-axios'
import axios from '../boot/axios'
import { models } from '../core/index'
import auth from './module-auth'

// import example from './module-example'

Vue.use(Vuex)

VuexORM.use(VuexORMAxios, {
  axios,
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  baseURL: '/api'
})

// Create a new instance of Database.
const database = new VuexORM.Database()

// Register Models to Database.
for (const key in models) {
  database.register(models[key])
}

const Store = new Vuex.Store({
  modules: { auth },
  plugins: [VuexORM.install(database)],
  strict: process.env.DEBUGGING
})

export default Store
