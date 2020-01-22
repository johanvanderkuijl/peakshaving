import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    measurements: []
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    },
    setMeasurements (state, payload) {
      state.measurements = payload
    }
  },
  actions: {
    loadMeasurements ({ commit }) {
      commit('setLoading', true)
      const measurements = []
      firebase.firestore().collection('measurements').get().then((qs) => {
        qs.forEach((doc) => {
          const measurement = {
            ...doc.data(),
            id: doc.id
          }
          console.log('got measurement:', measurement)
          measurements.push(measurement)
        })

        commit('setMeasurements', measurements)
        commit('setLoading', false)
      })
    }
  },
  getters: {
    measurements (state) {
      return state.measurements
    }
  }
})
