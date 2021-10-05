<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn small color="light" @click="themeApp()">
        {{ $vuetify.theme.dark ? 'dark' : 'light' }}
      </v-btn>
      <div v-if="$auth.loggedIn && $auth.$state.user !== 0">
        <v-btn v-show="($vuetify.breakpoint.name=='xs' || $vuetify.breakpoint.name=='sm') ? false : true" small color="light" @click="logOut()">
          logout
        </v-btn>
        <span v-show="($vuetify.breakpoint.name=='xs' || $vuetify.breakpoint.name=='sm') ? false : true">
          {{ $auth.$state.user.title }} {{ $auth.$state.user.lastName }}
        </span>
        <v-avatar
          v-if="$auth.$state.user.username"
        >
          <img
            :src="`${$config.filesURL}` + $auth.$state.user.fileName"

            :alt="$auth.$state.user.username"
          >
        </v-avatar>
        <v-avatar
          v-if="!$auth.$state.user.username"
          color="info"
        >
          <v-icon dark>
            mdi-account-circle
          </v-icon>
        </v-avatar>
      </div>
      <div v-else>
        <v-btn text to="/login">
          Log In
        </v-btn>
      </div>
      <!-- <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn> -->
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
      |
      <a href="https://www.linkedin.com/in/chadi-chaar-09608aa8/" target="_blank">
        <img
          width="15"
          src="/linkedin.png"
        >
      </a>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      reservations: [],
      items: [
        {
          icon: 'mdi-home',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-desk',
          title: 'Booking Office',
          to: '/inspire'
        },
        {
          icon: 'mdi-desk',
          title: 'Company Offices',
          to: '/offices'
        },
        {
          icon: 'mdi-account-star-outline',
          title: 'My Profile',
          to: '/profile'
        },
        {
          icon: 'mdi-domain',
          title: 'Company Profile',
          to: '/profiles'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Booking Offices Solution'
    }
  },
  mounted () {
    // alert(localStorage.getItem('themeDark'))
    // this.$vuetify.theme.dark = false //
    if (localStorage.getItem('themeDark') === 'false') {
      this.$vuetify.theme.dark = false
    } else {
      this.$vuetify.theme.dark = true
    }
    this.$store.dispatch('initListCountries')
    // this.loadData()
    // alert(localStorage.getItem('themeDark'))
  },

  methods: {
    themeApp () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      localStorage.setItem('themeDark', this.$vuetify.theme.dark)
    },
    async logOut () {
      await this.$auth.logout()
    }
  },
  loadData () {
    this.$store.dispatch('initListCountries')
    // console.log('listCountries', this.$store.state.listCountries.length)
    // if (this.$store.state.listCountries.length === 0) { // on ne met à jour que si le tableau est vide
    //   this.$store.dispatch('initListCountries')
    //   console.log('initListCountries', this.$store.state.listCountries)
    // }
  }
}

</script>
