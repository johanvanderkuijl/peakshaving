<template>
  <v-container>
    <v-row v-if="simulation">
      <v-col cols="9">
        <app-consumers></app-consumers>
      </v-col>
      <v-col cols="3">
        <app-congestion></app-congestion>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-if="userIsAuthenticated" md="2">
        <filter-measurement></filter-measurement>
      </v-col>

      <v-col>
        <v-card :loading="loading">
          <v-card-title>EAN012345678</v-card-title>
          <v-card-subtitle>stroom (A)</v-card-subtitle>
          <app-chart
            v-if="!loading"
            :chartData="chartData"
            :options="options"
          ></app-chart>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import FilterMeasurement from '@/components/measurements/Filter.vue'
import Chart from '@/components/measurements/Chart.js'
import Consumers from '@/components/measurements/Consumers.vue'
import Congestion from '@/components/measurements/Congestion.vue'

export default {
  components: {
    filterMeasurement: FilterMeasurement,
    appChart: Chart,
    appConsumers: Consumers,
    appCongestion: Congestion
  },
  data: () => ({
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            type: 'time',
            distribution: 'series',
            time: {
              // format: 'DD/MM/YYYY',
              // tooltipFormat: 'll'
              displayFormats: {
                millisecond: 'HH:mm:ss.SSS',
                second: 'HH:mm:ss',
                minute: 'HH:mm',
                hour: 'HH'
              }
            }
          }
        ],
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  }),
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    chartData () {
      var values = []
      var labels = []
      var measurements = this.$store.getters.measurements
      console.log('Getting new measurements')

      measurements.forEach(element => {
        var value = element[this.key]
        var label = ''

        // find the value (as a digit or 0)
        try {
          if (!this.key) {
            value = this.capacity
          } else {
            const reg = value.toString().match(/\d+/)
            value = parseInt(reg[0])
          }
        } catch (error) {
          console.log('cannot convert key/element ', this.key, element)
          // value = 0
          value = this.capacity
        }

        // find the label (timestamp)
        try {
          // timestamp to date conversion
          label = new Date(element.meta.timestamp.seconds * 1000)
          // label = element.meta.timestamp
        } catch (error) {
          console.log('cannot get timestamp from', element)
          label = 'unknown'
        }

        values.push(value)
        labels.push(label)
      })

      return {
        labels: labels,
        datasets: [
          // {
          //   label: this.key,
          //   data: values,
          //   fill: false,
          //   borderColor: 'rgb(192, 38, 38)',
          //   lineTension: 0.1
          // },
          this.dataset(measurements, { key: 'IL_1p', label: 'Congestie (IL_1p)' }, 'rgb(255, 0, 0)', 2),
          this.dataset(measurements, { key: 'I_1', label: 'Verbruik (I_1)' }, 'rgb(25, 118, 210)', false),
          // this.dataset(measurements, 'Aansluiting', 'rgb(0, 0, 0)', false),
          // this.dataset(measurements, this.key, 'rgb(192, 38, 38)')
          {
            label: 'Aansluiting',
            data: Array.from({ length: measurements.length }, (v, k) => this.capacity),
            fill: false,
            borderColor: 'rgb(0, 0, 0)',
            lineTension: 0.1
          }
        ]
      }
    },
    key () {
      return this.$store.getters.key
    },
    simulation () {
      return this.$store.getters.simulation
    },
    capacity () {
      return this.$store.getters.capacity
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
  },
  methods: {
    reload () {
      console.log('start reload')
      this.$store.dispatch('loadMeasurements')
    },
    // return a proper dataset
    dataset (measurements, key, borderColor, fill) {
      var data = []
      measurements.forEach(element => {
        var value = element[key.key]

        // find the value (as a digit or 0)
        try {
          const reg = value.toString().match(/\d+/)
          value = parseInt(reg[0])
        } catch (error) {
          console.log('cannot convert key/element ', this.key.key, element)
          value = 0
        }

        data.push(value)
      })
      return {
        label: key.label,
        data: data,
        fill: fill,
        borderColor: borderColor,
        lineTension: 0.1
      }
    }
  }
}
</script>
