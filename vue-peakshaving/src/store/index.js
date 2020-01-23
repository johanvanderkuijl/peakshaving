import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userIsAuthenticated: false,
    loading: false,
    measurements: []
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    },
    setMeasurements (state, payload) {
      state.measurements = payload
    },
    addMeasurement(state, payload) {
      console.log('mutations: adding payload', payload)
      state.measurements.push(payload)
    },
    logUserIn (state) {
      state.userIsAuthenticated = true
    },
    logUserOut (state) {
      state.userIsAuthenticated = false
    }
  },
  actions: {
    login ({ commit }) {
      commit('logUserIn')
    },
    logout ({ commit }) {
      commit('logUserOut')
    },
    loadMeasurements ({ commit }) {
      commit('setLoading', true)
      const measurements = []
      firebase.firestore()
        .collection('measurements')
        .orderBy('meta.timestamp', 'desc')
        .limit(10)
        .get()
        .then((qs) => {
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
    },
    addMeasurement ({ commit }, payload) {
      // set the timestamp ourself
      payload.meta.timestamp = new Date()
      // console.log('add measurement', payload)
      firebase.firestore().collection('measurements').doc().set(payload)
        .then(function () {
          console.log('Document successfully written!')
          // add to local db
          commit('addMeasurement', payload)
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
    }
  },
  getters: {
    measurements (state) {
      return state.measurements
    },
    userIsAuthenticated (state) {
      return state.userIsAuthenticated
    }
  }
})
