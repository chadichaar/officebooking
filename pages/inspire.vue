<template>
  <v-container>
    <v-card v-if="$auth.$state.user.code > 0" class="pa-4 mb-4" :loading="loading">
      <v-card-title>
        <v-toolbar
          color="info"
          dark
        >
          <v-icon large>
            mdi-desk
          </v-icon> <h2>
            &nbsp;&nbsp;-&nbsp;&nbsp;Book Your Office
          </h2>
          <v-spacer />
          <v-btn color="white info--text" @click="showfilter = !showfilter">
            check Available offices
          </v-btn>
        </v-toolbar>
      </v-card-title>
      <v-card-text>
        <v-row v-show="showfilter">
          <v-col cols="12" sm="8" md="3" />

          <v-col cols="12" sm="8" md="6">
            <v-card>
              <comp-date v-model="filterFromDate" label="From Date" color="info" />
              <v-spacer />
              <comp-date v-model="filterToDate" label="To Date" color="info" />
              <v-card-actions>
                <v-btn color="info" @click="filterOfficesPerDate()">
                  Available Free Offices
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-col cols="12" sm="8" md="3" />

    <v-row>
      <template v-for="voffice in mainOffices">
        <v-col :key="voffice.id" class="ma-0 pa-0">
          <v-card
            class="ma-0 pa-0"
            @click="reserveOffice(voffice)"
          >
            <v-card-title
              color="info"
              dark
            >
              <v-toolbar
                color="info"
                dark
              >
                {{ voffice.department }}
              </v-toolbar>
            </v-card-title>
            <v-card-text>
              <p /><h2>Name: {{ voffice.officeName }}</h2>
              <p /><h2>Floor: {{ voffice.floor }}</h2>
              <p /><h3 v-if="voffice.employeeName">
                Booked by {{ voffice.employeeName }} on {{ voffice.fromDate }}
              </h3>
              <h3 v-if="!voffice.employeeName">
                Free office for reservation
              </h3>
              <hr v-if="voffice.imageId > 0">
              <comp-image
                v-if="voffice.imageId > 0"
                align="center"
                :code="voffice.imageId"
                :updatable="false"
                :showname="false"
                :reserved="voffice.employeeName ? true : false"
                @node_id="getNodeId"
              />
              <div align="center">
                Total reservation(s): {{ voffice.totalCount }}
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </template>
    </v-row>

    <v-col cols="auto">
      <v-dialog
        v-model="dialog"
        transition="dialog-top-transition"
        max-width="800"
      >
        <v-card>
          <v-toolbar
            color="info"
            dark
          >
            <h2> {{ reservation.officeName }} Book Your Office</h2>
          </v-toolbar>
          <v-card-text>
            <div class="text-h2 pa-12">
              <!-- <comp-text v-model="reservation.fromDate" type="date" label="Office" color="info" /> -->

              <v-row justify="center">
                <!-- <v-date-picker v-model="reservation.fromDate" color="green lighten-1" />
                <v-date-picker v-model="reservation.toDate" color="blue lighten-1" /> -->
                <comp-date v-model="reservation.fromDate" label="From Date" color="green" />
                <comp-date v-model="reservation.toDate" label="To Date" color="blue" />
              </v-row>
            </div>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn
              color="info"
              @click="dialog=false"
            >
              CLOSE
            </v-btn>
            <v-spacer />
            <v-btn
              color="info"
              @click="submitReservation()"
            >
              Submit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
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
import CompDate from '~/components/compDate.vue'
import compImage from '~/components/compImage.vue'
export default {
  components: { compImage, CompDate },
  middleware: 'auth',
  data () {
    return {
      email: this.$auth.$state.user.username,
      code: this.$auth.$state.user.code,
      office: {},
      reservation: {},
      filter: {},
      showfilter: false,
      offices: [],
      mainOffices: [],
      loading: false,
      dialog: false,
      alreadyReserved: 0,
      snackbar: false,
      snackcolor: 'warning',
      snacktext: '',
      vertical: true,
      timeout: 3000,
      filterFromDate: '',
      filterToDate: ''
    }
  },
  computed: {
    dataToSave () {
      return {
        email: this.$auth.$state.user.username,
        companyId: this.$auth.$state.user.companyId,
        reservation: this.reservation
      }
    },
    dataToSend () {
      return {
        email: this.$auth.$state.user.username,
        companyId: this.$auth.$state.user.companyId
      }
    }

  },
  mounted () {
    this.loadData()
  },
  methods: {
    getNodeId (val) {
      console.log('in profiles node', val)
      this.office.imageId = val
      console.log('in profiles node imageId', this.office.imageId)
    },
    reserveOffice (poffice) {
      // this.reservation = poffice
      this.reservation.userCode = this.$auth.$state.user.code
      this.reservation.officeCode = poffice.id
      this.reservation.fromDate = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
      this.reservation.toDate = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
      console.log('reservation', this.reservation)
      this.dialog = true
    },
    submitReservation () {
      this.saveData()
    },
    saveData () {
      this.loading = true
      this.$axios.$post(this.$config.apiURL + '/pre_reservation.php', 'data=' + JSON.stringify(this.dataToSave))
        .then((response) => {
          console.log(response)
          console.log('reservation', response)
          this.alreadyReserved = response[0].reserveCount
          if (this.alreadyReserved > 0) {
            this.snackbar = true
            this.snackcolor = 'warning'
            this.snacktext = 'Office  already reserved for this period, Please choose another office'
          } else {
            this.$axios.$post(this.$config.apiURL + '/set_new_reservation.php', 'data=' + JSON.stringify(this.dataToSave))
              .then((response) => {
                // this.tempusertest = Object.assign([], response.user)
                // this.userProfile = response && response[0] ? response[0] : []
                // console.log('set data user', response)
                this.loading = false
                this.dialog = false
                this.snackbar = true
                this.snackcolor = 'success'
                this.snacktext = 'Office reserved successfully'
                setTimeout(() => this.loadData(), 2500)
              })
              .catch((error) => {
                console.log(error)
                this.loading = false
                // this.isLoadingGlobal = false
                // this.annuaire = error;
              })
          }
        })
        .catch((error) => {
          console.log('error', error)
          this.loading = false
          // this.isLoadingGlobal = false
          // this.annuaire = error;
        })

      this.loading = false
    },
    loadData () {
      this.loading = true
      this.$axios.$post(this.$config.apiURL + '/get_offices.php', 'data=' + JSON.stringify(this.dataToSend))
        .then((response) => {
          // this.tempusertest = Object.assign([], response.user)
          // this.userProfile = response && response[0] ? response[0] : []
          console.log('users', response)
          this.offices = response
          this.mainOffices = this.offices
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
    filterOfficesPerDate () {
      console.log('mainOffices', this.mainOffices)
      console.log('offices', this.offices)
      this.mainOffices = this.offices.filter(i => !((i.fromDate >= this.filterFromDate && i.fromDate <= this.filterToDate) || (i.toDate >= this.filterFromDate && i.toDate <= this.filterToDate)))
      console.log('offices after', this.mainOffices)
    }
  }
}
</script>
