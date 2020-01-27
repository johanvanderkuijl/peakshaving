<template>
  <v-container>
    <v-row>
      <v-col md="2">
        <filter-measurement></filter-measurement>
      </v-col>

      <v-col md="10">
        <v-card :loading="loading">
          <v-card-title>EAN012345678</v-card-title>
          <v-card-subtitle>congestion</v-card-subtitle>
          <!-- <v-sparkline
            :value="values"
            :labels="values"
            auto-draw
            :gradient="gradient"
            :radius="radius"
            smooth
          ></v-sparkline> -->
          <app-chart
            v-if="!loading"
            :chartdata="chartdata"
            :options="options"
          ></app-chart>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="reload">Reload</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <!-- <add-measurement></add-measurement> -->
  </v-container>
</template>

<script>
// import AddMeasurement from '@/components/measurements/Add.vue'
import FilterMeasurement from '@/components/measurements/Filter.vue'
import Chart from '@/components/measurements/Chart.vue'

export default {
  components: {
    // addMeasurement: AddMeasurement,
    filterMeasurement: FilterMeasurement,
    appChart: Chart
  },
  data: () => ({
    gradient: ['#f72047', '#ffd200', '#1feaea'],
    radius: 5,
    options: {
      responsive: true,
      maintainAspectRatio: false
      // scales: {
      //   xAxes: [{
      //     type: 'time',
      //     time: {
      //       unit: 'hours'
      //     }
      //   }]
      // }
    }
  }),
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    chartdata () {
      var values = []
      var labels = []
      var measurements = this.$store.getters.measurements
      // measurements = measurements.reverse()
      console.log('Getting new measurements')

      measurements.forEach(element => {
        var value = element[this.key]
        var label = ''

        // find the value
        try {
          const reg = value.toString().match(/\d+/)
          value = parseInt(reg[0])
        } catch (error) {
          console.log('cannot convert key/element ', this.key, element)
          value = 0
        }

        // find the label (timestamp)
        try {
          label = element.meta.timestamp
          // label = new Date()
          // console.log('getting label', label)
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
          {
            label: this.key,
            data: values,
            fill: false,
            borderColor: 'rgb(192, 38, 38)',
            lineTension: 0.1
          }
        ]
      }
    },
    // values () {
    //   var values = []
    //   var measurements = this.$store.getters.measurements
    //   measurements.forEach(element => {
    //     // const value = element.I_1
    //     var value = element[this.key]

    //     try {
    //       const reg = value.toString().match(/\d+/)
    //       value = parseInt(reg[0])
    //     } catch (error) {
    //       console.log('cannot convert key/element ', this.key, element)
    //       value = 0
    //     }

    //     values.push(value)
    //   })
    //   return values
    // },
    key () {
      return this.$store.getters.key
    }
  },
  methods: {
    reload () {
      console.log('start reload')
      this.$store.dispatch('loadMeasurements')
    }
  }
}
</script>
