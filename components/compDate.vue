<template>
  <v-card class="pa-4 mb-4">
    <v-row justify="center">
      <!-- <v-date-picker v-model="reservation.fromDate" color="green lighten-1" />
                <v-date-picker v-model="reservation.toDate" color="blue lighten-1" /> -->
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template #activator="{ on, attrs}">
          <v-combobox
            v-model="valueFormatted"
            chips
            small-chips
            :label="label"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            :color="color"
            v-on="on"
          />
        </template>
        <v-date-picker
          v-model="valueFormatted"
          no-title
          scrollable
          :color="color"
        />
        <v-spacer />
      </v-menu>
    </v-row>
  </v-card>
</template>

<script>
export default {

  props: {
    label: { type: String, default: 'Test' },
    color: { type: String, default: 'primary' },
    value: { type: [String, Number], default: '' },
    type: { type: String, default: 'text' },
    isReadOnly: { type: Boolean, default: false }
  },
  data () {
    return {
      val: this.value || '',
      showPassword: false,
      menu: false,
      dates: []
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
