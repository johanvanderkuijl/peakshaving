<template>
  <v-card>
    <v-card-title>Verbruikers fase 1<v-spacer></v-spacer>
      <v-switch @change="toggleGenerator" v-model="generator" label="auto update"></v-switch>
    </v-card-title>
    <v-card-subtitle>Aansluiting: {{ capacity }}A, Verbruik: {{ totalLoad }}A</v-card-subtitle>
    <v-card-text>
      <v-row>
        <v-col v-for="consumer in consumers" :key="consumer.id">
          <v-btn :color="consumer.enabled ? 'primary' : ''" @click="toggleConsumer(consumer.id)">
            <v-icon>{{ consumer.icon }}</v-icon>{{ consumer.text }}
          </v-btn>
        </v-col>

      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    consumers: [
      {
        id: 1,
        name: 'Laadpaal auto',
        text: '16A',
        i: 16,
        icon: 'mdi-car-electric',
        enabled: false
      },
      {
        id: 2,
        name: 'Kookplaat',
        text: '4A',
        i: 4,
        icon: 'mdi-stove',
        enabled: false
      },
      {
        id: 3,
        name: 'Warmtepomp',
        text: '6A',
        i: 6,
        icon: 'mdi-radiator',
        enabled: false
      },
      {
        id: 4,
        name: 'Apparaat 2000W',
        text: '1A',
        i: 1,
        icon: 'mdi-power-plug',
        enabled: false
      },
      {
        id: 5,
        name: 'Vaatwasser',
        text: '1A',
        i: 1,
        icon: 'mdi-dishwasher',
        enabled: false
      },
      {
        id: 6,
        name: 'Televisie',
        text: '1A',
        i: 1,
        icon: 'mdi-television-classic',
        enabled: false
      },
      {
        id: 7,
        name: 'Computer',
        text: '1A',
        i: 1,
        icon: 'mdi-desktop-classic',
        enabled: false
      },
      {
        id: 8,
        name: 'Licht',
        text: '1A',
        i: 1,
        icon: 'mdi-lightbulb-on-outline',
        enabled: false
      }
    ],
    totalLoad: 0,
    generator: false,
    generatorCounter: 0,
    generatorCounterLimit: 300,
    interval: '',
    measurement: {
      EAN: 'EAN12345678',
      IL_1p: null,
      IL_1m: null,
      IL_2p: null,
      IL_2m: null,
      IL_3p: null,
      IL_3m: null,
      IZ_1: null,
      IZ_2: null,
      IZ_3: null,
      I_1: null,
      I_2: null,
      I_3: null,
      U_1: null,
      U_2: null,
      U_3: null,
      meta: {
        'version': 2,
        'developer': 'johan',
        'source': 'Generator.vue',
        'timestamp': null
      }
    }
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
    calculateTotalLoad () {
      let load = 0
      this.consumers.forEach(element => {
        // todo use map function
        if (element.enabled) {
          load += element.i
        }
      })
      this.totalLoad = load
    },
    toggleConsumer (i) {
      var consumer = this.consumers.find(x => x.id === i)
      consumer.enabled = !consumer.enabled
      this.calculateTotalLoad()
    },
    toggleGenerator () {
      if (this.generator) {
        this.start()
      } else {
        this.stop()
      }
    },
    start () {
      this.randomize()
      this.addMeasurement()
      this.generatorCounter = 0
      this.interval = setInterval(() => {
        this.randomize()
        this.addMeasurement()
        this.generatorCounter++
        if (this.generatorCounter > this.generatorCounterLimit) {
          this.generator = false
          this.stop()
        }
      }, 2000)
    },
    stop () {
      console.log('stop interval')
      clearInterval(this.interval)
    },
    randomize () {
      console.log('randomize')
      this.measurement.IL_1p = this.capacity - this.congestion
      this.measurement.IL_1m = this.randomIntBetweenInterval(220, 240)
      this.measurement.IL_2p = this.randomIntBetweenInterval(220, 240)
      this.measurement.IL_2m = this.randomIntBetweenInterval(220, 240)
      this.measurement.IL_3p = this.randomIntBetweenInterval(220, 240)
      this.measurement.IL_3m = this.randomIntBetweenInterval(220, 240)
      this.measurement.IZ_1 = this.randomIntBetweenInterval(0, 10)
      this.measurement.IZ_2 = this.randomIntBetweenInterval(5, 20)
      this.measurement.IZ_3 = this.randomIntBetweenInterval(0, 15)
      this.measurement.I_1 = this.totalLoad
      this.measurement.I_2 = this.randomIntBetweenInterval(5, 20)
      this.measurement.I_3 = this.randomIntBetweenInterval(0, 15)
      this.measurement.U_1 = this.randomIntBetweenInterval(0, 10)
      this.measurement.U_2 = this.randomIntBetweenInterval(5, 20)
      this.measurement.U_3 = this.randomIntBetweenInterval(0, 15)
    },
    randomIntBetweenInterval (min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    },
    addMeasurement () {
      console.log('dispatching measurement:', this.measurement)
      this.$store.dispatch('addMeasurement', this.measurement)
    }
  },
  created () {
    this.calculateTotalLoad()
  }
}
</script>
