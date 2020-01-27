<template>
  <!-- <v-row>
    <v-col> -->
      <v-card>
        <v-card-title>Filter</v-card-title>
        <!-- <v-card-subtitle>subtitle</v-card-subtitle> -->
        <v-card-text>
          <v-select v-model="limit" label="Aantal" :items="items"></v-select>
          <v-select v-model="key" label="Key" :items="keys"></v-select>
        </v-card-text>
      </v-card>
    <!-- </v-col>
  </v-row> -->
</template>

<script>
export default {
  data: () => ({
    items: [10, 20, 30, 40],
    keys: ['I_1', 'IL_1p', 'IL_2p', 'IL_1m', 'U_1']
  }),
  computed: {
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
