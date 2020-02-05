<template>
  <v-card>
    <!-- <v-row>
      <v-col cols="6"> -->
        <v-card-title>Verbruikers fase 1</v-card-title>
        <v-card-subtitle>Aansluiting: {{ capacity }}A, Verbruik: {{ totalLoad }}A</v-card-subtitle>
      <!-- </v-col>
      <v-spacer v-if="userIsAuthenticated"></v-spacer>
      <v-col v-if="userIsAuthenticated">
        <v-switch @change="toggleGenerator" v-model="generator" label="auto update"></v-switch>
      </v-col>
    </v-row> -->

    <v-card-text class="pt-0">
      <v-row>
        <v-col v-for="consumer in consumers" :key="consumer.id">

          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" :color="consumer.enabled ? 'primary' : ''" @click="toggleConsumer(consumer.id)">
              <v-icon>{{ consumer.icon }}</v-icon>{{ consumer.iMax }}A
              </v-btn>
            </template>
            <span>Verbruik: {{ consumer.i }}A</span>
          </v-tooltip>

          <v-progress-linear :value=consumer.value buffer-value=100 class="mt-2"></v-progress-linear>
          <v-slider v-if="consumer.slider" v-model=consumer.slider min=10 max=100 dense thumb-label :thumb-size="24" step="10"></v-slider>
          <!-- {{ consumer.i }} -->
        </v-col>

      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import * as firebase from 'firebase'
export default {
  data: () => ({
    consumers: [
      {
        id: 1,
        name: 'Laadpaal auto',
        icon: 'mdi-car-electric',
        enabled: false,
        i: 0, // current A
        iMax: 16, // max A
        value: 0, // percentage A 0-100%
        slider: 50
      },
      {
        id: 2,
        name: 'Warmtepomp',
        icon: 'mdi-radiator',
        enabled: false,
        i: 0,
        iMax: 6,
        value: 0,
        slider: 80
      },
      {
        id: 3,
        name: 'Kookplaat',
        i: 0,
        iMax: 4,
        icon: 'mdi-stove',
        enabled: false,
        value: 0
      },
      {
        id: 4,
        name: 'Apparaat 2000W',
        i: 1,
        iMax: 1,
        icon: 'mdi-power-plug',
        enabled: true,
        value: 100
      },
      {
        id: 5,
        name: 'Vaatwasser',
        i: 0,
        iMax: 1,
        icon: 'mdi-dishwasher',
        enabled: false,
        value: 0
      },
      {
        id: 6,
        name: 'Televisie',
        i: 0,
        iMax: 1,
        icon: 'mdi-television-classic',
        enabled: false,
        value: 0
      },
      {
        id: 7,
        name: 'Computer',
        i: 1,
        iMax: 1,
        icon: 'mdi-desktop-classic',
        enabled: true,
        value: 100
      },
      {
        id: 8,
        name: 'Licht',
        i: 1,
        iMax: 1,
        icon: 'mdi-lightbulb-on-outline',
        enabled: true,
        value: 100
      }
    ],
    totalLoad: 0,
    generator: true,
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
        'source': 'Consumers.vue',
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
    },
    capacityNeeded () {
      return this.totalLoad + this.congestion
    }
  },
  methods: {
    adjust () {
      if (this.capacityNeeded > this.capacity) {
        this.consumers.forEach(consumer => {
          if (consumer.enabled && consumer.slider && consumer.value > 10 && consumer.slider < (consumer.value - 10)) {
            consumer.value -= 10
            consumer.i = Math.round(consumer.value / 100 * consumer.iMax)
          }
          // but we can also have the user want to increase the load anyway
          if (consumer.enabled && consumer.slider && consumer.value < 100 && consumer.slider > (consumer.value - 10)) {
            consumer.value += 10
            consumer.i = Math.round(consumer.value / 100 * consumer.iMax)
          }
        })
      } else if (this.capacityNeeded < this.capacity) {
        // adjust up
        this.consumers.forEach(consumer => {
          if (consumer.enabled && consumer.slider && consumer.value < 100) {
            consumer.value += 10
            consumer.i = Math.round(consumer.value / 100 * consumer.iMax)
          }
        })
      }
      this.calculateTotalLoad()
      // for each consumer
      // can they adjust
    },
    calculateTotalLoad () {
      let load = 0
      this.consumers.forEach(element => {
        // todo use map function
        // if (element.enabled) {
        load += element.i
        // }
      })
      this.totalLoad = load
    },
    toggleConsumer (i) {
      var consumer = this.consumers.find(x => x.id === i)
      consumer.enabled = !consumer.enabled
      if (consumer.enabled) {
        consumer.i = consumer.iMax
        consumer.value = 100
      } else {
        // todo use watch
        consumer.i = 0
        consumer.value = 0
      }
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
      this.interval = setInterval(() => {
        this.randomize()
        this.adjust()
        this.addMeasurement()
      }, 2000)
    },
    stop () {
      clearInterval(this.interval)
    },
    randomize () {
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
      // the clone code does simply not work
      // const clone = { ...this.measurement }
      // so we have to do it like this:
      const measurement = {
        EAN: this.measurement.EAN,
        IL_1p: this.measurement.IL_1p,
        IL_1m: this.measurement.IL_1m,
        IL_2p: this.measurement.IL_2p,
        IL_2m: this.measurement.IL_2m,
        IL_3p: this.measurement.IL_3p,
        IL_3m: this.measurement.IL_3m,
        IZ_1: this.measurement.IZ_1,
        IZ_2: this.measurement.IZ_2,
        IZ_3: this.measurement.IZ_3,
        I_1: this.measurement.I_1,
        I_2: this.measurement.I_2,
        I_3: this.measurement.I_3,
        U_1: this.measurement.U_1,
        U_2: this.measurement.U_2,
        U_3: this.measurement.U_2,
        meta: {
          'version': 2,
          'developer': 'johan',
          'source': 'Consumers.vue',
          'timestamp': firebase.firestore.Timestamp.fromDate(new Date())
        }
      }

      this.$store.dispatch('addMeasurement', measurement)
    }
  },
  created () {
    this.calculateTotalLoad()
    this.start()
  },
  beforeDestroy () {
    this.stop()
  }
}
</script>
