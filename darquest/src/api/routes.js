export default {
  auth: {
    'csrf-cookie': '/sanctum/csrf-cookie',
    login: '/login',
    register: '/register',
    'forgot-password': '/forgot-password',
    'reset-password': '/reset-password',
    logout: '/logout',
    user: '/api/auth-user'
  },
  quest: {
    team: {
      'name-is-unique': '/api/quest/team/name-is-unique',
      store: '/api/quest/team'
    }
  }
}
