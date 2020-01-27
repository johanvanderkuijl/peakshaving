import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    loading: false,
    error: null,
    measurements: [],
    simulation: true
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    },
    setMeasurements (state, payload) {
      state.measurements = payload
    },
    addMeasurement (state, payload) {
      console.log('mutations: adding payload', payload)
      state.measurements.push(payload)
    },
    toggleSimulation (state) {
      state.simulation = !state.simulation
    }
  },
  actions: {
    login ({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError', true)
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            console.log('store login', user)
            const LoggedInUser = {
              id: user.uid
            }
            commit('setUser', LoggedInUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    autoLogin ({ commit }, payload) {
      // called from main.js
      console.log('autoLogin with user', payload)
      const LoggedInUser = {
        id: payload.uid
      }
      commit('setUser', LoggedInUser)
    },
    logout ({ commit }) {
      // remove token from local store
      firebase.auth().signOut()
      // remove user from state
      commit('setUser', null)
      // push / to router
    },
    clearError ({ commit }) {
      commit('clearError')
    },
    loadMeasurements ({ commit }) {
      console.log('simulation w state:', this.state.simulation)
      const collection = this.state.simulation ? 'simulation' : 'measurements'
      console.log('using collection:', collection)
      const docRef = firebase.firestore()
        .collection(collection)
        .orderBy('meta.timestamp', 'desc')
        .limit(20)

      const loadRealtime = function () {
        docRef.onSnapshot(function (qs) {
          commit('setLoading', true)
          const measurements = []
          qs.forEach((doc) => {
            const measurement = {
              ...doc.data(),
              id: doc.id
            }
            console.log('got measurement from db:', measurement)
            measurements.push(measurement)
          })

          commit('setMeasurements', measurements)
          commit('setLoading', false)
        })
      }
      // call it
      loadRealtime()
    },
    addMeasurement ({ commit }, payload) {
      // set the timestamp ourself
      payload.meta.timestamp = new Date()
      console.log('action addMeasurement', payload)
      const collection = this.state.simulation ? 'simulation' : 'measurements'
      console.log('using collection:', collection)

      firebase.firestore().collection(collection).doc().set(payload)
        .then(function () {
          console.log('Measurement successfully added to db')
          // add to local db
          // commit('addMeasurement', payload)
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
    },
    toggleSimulation ({ commit, dispatch }) {
      console.log('inside toglesimulation')
      commit('toggleSimulation')
      // also reload the sim
      dispatch('loadMeasurements')
      // this.loadMeasurements()
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    measurements (state) {
      return state.measurements
    },
    simulation (state) {
      return state.simulation
    }
  }
})
