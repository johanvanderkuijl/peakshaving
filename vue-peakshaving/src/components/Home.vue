<template>
  <v-card>
    <v-card-title><h2>Scan deze code met je telefoon</h2></v-card-title>
    <v-card-subtitle>Bekijk de metingen realtime op {{ url }}</v-card-subtitle>
    <v-card-text>
      <app-qrcode
        :value="url"
        :options="{ width: 360 }"
      >
      </app-qrcode>

    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    url: 'https://peakshaving-2ab48.firebaseapp.com/measurements'
  })
}
</script>
