export default {
  state: () => ({
    code: '',
    listCountries: []
  }),
  mutations: {
    setCode (state, data) {
      state.code = data
      console.log('here for Code', data)
    },
    setListCountries (state, data) {
      state.listCountries = data
      console.log('here for listCountries', data)
    }
  },
  actions: {
    async initListCountries ({ commit }) {
      //  const dataProfiles = await this.$axios.$get(this.$config.apiURL + '/profiles_select.php')
      //   commit('setListProfiles', dataProfiles)
      // on ne limite plus la liste, const data = await this.$axios.$get(this.$config.apiURL + '/cyberAPI/countries_select.php?id_prof='+dataProfiles.entries[0]['id'])
      const data = await this.$axios.$get(this.$config.apiURL + '/get_countries.php')
      console.log('initListCountries', data)
      commit('setListCountries', data)
    }
  },
  getters: {
    isAuthenticated: (state) => {
      return state.auth.loggedIn
    },

    loggedInUser: (state) => {
      return state.auth.user
    }
  }
}
