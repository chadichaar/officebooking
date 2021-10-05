<template>
  <v-card class="pa-4 mb-4" :color="backgroundColor">
    <v-text-field
      v-model="valueFormatted"
      :label="label"
      :color="color"
      :background-color="backgroundColor"
      :type="type=='password' ? (showPassword ? 'text' : 'password') : 'text'"
      :append-icon="type=='password' ? showPassword ? 'mdi-eye' : 'mdi-eye-off' : ''"
      :readonly="isReadOnly"
      @click:append="showPassword = !showPassword"
    />
  </v-card>
</template>

<script>
export default {

  props: {
    label: { type: String, default: 'Test' },
    color: { type: String, default: 'primary' },
    value: { type: [String, Number], default: '' },
    type: { type: String, default: 'text' },
    isReadOnly: { type: Boolean, default: false },
    backgroundColor: { type: String, default: '' }
  },
  data () {
    return {
      val: this.value || '',
      showPassword: false
    }
  },
  computed: {

    valueFormatted: {
      get () {
        return this.val
      },
      set (newValue) {
        // console.log('newvalue:'+newValue)
        this.val = newValue
        this.$emit('input', this.val)
      }
    }
  },
  watch: {
    value (val) {
      this.val = val || ''
    }
  }
}
</script>
