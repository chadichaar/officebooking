<template>
  <v-snackbar
    :color="snackColor"
    :timeout="timeout"
  >
    {{ snackbarText }}
  </v-snackbar>
</template>
<script>
export default {
  props: {
    snackbarText: { type: String, default: 'Lorem ipsum dolor sit amet' },
    snackColor: { type: String, default: 'primary' }

  },
  data () {
    return {
      snackbarVertical: true,
      timeout: 2000
    }
  }
}
</script>
