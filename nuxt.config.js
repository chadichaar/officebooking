
// dev

// const apiURL = 'http://bookingoffice.infinityfreeapp.com/api/includes'
// const filesURL = 'http://bookingoffice.infinityfreeapp.com/api/img/'
// const apiAuthURL = 'http://bookingoffice.infinityfreeapp.com/api/auth'
import colors from 'vuetify/es5/util/colors'

const apiURL = process.env.NODE_ENV === 'production' ? 'https://officebooking.000webhostapp.com/api/includes' : 'http://localhost/api/includes'
const filesURL = process.env.NODE_ENV === 'production' ? 'https://officebooking.000webhostapp.com/api/img/' : 'http://localhost/test/img/'
const apiAuthURL = process.env.NODE_ENV === 'production' ? 'https://officebooking.000webhostapp.com/api/auth' : 'http://localhost/api/auth'
const sysenv = process.env.NODE_ENV === 'production' ? 'prod' : 'dev'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  publicRuntimeConfig: {
    apiURL,
    filesURL,
    apiAuthURL,
    sysenv
  },
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  head: {
    titleTemplate: '%s - chadi',
    title: 'chadi',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  auth: {
    cookie: {
      options: {
        sameSite: 'lax'
      }
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: apiAuthURL + '/login.php', method: 'post', propertyName: 'data.token' }, // preprod
          user: { url: apiAuthURL + '/me.php', method: 'get', propertyName: 'data' }, // preprod
          logout: false
        },
        tokenRequired: true,
        tokenType: 'Bearer'
      }
    }
  },
  // auth: {
  //   strategies: {
  //     local: {
  //       token: {
  //         property: 'data.token',
  //         required: true,
  //         type: 'Bearer'
  //       },
  //       user: {
  //         property: false
  //       },
  //       endpoints: {
  //         login: { url: apiAuthURL + '/login.php', method: 'post' }, // propertyName: 'data.token' },
  //         user: { url: apiAuthURL + '/me.php', method: 'get', propertyName: 'user' }, // propertyName: 'data' },
  //         logout: true
  //       }
  //       // },
  //       // tokenRequired: true,
  //       // tokenType: 'Bearer'
  //     }
  //   }
  // },

  // auth: {
  //   strategies: {
  //     local: {
  //     //   token: {
  //     //     property: 'data.token',
  //     //     required: true,
  //     //     type: 'Bearer'
  //     //   },
  //       // user: {
  //       // //   peroprty: false,
  //       // //   autoFetch: true
  //       // // },
  //       endpoints: {
  //         login: { url: 'http://localhost/api/auth/login.php', method: 'post', propertyName: 'data.token' }, // dev
  //         user: { url: 'http://localhost/api/auth/me.php', method: 'get', propertyName: 'data' }, // dev
  //         logout: false
  //       },
  //       tokenRequired: true,
  //       tokenType: 'Bearer'
  //     }
  //   }
  // },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
