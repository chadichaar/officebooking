// https://github.com/robinvdvleuten/vuex-persistedstate

import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'oneClick',
    paths: ['code']
  })(store)
}
