<template>
  <v-container>
    <!-- chadi <br>
    logged In:code is: {{ $auth.$state.user.code }}<br>
    logged In:email is: {{ $auth.$state.user.username }}<br> -->
    <v-card v-if="$auth.$state.user.code > 0" class="pa-4 mb-4" :loading="loading">
      <v-card-text>
        <v-row>
          <v-col xl="12">
            <comp-data-table title="Users Profile" :headers="userheader" :items="users" :editheaders="usersconfig" />
            <!-- new node id: {{ userProfile.imageId }} -->
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <!-- {{ $auth.$store }} <br> -->
    <!-- {{ $auth.state.user }} / chadi2 -->
  </v-container>
</template>

<script>
import CompDataTable from '~/components/compDataTable.vue'
export default {
  components: { CompDataTable }, // pour n'y accéder que si not logged
  middleware: 'auth',
  data () {
    return {
      email: this.$auth.$state.user.username,
      code: this.$auth.$state.user.code,
      userProfile: [],
      loading: false,
      userheader: [
        { text: 'code', align: 'left', sortable: true, value: 'code' },
        { text: 'First Name', align: 'left', sortable: true, value: 'firstName' },
        { text: 'last Name', align: 'left', sortable: true, value: 'lastName' },
        { text: 'title', align: 'left', sortable: true, value: 'title' }
      ],
      usersconfig: [
        { value: 'code', component: 'compText', items: '', header: 'code', color: 'info' },
        { value: 'firstName', component: 'compText', items: '', header: 'First Name', color: 'info' },
        { value: 'lastName', component: 'compText', items: '', header: 'Last Name', color: 'info' },
        { value: 'title', component: 'compText', items: '', header: 'title', color: 'info' }
      ],
      users: []
    }
  },
  computed: {
    dataToSend () {
      return { companyId: this.$auth.$state.user.companyId }
    }
  },
  mounted () {
    this.loadData()
  },

  methods: {
    loadData () {
      this.loading = true
      if (this.$auth.$state.user.code) {
        this.$axios.$post(this.$config.apiURL + '/get_users.php', 'data=' + JSON.stringify(this.dataToSend))
          .then((response) => {
          // this.tempusertest = Object.assign([], response.user)
            this.users = response
            console.log('userProfile', this.users)
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
