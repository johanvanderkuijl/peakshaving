<template>
  <v-card>
    <v-card-title>Congestie fase 1
    </v-card-title>
    <v-card-subtitle>Totale congestie: {{ congestion }}A</v-card-subtitle>
    <v-card-text>
      <v-row>
        <v-col>
          <v-btn @click="incCongestion">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-btn @click="decCongestion">
            <v-icon>mdi-minus</v-icon>
          </v-btn>
        </v-col>

      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    totalCongestion: 0
  }),
  computed: {
    congestion () {
      return this.$store.getters.congestion
    }
  },
  methods: {
    incCongestion () {
      this.$store.dispatch('incCongestion')
    },
    decCongestion () {
      this.$store.dispatch('decCongestion')
    }
  }
}
</script>
