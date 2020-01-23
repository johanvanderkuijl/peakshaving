<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card :loading="loading">
          <v-card-title>EAN012345678</v-card-title>
          <v-card-subtitle>congestion</v-card-subtitle>
          <v-sparkline
            :value="values"
            auto-draw
            :gradient="gradient"
            :radius="radius"
            smooth
          ></v-sparkline>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="reload">Reload</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    gradient: ['#f72047', '#ffd200', '#1feaea'],
    radius: 5
  }),
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    values () {
      var values = []
      var measurements = this.$store.getters.measurements
      console.log('got measurements', measurements)
      measurements.forEach(element => {
        const value = element.IL_1p
        console.log(value)
        values.push(value)
      })
      return values
      // [0, 2, 5, 9, 5, 10, 3, 5, -4, -10, 1, 8, 2, 9, 0]
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
