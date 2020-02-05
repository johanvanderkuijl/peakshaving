<template>
  <v-container>
    <v-row v-if="simulation">
      <v-col md="9">
        <app-consumers></app-consumers>
      </v-col>
      <v-col md="3">
        <app-congestion></app-congestion>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-if="userIsAuthenticated" md="2">
        <filter-measurement></filter-measurement>
      </v-col>

      <v-col>
        <v-card :loading="loading"  >
          <v-card-title>EAN012345678</v-card-title>
          <v-card-subtitle>stroom (A)</v-card-subtitle>
            <!-- styles="{
        height: 300px,
        position: 'relative'
      }" -->
          <app-chart style="height: 300px"
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
    measurements () {
      return this.$store.getters.measurements
    },
    chartData () {
      const values = []
      const labels = []

      this.measurements.forEach(element => {
        // should not reassign these!!!

        // find the value (as a digit or 0)
        try {
          const reg = element[this.key].toString().match(/\d+/)
          values.push(parseInt(reg[0]))
        } catch (error) {
          // console.log('cannot convert key/element ', this.key, element)
          values.push(0)
        }

        // find the label (timestamp)
        try {
          // timestamp to date conversion
          labels.push(new Date(element.meta.timestamp.seconds * 1000))
        } catch (error) {
          // console.log('cannot get timestamp from', element)
          labels.push('unknown')
        }
      })

      return {
        labels: labels,
        datasets: [
<<<<<<< HEAD
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
=======
>>>>>>> 2e87e51a3de6ebb08c233deb0d5226391ce5df55
          {
            label: 'Aansluiting',
            data: Array.from({ length: this.measurements.length }, (v, k) => this.capacity),
            fill: false,
            borderColor: 'rgb(0, 0, 0)',
            lineTension: 0.1
          },
          this.dataset(this.measurements, { key: 'I_1', label: 'Verbruik' }, 'rgb(25, 118, 210)', false),
          this.dataset(this.measurements, { key: 'IL_1p', label: 'Congestie' }, 'rgb(255, 0, 0)', 0)
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
    congestion () {
      return this.$store.getters.congestion
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
  },
  methods: {
    // return a proper dataset
    dataset (measurements, key, borderColor, fill) {
      var data = []
      measurements.forEach(element => {
        const value = element[key.key]
        // find the value (as a digit or 0)
        try {
          const reg = value.toString().match(/\d+/)
          data.push(parseInt(reg[0]))
        } catch (error) {
          // console.log('cannot convert key/element ', this.key.key, element)
          data.push(0)
        }
      })
      return {
        label: key.label,
        data: data,
        fill: fill,
        backgroundColor: 'rgba(244, 144, 128, 0.5)',
        borderColor: borderColor,
        lineTension: 0.1
      }
    }
  }
}
</script>
