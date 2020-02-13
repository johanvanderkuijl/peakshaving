<template>
  <v-card>
    <v-card-title class="red--text">Congestie fase 1</v-card-title>
    <v-card-subtitle>
      <!-- <div>Congestie signaal: {{ capacity - congestion }}A</div> -->
      <div>Congestie: {{ congestion }}A</div>
      </v-card-subtitle>
    <v-card-text>
      <v-btn class="mr-2" @click="incCongestion">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn @click="decCongestion">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-switch @change="toggleRandom" v-model="random" label="random"></v-switch>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    totalCongestion: 0,
    random: true,
    congestionSeries: [1, 2, 3, 5, 7, 10, 13, 14, 14, 15, 15, 15, 16, 14, 12, 11, 10, 11, 9, 5, 2, 0,
      1, 3, 6, 10, 14, 16, 17, 18, 19, 20, 20, 19, 18, 16, 12, 10, 9, 8, 7, 5, 2, 1, 0,
      1, 4, 9, 12, 15, 18, 19, 21, 23, 25, 26, 26, 25, 22, 20, 18, 17, 15, 13, 11, 9, 7, 4, 1],
    congestionPointer: 0
  }),
  computed: {
    congestion () {
      return this.$store.getters.congestion
    },
    capacity () {
      return this.$store.getters.capacity
    }
  },
  methods: {
    incCongestion () {
      this.$store.dispatch('incCongestion')
    },
    decCongestion () {
      this.$store.dispatch('decCongestion')
    },
    setCongestion (payload) {
      this.$store.dispatch('setCongestion', payload)
    },
    toggleRandom () {
      if (this.random) {
        this.randomCongestion()
      } else {
        clearInterval(this.interval)
      }
    },
    randomCongestion () {
      // console.log('Setting interval consumers')
      this.interval = setInterval(() => {
        if (this.random) {
          this.setCongestion(this.congestionSeries[this.congestionPointer])
          if (this.congestionPointer < this.congestionSeries.length - 1) {
            this.congestionPointer += 1
          } else {
            this.congestionPointer = 0
          }
          // const val = Math.random()
          // if (val > 0.9) {
          //   this.incCongestion()
          //   this.incCongestion()
          //   // this.incCongestion()
          //   this.incCongestion()
          //   this.incCongestion()
          // } else if (val > 0.5) {
          //   this.incCongestion()
          // } else if (val > 0.1) {
          //   this.decCongestion()
          // } else {
          //   this.decCongestion()
          //   this.decCongestion()
          //   this.decCongestion()
          //   this.decCongestion()
          //   this.decCongestion()
          // }
        }
      }, 2000)
    }
  },
  created () {
    this.randomCongestion()
  },
  beforeDestroy () {
    // console.log('Clearing interval congestion')
    clearInterval(this.interval)
  }
}
</script>
