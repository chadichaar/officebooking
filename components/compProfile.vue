<template>
  <v-container>
    <!-- Image Name: {{ userProfile.fileName }} -->
    <v-container v-if="!userProfile.fileName">
      <v-card>
        <v-card-title>
          <v-toolbar
            color="info"
            dark
          >
            <!-- Please Upload your Image - {{ code }} -->
          </v-toolbar>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-file-input
              v-model="files"
              show-size
              counter
              label="File input"
              color="info"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn v-if="files.name" class="info" @click="saveData()">
            Upload Image
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
    <!-- Image id: {{ userProfile.imageId }} -->
    <v-container>
      <v-card v-if="userProfile.imageId">
        <v-card-text>
          <v-card min-width="200px" max-width="490px">
            <v-card-title>
              <v-toolbar
                color="info"
                dark
              >
                {{ userProfile.realFileName }}
              </v-toolbar>
            </v-card-title>
            <v-card-text>
              <div align="center">
                <v-img
                  :src="`${$config.filesURL}` + userProfile.fileName"
                  max-height="400px"
                  max-width="1000px"
                />
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn class="info--text" @click="resetProfile()">
                Change Profile Image
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-card-text>
      </v-card>
    </v-container>
  </v-container>
  <!-- :src="require(`C://wamp64//www//test//img//${userProfile.userProfile}`)" -->
</template>
<script>
export default {
  props: {
    code: { type: String, default: '' }
  },
  data () {
    return {
      userProfile: {},
      files: {},
      isLoadingGlobal: false,
      nodeId: ''
    }
  },
  computed: {
    dataToSend () {
      return {
        p_code: this.code
      }
    },
    compCode () {
      return this.code
    }
  },
  watch: {
    compCode (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.loadData()
      }
    },
    immediate: true
  },
  mounted () {
    console.log('prop code', this.code)
    this.loadData()
  },
  methods: {
    async loadData () {
      if (this.code) {
        await this.$axios.$get(this.$config.apiURL + '/get_user.php?p_code=' + this.code)
          .then((response) => {
          // this.tempusertest = Object.assign([], response.user)
            this.userProfile = response && response[0] ? response[0] : {}
            console.log('userProfile:', this.userProfile)
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
    saveData2 () {
      console.log('files', this.files)
    },
    resetProfile  () {
      this.userProfile.fileName = null
      this.userProfile.imageId = 0
    },
    saveData () {
      this.isLoadingGlobal = true
      if (this.files) {
        console.log('files', this.files)
        const formData = new FormData()
        console.log('after formdata')
        // files
        // for (const file of this.files) {
        // console.log('filename (1)', file)
        formData.append('files[]', this.files, this.files.name)
        console.log('filename', this.files.name)
        // }
        // formData.append('files[]', this.files)
        console.log('datatosend(1)', this.dataToSend)
        formData.append('params', JSON.stringify(this.dataToSend))
        console.log('datatosend', this.dataToSend)
        this.$axios.post(process.env.apiURL + '/set_new_file.php', formData)
          .then((response) => {
            console.log('global_insert. THIS SHOULD HAVE DATA', response)
            // this.policyOccupations[0].catCode = []
            this.isLoadingGlobal = false
            // this.nodeId = response[0].fileId
            console.log('response new', response.data.response[0].fileId)
            //  this.fileId
            this.$emit('node_id', response.data.response[0].fileId)
            this.loadData()
          // this.loadData()
          })
          .catch((error) => {
            console.log(error)
            this.isLoadingGlobal = false
          // this.annuaire = error;
          })
      }
    }
  }
}
</script>
