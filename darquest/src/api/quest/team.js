import axios from '../../boot/axios'
import router from '../index'

class Team {
  nameIsUnique (name) {
    return axios.get(router.routes.quest.team['name-is-unique'] + '/' + name)
  }

  store ({ name }) {
    return axios.post(router.routes.quest.team.store, {
      name
    })
  }
}

export default new Team()
