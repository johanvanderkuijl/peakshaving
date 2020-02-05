<template>
  <v-card>
    <v-card-title class="red--text">Congestie fase 1</v-card-title>
    <v-card-subtitle>
      <!-- <div>Congestie signaal: {{ capacity - congestion }}A</div> -->
      <div>Totale congestie: {{ congestion }}A</div>
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
    random: true
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
    toggleRandom () {
      if (this.random) {
        this.randomCongestion()
      } else {
        clearInterval(this.interval)
      }
    },
    randomCongestion () {
      this.interval = setInterval(() => {
        if (this.random) {
          const val = Math.random()
          if (val > 0.9) {
            this.incCongestion()
            this.incCongestion()
            // this.incCongestion()
            this.incCongestion()
            this.incCongestion()
          } else if (val > 0.5) {
            this.incCongestion()
          } else if (val > 0.1) {
            this.decCongestion()
          } else {
            this.decCongestion()
            this.decCongestion()
            this.decCongestion()
            this.decCongestion()
            this.decCongestion()
          }
        }
      }, 2000)
    }
  },
  created () {
    this.randomCongestion()
  },
  beforeDestroy () {
    clearInterval(this.interval)
  }
}
</script>
