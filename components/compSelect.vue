<template>
  <v-card class="pa-4 mb-4" :color="backgroundColor">
    <v-select
      v-model="valueFormatted"
      :items="items"
      :item-text="itemText"
      :item-value="itemValue"
      :label="label"
      :background-color="backgroundColor"
      persistent-hint
      return-object
      single-line
    />
  </v-card>
</template>

<script>
export default {

  props: {
    items: { type: [Object, Array], default: () => [] },
    label: { type: String, default: 'Test' },
    color: { type: String, default: 'primary' },
    // value: { type: [String, Number], default: '' },
    type: { type: String, default: 'text' },
    isReadOnly: { type: Boolean, default: false },
    backgroundColor: { type: String, default: 'white' },
    itemText: { type: String, default: '' },
    itemValue: { type: String, default: '' }
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
