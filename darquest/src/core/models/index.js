import VuexORM from '@vuex-orm/core'
import VuexORMAxios from '@vuex-orm/plugin-axios'
import axios from 'axios'

import User from './user'

// Create a new instance of Database.
const database = new VuexORM.Database()

// Register Models to Database.
database.register(User)

VuexORM.use(VuexORMAxios, {
  axios,
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  baseURL: 'test-server.loc/api/'
})

export default database
