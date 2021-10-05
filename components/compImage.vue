<template>
  <v-container>
    <v-container v-if="!imageProfile.fileName">
      <v-card :color="color">
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
    <!-- Image id: {{ imageProfile.imageId }} -->
    <v-container class="ma-0 pa-0">
      <v-card
        v-if="imageProfile.imageId"
        class="ma-0 pa-0"
      >
        <v-card-text class="ma-0 pa-0">
          <v-card class="ma-0 pa-0">
            <v-card-title>
              <v-toolbar
                v-if="showname"
                color="info"
                dark
              >
                {{ imageProfile.fileName }}
              </v-toolbar>
            </v-card-title>
            <v-card-text>
              <div align="center" class="ma-0 pa-0">
                <v-img
                  class="ma-0 pa-0"

                  :src="`${$config.filesURL}` + imageProfile.realFileName"
                  :min-height="minHeightComputed"
                  :min-width="minWidthComputed"
                  :max-height="maxHeightComputed"
                  :max-width="maxWidthComputed"
                >
                  <div v-if="reserved" class="reserved">
                    R E S E R V E D
                  </div>
                </v-img>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn v-if="updatable" class="info--text" @click="resetProfile()">
                Change Profile Image
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-card-text>
      </v-card>
    </v-container>
  </v-container>
</template>
<script>
export default {
  props: {
    code: { type: String, default: '' },
    updatable: { type: Boolean, default: true },
    showname: { type: Boolean, default: true },
    minHeight: { type: String, default: '250px' },
    maxHeight: { type: String, default: '250px' },
    color: { type: String, default: 'white' },
    minWidth: { type: String, default: '250px' },
    maxWidth: { type: String, default: '250px' },
    reserved: { type: Boolean, default: false }
  },
  data () {
    return {
      imageProfile: {},
      files: {},
      isLoadingGlobal: false,
      nodeId: '',
      minHeightComputed: '',
      minWidthComputed: '',
      maxHeightComputed: '',
      maxWidthComputed: ''
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
    this.minHeightComputed = this.minHeight
    this.minWidthComputed = this.minWidth
    this.maxHeightComputed = this.maxHeight
    this.maxWidthComputed = this.maxWidth
    this.loadData()
  },
  methods: {
    async loadData () {
      if (this.code) {
        await this.$axios.$get(this.$config.apiURL + '/get_image.php?p_code=' + this.code)
          .then((response) => {
          // this.tempusertest = Object.assign([], response.user)
            this.imageProfile = response && response[0] ? response[0] : {}
            console.log('imageProfile:', this.imageProfile)
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
      this.imageProfile.fileName = null
      this.imageProfile.imageId = 0
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
        this.$axios.post(this.$config.apiURL + '/set_new_file.php', formData)
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
<style scoped>
.reserved {
  margin: 100px 0 0 0;
  text-align: center;
  width: 50%;
  border: 3px solid red;
  padding: 10px;
  color:red;
}
</style>
