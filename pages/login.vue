<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card>
          <!-- <v-card-title>
            LOGIN <br>
            url:  {{ $config.apiURL }} <br>
            filesURL:  {{ $config.filesURL }} <br>
            sysenv env: {{ $config.sysenv }}
          </v-card-title> -->
          <v-form method="post" @submit.prevent="loginUser">
            <v-card-text>
              <comp-text v-model="email" label="email" color="info" />
              <comp-text v-model="password" type="password" label="Password" color="info" />
              <v-btn color="info" type="submit">
                Login
              </v-btn>
            </v-card-text>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
    <v-snackbar
      v-model="snackbar"
      :color="snackcolor"
      :timeout="timeout"
    >
      {{ snacktext }}
    </v-snackbar>
  </v-container>
</template>

<script>
import compText from '~/components/compText.vue'

export default {
  components: { compText }, // pour n'y accéder que si not logged
  layout: 'empty',
  // middleware: 'guest',
  data () {
    return {
      email: '',
      password: '',
      snackbar: false,
      snackcolor: 'warning',
      snacktext: '',
      vertical: true,
      timeout: 3000
    }
  },
  methods: {
    async loginUser () {
      console.log('username', this.email)
      console.log('pass', this.password)
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password,
            code: this.code
          }
        })
        console.log('if', this.$auth.$state.user.code)
        console.log('if cond', this.$auth)
        if (this.$auth.$state.user.code === 0) {
          console.log('if in if')
          this.snacktext = 'User or Password Incorrect'
          this.snackbar = true
          this.snackcolor = 'warning'
          // this.$router.push('./login')
          // alert(this.snacktext)
        } else {
          console.log('if in else')
          this.$router.push('./')
        }
        // console.log('auth', this.$auth)
        // console.log('user', this.$auth.user)
        // //   this.loadData() // on recharge
        // // if (this.$auth && this.$auth.$store && this.$auth.$store.loggedIn && !this.$auth.$store.redirect) { this.$router.push('./') }
        // commented to go on the requested page rather than the home page
      } catch (e) {
        this.snacktext = 'Invalid email or password !'
        this.snackcolor = 'error'
        this.snackbar = true
        console.log('error', e)
        console.log(this.error)
      }
    }
  }
}
</script>
