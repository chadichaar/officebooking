<template>
  <div>
    <v-card class="rounded-xl" :color="getColor()" min-width="250" max-width="250" max-height="500">
      <v-card-text>
        <div align="center">
          <v-avatar
            size="55"
            align="center"
          >
            <img
              v-if="fileName"

              :src="`${$config.filesURL}` + `${fileName}`"

              :alt="userName"
            >
          </v-avatar>
          <h2> {{ userName }}</h2>
          <h3> {{ department }}</h3>
          <h5>Office: {{ officename }}</h5>
          <h5>From {{ bookdate }} To {{ bookToDate }} </h5>
        </div>
      </v-card-text>
    </v-card>
  </div>
  <!-- :src="require(`C://wamp64//www//test//img//${fileName}`)" -->
</template>

<script>
export default {

  props: {
    fileName: { type: String, default: '' },
    userName: { type: String, default: '' },
    department: { type: String, default: '' },
    officename: { type: String, default: '' },
    bookdate: { type: String, default: '' },
    bookToDate: { type: String, default: '' }
  },
  data () {
    return {
      colors: ['#312B57', '#34A25A', '#5F5490', '#F7A197', '#FFC000', '#8EE4AF', '#5CDB95', '#880E4', '#1565C0', '#4DB6AC', '#CDDC39', '#558B2F', '#FFEE58', '#FFCA28', '#FFA726', '#8D6E63', '#78909C']
    }
  },
  methods: {
    rnd (a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
    getColor () {
      return this.colors[this.rnd(0, this.colors.length - 1)]
    }
  }
}
</script>
