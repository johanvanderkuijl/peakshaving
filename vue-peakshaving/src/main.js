import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import * as firebase from 'firebase'

// components
import Measurements from './components/Measurements.vue'

Vue.config.productionTip = false

Vue.component('app-measurements', Measurements)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyAvw89EPjIYo_ScGfGyU_0tzv1QMZdHMvg',
      authDomain: 'peakshaving-2ab48.firebaseapp.com',
      databaseURL: 'https://peakshaving-2ab48.firebaseio.com',
      projectId: 'peakshaving-2ab48',
      storageBucket: 'peakshaving-2ab48.appspot.com',
      messagingSenderId: '917629353859',
      appId: '1:917629353859:web:47f5f92bff45cc2f6200b6'
    })

    this.$store.dispatch('loadMeasurements')
  }
}).$mount('#app')
