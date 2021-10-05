<template>
  <v-container>
    <!-- chadi <br>
    logged In:code is: {{ $auth.$state.user.code }}<br>
    logged In:email is: {{ $auth.$state.user.username }}<br> -->
    <v-card v-if="$auth.$state.user.code > 0" class="pa-4 mb-4" :loading="loading">
      <v-card-title>
        <v-toolbar
          color="info"
          dark
        >
          <v-icon large>
            mdi-account-star-outline
          </v-icon> <h2>
            &nbsp;&nbsp;-&nbsp;&nbsp;User Profile
          </h2>
        </v-toolbar>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col xl="6">
            <comp-text v-model="userProfile.email" type="email" label="User Name" color="info" />
            <comp-text v-model="userProfile.code" label="Employee Sequence No" color="info" is-read-only />
            <comp-text v-model="userProfile.firstName" label="First Name" color="info" />
            <comp-text v-model="userProfile.lastName" label="Last Name" color="info" />
            <comp-text v-model="userProfile.department" label="Department" color="info" />
            <!-- new node id: {{ userProfile.imageId }} -->
          </v-col>
          <v-col xl="6" align="center">
            <!-- code is {{ userProfile.code }} -->
            <comp-profile :code="userProfile.code" @node_id="getNodeId" />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <!-- {{ $auth.$store }} <br> -->
    <!-- {{ $auth.state.user }} / chadi2 -->
  </v-container>
</template>

<script>
import compProfile from '~/components/compProfile.vue'
export default {
  components: { compProfile }, // pour n'y accéder que si not logged
  middleware: 'auth',
  data () {
    return {
      email: this.$auth.$state.user.username,
      code: this.$auth.$state.user.code,
      userProfile: {},
      loading: false
    }
  },
  computed: {
    fileId () {
      return this.userProfile.imageId
    },
    dataToSave () {
      return this.userProfile
    }
  },
  watch: {
    fileId (newVal, oldVal) {
      if (newVal !== oldVal && newVal !== '0') {
        console.log('watch fileId', newVal)
        this.saveData()
        this.loadData()
        this.$router.push('./profile')
      }
    },
    immediate: true
  },
  mounted () {
    this.loadData()
  },

  methods: {
    getNodeId (val) {
      console.log('in profiles node', val)
      this.userProfile.imageId = val
      console.log('in profiles node imageId', this.userProfile.imageId)
    },
    loadData () {
      this.loading = true
      if (this.$auth.$state.user.code) {
        this.$axios.$get(this.$config.apiURL + '/get_user.php?p_code=' + this.$auth.$state.user.code)
          .then((response) => {
          // this.tempusertest = Object.assign([], response.user)
            this.userProfile = response && response[0] ? response[0] : []
            console.log('userProfile', this.userProfile)
            this.loading = false
          })
          .catch((error) => {
            console.log(error)
            this.loading = false
          // this.isLoadingGlobal = false
          // this.annuaire = error;
          })
      }
    },
    saveData () {
      this.loading = true
      if (this.userProfile.code) {
        this.$axios.$post(this.$config.apiURL + '/set_user.php', 'data=' + JSON.stringify(this.dataToSave))
          .then((response) => {
          // this.tempusertest = Object.assign([], response.user)
            // this.userProfile = response && response[0] ? response[0] : []
            console.log('set data user', response)
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
}
</script>
