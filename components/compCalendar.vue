<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat color="white">
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
            Today
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small>
              mdi-chevron-right
            </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer />
          <v-menu v-if="modeview.length > 1" bottom right>
            <template #activator="{ on, attrs }">
              <v-btn
                outlined
                color="grey darken-2"
                v-bind="attrs"
                v-on="on"
              >
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>
                  mdi-menu-down
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-if="modeview.includes('D')" @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item v-if="modeview.includes('W')" @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item v-if="modeview.includes('M')" @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <v-list-item v-if="modeview.includes('4')" @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :type="type"
          @click:event="showEvent"
          @change="updateRange"
        />
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card color="grey lighten-4" min-width="350px" flat>
            <v-toolbar :color="selectedEvent.color" dark>
              <v-toolbar-title>
                {{ selectedEvent.name }}
              </v-toolbar-title>
              <v-spacer />
            </v-toolbar>
            <v-data-table
              class="elevation-1"
              :headers="eventHeaders"
              :items="selectedEvent.details"
            >
              <template #[`item.actions`]="{ item }">
                <!-- <template #item.actions="{ item } "> -->
                <v-btn-toggle>
                  <v-btn small color="primary" @click="actionButton= item">
                    <v-icon small color="white">
                      mdi-chevron-right
                    </v-icon>
                  </v-btn>
                </v-btn-toggle>
              </template>
            </v-data-table>
            <v-card-actions>
              <v-btn text color="secondary" @click="selectedOpen = false">
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    items: { type: [Object, Array], default: () => [] },
    displayField: { type: String, default: '' },
    eventHeaders: { type: [Object, Array], default: () => [] },
    startDate: { type: String, default: '' },
    endDate: { type: String, default: '' },
    modeview: { type: Array, default: () => ['D', 'W', 'M', '4'] },
    grouped: { type: Boolean, default: true },
    colors: { type: Array, default: () => ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'] }
  },
  data: () => ({
    isLoadingGlobal: false,
    focus: '',
    type: 'month',
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day'
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    listofdata: [],
    actionButton: {}
    // displayDialogArray: false
  }),
  watch: {
    actionButton (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit('doAction', newVal)
      }
    },
    items (val) {
      this.listofdata = val
      console.log('list', this.listofdata)
      this.$refs.calendar.checkChange()
      if (this.listofdata && this.listofdata.length > 0) { this.updateRange() }
    },
    immediate: true
  },
  methods: {
    viewDay ({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor (event) {
      return event.color
    },
    setToday () {
      this.focus = ''
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    // for the event ---------------------------------------------
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        // eslint-disable-next-line no-return-assign
        setTimeout(() => this.selectedOpen = true, 10)
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    rnd (a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
    updateRange () {
      const events = []
      this.listofdata.forEach((element) => {
        const disp = Object.keys(element).includes(this.displayField) ? Object.values(element)[Object.keys(element).indexOf(this.displayField)] : '-'
        const str = (Object.values(element)[Object.keys(element).indexOf(this.startDate)])
        const end = (Object.values(element)[Object.keys(element).indexOf(this.endDate)])
        const o = {}
        const det = []
        this.eventHeaders.forEach((el) => {
          o[el.value] = Object.values(element)[Object.keys(element).indexOf(el.value)]
        })
        det.push(o)
        if (this.grouped && events.some(event => event.start === str)) {
          const previousindex = events.findIndex(event => event.start === str)
          events[previousindex].details.push(o)
          events[previousindex].name = events[previousindex].details.length + ' ' + this.displayField + 's'
        } else {
          events.push({
            name: (disp === 'null' || !disp ? '-' : disp),
            start: str,
            end,
            color: this.colors[this.rnd(0, this.colors.length - 1)],
            details: det,
            timed: false
          })
        }
      })
      this.events = events
    }
  }
}
</script>
