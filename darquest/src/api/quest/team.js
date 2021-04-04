import axios from '../../boot/axios'
import routes from '../routes'

class Team {
  nameIsUnique (name) {
    return axios.get(routes.quest.team['name-is-unique'] + '/' + name)
  }

  store ({ name }) {
    return axios.post(routes.quest.team.store, {
      name
    })
  }
}

export default new Team()
