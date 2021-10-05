<template>
  <div>
    <v-card v-if="$auth.$state.user.code > 0" class="pa-4 mb-4" :loading="loading">
      <v-card-title>
        <v-toolbar
          color="info"
          dark
        >
          <v-icon large>
            mdi-desk
          </v-icon> <h2>
            &nbsp;&nbsp;-&nbsp;&nbsp;Offices
          </h2>
        </v-toolbar>
      </v-card-title>
      <v-card-text>
        <v-row>
          <template v-for="voffice in offices">
            <v-col :key="voffice.id" cols="6">
              <v-card>
                <v-card-title
                  color="info"
                  dark
                >
                  <v-toolbar
                    color="info"
                    dark
                  >
                    {{ voffice.department }}

                    <v-spacer />
                    <v-btn
                      color="warning"
                      fab
                      x-small
                      dark
                      @click="deleteOffice(voffice.id)"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-toolbar>
                </v-card-title>
                <v-card-text>
                  <p /><h2>Name: {{ voffice.officeName }}</h2>
                  <p /><h2>Floor: {{ voffice.floor }}</h2>
                  <p /><h3 v-if="voffice.employeeName">
                    Reserved by {{ voffice.employeeName }} on {{ voffice.fromDate }}
                  </h3>
                  <hr v-if="voffice.imageId > 0">
                  <comp-image
                    v-if="voffice.imageId > 0"
                    align="center"
                    :code="voffice.imageId"
                    :updatable="false"
                    :showname="false"
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
      </v-card-text>
    </v-card>
    <v-card v-if="$auth.$state.user.code > 0" class="pa-4 mb-4" :loading="loading">
      <v-card-title>
        <v-toolbar
          color="info"
          dark
        >
          <v-icon large>
            mdi-desk
          </v-icon> <h2>
            &nbsp;&nbsp;-&nbsp;&nbsp;Add New Office
          </h2>
        </v-toolbar>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col xl="6">
            <comp-text v-model="office.officeName" type="text" label="Office Name" color="info" />
            <comp-text v-model="office.floor" type="text" label="Floor" color="info" />
            <comp-text v-model="office.department" type="text" label="Department" color="info" />
          </v-col>
          <v-col xl="6" align="center">
            <v-card>
              <v-card-text>
                <v-switch
                  v-model="newOffice"
                  color="info"
                  inset
                  :label="newOffice ? 'New Office' : 'Existing Office'"
                />
              </v-card-text>
              <v-card-actions>
                <v-btn v-if="!newOffice" color="info" @click="getDistinctOffices()">
                  choose your Office
                </v-btn>
              </v-card-actions>
            </v-card>
            <!-- code is {{ userProfile.code }} -->
            <comp-image v-if="newOffice || office.imageId " :code="office.imageId" @node_id="getNodeId" />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn color="info" @click="saveData()">
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-col cols="auto">
      <v-dialog
        v-model="dialogOffices"
        transition="dialog-top-transition"
        max-width="800"
      >
        <v-card color="blue-grey lighten-5">
          <v-toolbar
            color="info"
            dark
          >
            <h2> Define your Office</h2>
          </v-toolbar>
          <v-card-text>
            <v-row>
              <v-container>
                <br>
                <comp-text v-model="searchOffice" type="text" label="Filter Offices" color="primary" /><br>
              </v-container>
            </v-row>
            <v-row>
              <template v-for="voffice in filterOffices">
                <v-col :key="voffice.fileId">
                  <v-card color="white" @click="chooseOfficeImage(voffice)">
                    <v-card-title
                      color="info"
                      dark
                    >
                      <v-toolbar
                        color="white info--text"
                        dark
                      >
                        Office Name: {{ voffice.officeName }}
                      </v-toolbar>
                    </v-card-title>
                    <v-card-subtitle>
                      <v-toolbar
                        color="white primary--text"
                        dark
                      >
                        Department: {{ voffice.department }}
                      </v-toolbar>
                    </v-card-subtitle>
                    <v-card-text>
                      <comp-image
                        v-if="voffice.imageId > 0"
                        align="center"
                        color="white"
                        :code="voffice.imageId"
                        :updatable="false"
                        :showname="false"
                        @node_id="getNodeId"
                      />
                    </v-card-text>
                    <v-card-actions>
                      <v-toolbar
                        color="white primary--text"
                        dark
                      >
                        Floor: {{ voffice.floor }}
                      </v-toolbar>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </template>
            </v-row>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn
              color="info"
              @click="dialogOffices=false"
            >
              CLOSE
            </v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </div>
</template>
<script>
import compImage from '~/components/compImage.vue'
export default {
  components: { compImage },
  middleware: 'auth',
  data () {
    return {
      email: this.$auth.$state.user.username,
      code: this.$auth.$state.user.code,
      imageId: this.$auth.$state.user.imageId,
      office: {},
      offices: [],
      distinctOffices: [],
      filterOffices: [],
      loading: false,
      newOffice: true,
      dialogOffices: false,
      searchOffice: ''
    }
  },
  computed: {
    dataToSave () {
      return {
        office: this.office,
        email: this.$auth.$state.user.username,
        companyId: this.$auth.$state.user.companyId
      }
    },
    dataToSend () {
      return {
        email: this.$auth.$state.user.username,
        companyId: this.$auth.$state.user.companyId
      }
    },
    searchOfficeComputed () {
      return this.searchOffice
    }

  },
  watch: {
    searchOfficeComputed (newval, oldVal) {
      if (newval !== oldVal) {
        this.filterOffices = this.distinctOffices.filter(function (str) { return (str.officeName.toUpperCase().includes(newval.toUpperCase()) || str.fileName.toUpperCase().includes(newval.toUpperCase()) || str.floor.toUpperCase().includes(newval.toUpperCase()) || str.department.toUpperCase().includes(newval.toUpperCase())) })
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
    chooseOfficeImage (off) {
      this.office.imageId = off.imageId
      this.dialogOffices = false
    },
    deleteOffice (id) {
      this.$axios.$post(this.$config.apiURL + '/delete_office.php', 'id=' + JSON.stringify(id))
        .then((response) => {
          // this.tempusertest = Object.assign([], response.user)
          // this.userProfile = response && response[0] ? response[0] : []
          console.log('set data user', response)
          this.loading = false
          this.loadData()
        })
        .catch((error) => {
          console.log(error)
          this.loading = false
          // this.isLoadingGlobal = false
          // this.annuaire = error;
        })
    },
    saveData () {
      this.loading = true
      this.$axios.$post(this.$config.apiURL + '/set_new_office.php', 'data=' + JSON.stringify(this.dataToSave))
        .then((response) => {
          // this.tempusertest = Object.assign([], response.user)
          // this.userProfile = response && response[0] ? response[0] : []
          console.log('set data user', response)
          this.loading = false
          this.loadData()
        })
        .catch((error) => {
          console.log(error)
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
    getDistinctOffices () {
      this.loading = true
      this.$axios.$post(this.$config.apiURL + '/get_distinct_offices.php', 'data=' + JSON.stringify(this.dataToSend))
        .then((response) => {
          // this.tempusertest = Object.assign([], response.user)
          // this.userProfile = response && response[0] ? response[0] : []
          console.log('users', response)
          this.distinctOffices = response
          this.filterOffices = response
          this.dialogOffices = true
          this.loading = false
        })
        .catch((error) => {
          console.log(error)
          this.loading = false
          // this.isLoadingGlobal = false
          // this.annuaire = error;
        })
      this.loading = false
    }
  }
}
</script>
