<template>
  <v-card>
    <v-card-title><h2>Scan deze code met je telefoon</h2></v-card-title>
    <v-card-subtitle>Bekijk de metingen realtime op https://peakshaving-2ab48.firebaseapp.com</v-card-subtitle>
    <v-card-text>
      <app-qrcode
        value="https://peakshaving-2ab48.firebaseapp.com/measurements"
        :options="{ width: 360 }"
      >
      </app-qrcode>

    </v-card-text>
  </v-card>
</template>
