<template>
  <div>
    <v-container>
      <v-row v-show="false" justify="center" align="center">
        <v-col cols="12" sm="8" md="6">
          <div class="text-center">
            <logo />
            <vuetify-logo />
          </div>
          <v-card>
            code= {{ $store.state.code }}
            <v-card-title class="headline">
              Welcome to the Vuetify + Nuxt.js template
            </v-card-title>
            <v-card-text>
              <p>Vuetify is a progressive Material Design component framework for Vue.js. It was designed to empower developers to create amazing applications.</p>
              <p>
                For more information on Vuetify, check out the <a
                  href="https://vuetifyjs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  documentation
                </a>.
              </p>
              <p>
                If you have questions, please join the official <a
                  href="https://chat.vuetifyjs.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="chat"
                >
                  discord
                </a>.
              </p>
              <p>
                Find a bug? Report it on the github <a
                  href="https://github.com/vuetifyjs/vuetify/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="contribute"
                >
                  issue board
                </a>.
              </p>
              <p>Thank you for developing with Vuetify and I look forward to bringing more exciting features in the future.</p>
              <div class="text-xs-right">
                <em><small>&mdash; John Leider</small></em>
              </div>
              <hr class="my-3">
              <a
                href="https://nuxtjs.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Nuxt Documentation
              </a>
              <br>
              <a
                href="https://github.com/nuxt/nuxt.js"
                target="_blank"
                rel="noopener noreferrer"
              >
                Nuxt GitHub
              </a>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="primary"
                nuxt
                to="/inspire"
              >
                Continue
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-if="$auth.$state.user && $auth.$state.user !==0" class="ma-0 pa-0">
        <v-col cols="12" xs="12" sm="12" md="6" class="ma-0 pa-0">
          <comp-calendar
            :items="reservations"
            :modeview="modeview"
            :display-field="displayField"
            :event-headers="eventHeaders"
            start-date="fromDate"
            end-date="toDate"
            :colors="colors"
            :grouped="true"
            class="ma-0 pa-0"
          />
        </v-col>
        <v-col cols="12" xs="12" sm="12" md="6">
          <v-card color="teal darken-1">
            <v-card-title>
              Available Employees (from {{ firstday }} To {{ lastday }})
              <v-spacer />
              <v-select
                v-model="selectedType"
                :items="selectType"
                item-text="label"
                item-value="value"
                label="Period"
                persistent-hint
                return-object
                single-line
                color="black"
              />
            </v-card-title>
          </v-card>
          <br>

          <v-container class="sizingscroll">
            <v-row>
              <template v-for="reserve in weekReservations">
                <v-col :key="reserve.reserveCode" col="6">
                  <comp-user-reservation
                    :user-name="reserve.employeeName"
                    :file-name="reserve.fileName"
                    :department="reserve.department"
                    :officename="reserve.officeName"
                    :bookdate="reserve.fromDate"
                    :book-to-date="reserve.toDate"
                  />
                </v-col>
              </template>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
      <v-row v-if="!$auth.$state.user">
        <!-- C://wamp64//www//test//img// -->
        <v-container style="background-image: url('http://localhost/test/img/landing_page.jpg'); min-height=500px; background-size: cover;">
          <div>
            <v-row>
              <v-col cols="12" sm="8" md="6">
                <v-card color="black" style="opacity:0.6">
                  <v-card-title style="color:white; align:center">
                    Sign Up
                  </v-card-title>
                  <hr>
                  <v-card-text>
                    <br><br><br>
                    <form>
                      <comp-text v-model="registration.companyName" type="text" label="Company Name" color="black" background-color="darkgrey" /><br>
                      <!-- <comp-text type="text" label="Country" color="black" background-color="darkgrey" /><br> -->
                      <comp-select
                        v-model="registration.coCode"
                        label="Country"
                        :items="$store.state.listCountries"
                        background-color="darkgrey"
                        item-text="value"
                        item-value="code"
                        :clearable="true"
                        :is-read-only="false"
                      />
                      <comp-select
                        v-model="registration.title"
                        label="Title"
                        :items="titles"
                        background-color="darkgrey"
                        item-text="value"
                        item-value="code"
                        :clearable="true"
                        :is-read-only="false"
                      />
                      <comp-text v-model="registration.firstName" type="text" label="First Name" color="black" background-color="darkgrey" /><br>
                      <comp-text v-model="registration.lastName" type="text" label="Last Name" color="black" background-color="darkgrey" /><br>
                      <comp-text v-model="registration.email" type="email" label="Email" color="black" background-color="darkgrey" /><br>
                      <comp-text v-model="registration.password" type="password" label="Password" color="black" background-color="darkgrey" /><br>
                    </form>
                    <br><br>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn @click="signUp()">
                      Sign Up
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
              <v-col cols="12" sm="8" md="6">
                <v-card color="white" opacity="0.9">
                  <v-card-title>
                    <p /><p /><p /><p />
                    <h1 style="color:black">
                      OfficeBooking.com is a must after COVID-19 pandamic <br> to manage empployees working time between Home and offices
                    </h1>
                  </v-card-title>
                  <v-card-text>
                    <hr>
                    <p />
                    <h2 style="color:black">
                      The pandemic will not be ‘the death of the office,’ as some have suggested, but working from home also won’t become entirely a thing of the past.
                      <p />
                      Many workers wouldn’t want it that way because they enjoy the freedom and flexibility it gives them.
                      <p />
                      The solution for the future is a structured hybrid model, acknowledging that working from home doesn’t work long-term for most jobs, while still giving workers flexibility.
                      <p />
                      One way to do that would be to allocate time slots—perhaps specific days—of in-office working for all employees to maintain workplace productivity and collaboration, while also allowing working from home to continue outside those hours.
                    </h2>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </v-container>
      </v-row>

      <v-snackbar
        v-model="snackbar"
        :color="snackColor"
        :timeout="timeout"
      >
        {{ snackbarText }}
      </v-snackbar>
    </v-container>
  </div>
</template>
<script>
import CompCalendar from '~/components/compCalendar.vue'
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import CompUserReservation from '~/components/compUserReservation.vue'
import CompSelect from '~/components/compSelect.vue'

export default {
  components: {
    Logo,
    VuetifyLogo,
    CompCalendar,
    CompUserReservation,
    CompSelect
  },
  middleware: 'auth',
  data () {
    return {
      snackbar: false,
      snackbarText: 'Lorem ipsum dolor sit amet',
      snackbarVertical: true,
      snackColor: 'primary',
      timeout: 2000,
      registration: {},
      titles: [{ code: 'Mr.', value: 'Mr.' }, { code: 'Mrs.', value: 'Mrs.' }, { code: 'Dr.', value: 'Dr.' }, { code: 'Eng', value: 'Eng' }],
      reservations: [],
      eventHeaders: [
        { text: 'Office Name', value: 'officeName' },
        { text: 'Employee', value: 'employeeName' },
        { text: 'Department', value: 'department' },
        { text: 'From Date', value: 'fromDate' },
        { text: 'To Date', value: 'toDate' }
      ],
      displayField: 'employeeName',
      modeview: ['M', 'D'],
      grouped: true,
      colors: ['nascoDarkBlue lighten-5', 'primary darken-1', 'secondary darken-1', 'primary darken-4'],
      weekReservations: [],
      firstday: Date,
      lastday: Date,
      daysNbr: 6,
      selectedType: 6,
      selectType: [
        { label: 'One Week', value: 6 },
        { label: 'Two Weeks', value: 13 },
        { label: 'Three Weeks', value: 20 },
        { label: 'One Month', value: 30 }
      ]
    }
  },
  computed: {
    compSelectedType () {
      return this.selectedType
    },
    dataToSave () {
      return this.registration
    },
    dataToSend () {
      return {
        email: this.$auth.$state.user.username,
        companyId: this.$auth.$state.user.companyId
      }
    }
  },
  watch: {
    compSelectedType () {
      console.log('type', this.selectedType.value)
      this.daysNbr = this.selectedType.value
      const curr = new Date()
      const first = curr.getDate() - curr.getDay()
      const last = first + this.daysNbr
      this.firstday = new Date(curr.setDate(first)).toISOString().split('T')[0]
      this.lastday = new Date(curr.setDate(last)).toISOString().split('T')[0]

      // alert(this.firstday + ' - ' + lastday)

      this.weekReservations = this.reservations.filter(i => (i.fromDate >= this.firstday && i.fromDate <= this.lastday) ||
      (i.toDate >= this.firstday && i.toDate <= this.lastday))
    }

  },
  mounted () {
    // console.log('env NODE_ENV', process.env.NODE_ENV)
    // console.log('env config', this.$config)
    // console.log('env apiURL', this.$config.apiURL)
    // console.log('env filesURL', this.$config.filesURL)
    // console.log('env apiAuthURL', this.$config.apiAuthURL)
    // console.log('env sysenv', this.$config.sysenv)
    // console.log('env process.env.NODE_ENV prod', process.env.NODE_ENV === 'production') // True if ran test else false
    // console.log('env process.env.NODE_ENV trim', process.env.NODE_ENV.trim() === 'production') // True if ran test else false

    // console.log('env process.env.NODE_ENV development', process.env.NODE_ENV === 'development') // True if ran test else false
    // console.log('env process.env.NODE_ENV development trim', process.env.NODE_ENV.trim() === 'development') // True if ran test else false

    this.loadData()
  },
  methods: {
    loadData () {
      this.loading = true
      this.$axios.$post(this.$config.apiURL + '/get_reservations.php', 'data=' + JSON.stringify(this.dataToSend))
        .then((response) => {
          // this.tempusertest = Object.assign([], response.user)
          // this.userProfile = response && response[0] ? response[0] : []
          console.log('users', response)
          this.reservations = response
          const curr = new Date()
          const first = curr.getDate() - curr.getDay()
          const last = first + this.daysNbr
          this.firstday = new Date(curr.setDate(first)).toISOString().split('T')[0]
          this.lastday = new Date(curr.setDate(last)).toISOString().split('T')[0]

          // alert(this.firstday + ' - ' + lastday)
          this.weekReservations = this.reservations.filter(i => (i.fromDate >= this.firstday && i.fromDate <= this.lastday) ||
          (i.toDate >= this.firstday && i.toDate <= this.lastday))
          this.loading = false
        })
        .catch((error) => {
          console.log(error)
          this.loading = false
          // this.isLoadingGlobal = false
          // this.annuaire = error;
        })
      this.loading = false
    },
    signUp () {
      if (!this.registration.companyName) {
        this.snackbar = true
        this.snackbarText = 'Fill Company Name'
        this.snackColor = 'warning'
      } else if (!this.registration.coCode) {
        this.snackbar = true
        this.snackbarText = 'Fill Country'
        this.snackColor = 'warning'
      } else if (!this.registration.title) {
        this.snackbar = true
        this.snackbarText = 'Fill title'
        this.snackColor = 'warning'
      } else if (!this.registration.firstName) {
        this.snackbar = true
        this.snackbarText = 'Fill your First Name'
        this.snackColor = 'warning'
      } else if (!this.registration.lastName) {
        this.snackbar = true
        this.snackbarText = 'Fill your Last Name'
        this.snackColor = 'warning'
      } else if (!this.registration.email) {
        this.snackbar = true
        this.snackbarText = 'Fill your Email'
        this.snackColor = 'warning'
      } else if (!this.registration.password) {
        this.snackbar = true
        this.snackbarText = 'Fill your Password'
        this.snackColor = 'warning'
      }
      this.$axios.$post(process.env.apiURL + '/signup.php', 'data=' + JSON.stringify(this.dataToSave))
        .then((response) => {
          // this.tempusertest = Object.assign([], response.user)
          // this.userProfile = response && response[0] ? response[0] : []
          console.log('response', response)
          if (response.countryCount > 0) {
            this.snackbarText = 'Company already registered'
            this.snackColor = 'warning'
            this.snackbar = true
          } else if (response.emailCount > 0) {
            this.snackbarText = response.emailResponse
            this.snackColor = 'warning'
            this.snackbar = true
          } else {
            this.snackbarText = 'User Registered propely, Welcome on board'
            this.snackColor = 'info'
            this.snackbar = true
          }
          this.loading = false
        })
        .catch((error) => {
          console.log(error)
          this.loading = false
          // this.isLoadingGlobal = false
          // this.annuaire = error;
        })
    }
  }
}
</script>
<style scoped>
.sizingscroll {
 height: 500px;
 max-height: 500px;
 width: 100%;
 min-width: 100%;
 overflow-y: scroll;
}
</style>
