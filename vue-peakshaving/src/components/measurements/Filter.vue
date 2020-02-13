<template>
  <!-- <v-row>
    <v-col> -->
      <v-card>
        <v-card-title>Filter</v-card-title>
        <!-- <v-card-subtitle>subtitle</v-card-subtitle> -->
        <v-card-text>
          <v-select v-model="meter" label="Meter" :items="meterOptions"></v-select>
          <v-select v-if="false" v-model="limit" label="Aantal" :items="meterOptions"></v-select>
          <v-select v-if="false"
            v-model="key"
            label="Key"
            :items="keys"
            chips
          ></v-select>
        </v-card-text>
      </v-card>
    <!-- </v-col>
  </v-row> -->
</template>

<script>
export default {
  data: () => ({
    meterOptions: [1, 2],
    items: [10, 20, 30, 40, 100],
    keys: ['I_1', 'IL_1p', 'IL_2p', 'IL_1m', 'U_1']
  }),
  computed: {
    meter: {
      get () {
        return this.$store.getters.meter
      },
      set (value) {
        this.$store.dispatch('setMeter', value)
      }
    },
    limit: {
      get () {
        return this.$store.getters.limit
      },
      set (value) {
        this.$store.dispatch('setLimit', value)
      }
    },
    key: {
      get () {
        return this.$store.getters.key
      },
      set (value) {
        this.$store.dispatch('setKey', value)
      }
    }
  }
}
</script>
