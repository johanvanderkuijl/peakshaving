<template>
    <v-row>
        <v-col md="6" offset-md="3">
            <v-card>
                <v-card-title>Add measurement</v-card-title>
                <v-card-subtitle>Genereer een random bericht en sla het op in de cloud</v-card-subtitle>
                <v-card-text>
                  <v-row>
                    <v-col cols="9">
                        <v-text-field
                            label="EAN"
                            outlined
                            v-model="measurement.EAN"
                        ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="4" sm="4" md="3">
                        <v-text-field
                            label="IL_1+"
                            outlined
                            v-model.number="measurement.IL_1p"
                            type="number"
                        ></v-text-field>
                        <v-text-field
                            label="IL_1-"
                            outlined
                            v-model.number="measurement.IL_1m"
                            type="number"
                        ></v-text-field>
                        <v-text-field
                            label="IZ_1"
                            outlined
                            v-model.number="measurement.IZ_1"
                            type="number"
                        ></v-text-field>
                        <v-text-field
                            label="U_1"
                            outlined
                            v-model.number="measurement.U_1"
                            type="number"
                        ></v-text-field>
                        <v-text-field
                            label="I_1"
                            outlined
                            v-model.number="measurement.I_1"
                            type="number"
                        ></v-text-field>

                    </v-col>
                    <!-- column 2 -->
                    <v-col cols="4" sm="4" md="3">
                        <v-text-field
                            label="IL_2+"
                            outlined
                            v-model.number="measurement.IL_2p"
                            type="number"
                        ></v-text-field>
                        <v-text-field
                            label="IL_2-"
                            outlined
                            v-model.number="measurement.IL_2m"
                            type="number"
                        ></v-text-field>
                        <v-text-field
                            label="IZ_2"
                            outlined
                            v-model.number="measurement.IZ_2"
                            type="number"
                        ></v-text-field>
                        <v-text-field
                            label="U_2"
                            outlined
                            v-model.number="measurement.U_2"
                            type="number"
                        ></v-text-field>
                        <v-text-field
                            label="I_2"
                            outlined
                            v-model.number="measurement.I_2"
                            type="number"
                        ></v-text-field>
                    </v-col>
                    <!-- column 3 -->
                    <v-col cols="4" sm="4" md="3">
                        <v-text-field
                            label="IL_3+"
                            outlined
                            v-model.number="measurement.IL_3p"
                            type="number"
                        ></v-text-field>
                        <v-text-field
                            label="IL_3-"
                            outlined
                            v-model.number="measurement.IL_3m"
                            type="number"
                        ></v-text-field>
                        <v-text-field
                            label="IZ_3"
                            outlined
                            v-model.number="measurement.IZ_3"
                            type="number"
                        ></v-text-field>
                        <v-text-field
                            label="U_3"
                            outlined
                            v-model.number="measurement.U_3"
                            type="number"
                        ></v-text-field>
                        <v-text-field
                            label="I_3"
                            outlined
                            v-model.number="measurement.I_3"
                            type="number"
                        ></v-text-field>
                    </v-col>

                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-btn @click="randomize">Randomize</v-btn>
                  <v-btn @click="addMeasurement">Submit</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
  data: () => ({
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
        'source': 'Add.vue',
        'timestamp': null
      }
    }
  }),
  methods: {
    randomize () {
      // console.log('randomize')
      this.measurement.IL_1p = this.randomIntBetweenInterval(220, 240)
      this.measurement.IL_1m = this.randomIntBetweenInterval(220, 240)
      this.measurement.IL_2p = this.randomIntBetweenInterval(220, 240)
      this.measurement.IL_2m = this.randomIntBetweenInterval(220, 240)
      this.measurement.IL_3p = this.randomIntBetweenInterval(220, 240)
      this.measurement.IL_3m = this.randomIntBetweenInterval(220, 240)
      this.measurement.IZ_1 = this.randomIntBetweenInterval(0, 10)
      this.measurement.IZ_2 = this.randomIntBetweenInterval(5, 20)
      this.measurement.IZ_3 = this.randomIntBetweenInterval(0, 15)
      this.measurement.I_1 = this.randomIntBetweenInterval(0, 10)
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
      // console.log('dispatching measurement:', this.measurement)
      this.$store.dispatch('addMeasurement', this.measurement)
    }
  },
  created () {
    this.randomize()
  }
}
</script>
