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
    congestion: 2,
    capacity: 32,
    simulation: true,
    filter: {
      limit: 10,
      key: 'I_1'
    }
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
      state.measurements.push(payload)
    },
    toggleSimulation (state) {
      state.simulation = !state.simulation
    },
    setLimit (state, payload) {
      state.filter.limit = payload
    },
    setKey (state, payload) {
      state.filter.key = payload
    },
    setCongestion (state, payload) {
      state.congestion = payload
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
          }
        )
    },
    autoLogin ({ commit }, payload) {
      // called from main.js
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
      const collection = this.state.simulation ? 'simulation' : 'measurements'
      const limit = this.state.filter.limit
      const docRef = firebase.firestore()
        .collection(collection)
        .orderBy('meta.timestamp', 'desc')
        .limit(limit)

      const loadRealtime = function () {
        docRef.onSnapshot(function (qs) {
          commit('setLoading', true)
          const measurements = []
          qs.forEach((doc) => {
            const measurement = {
              ...doc.data(),
              id: doc.id
            }
            measurements.push(measurement)
          })

          commit('setMeasurements', measurements.reverse())
          commit('setLoading', false)
        })
      }
      // call it
      loadRealtime()
    },
    addMeasurement ({ commit }, payload) {
      // set the timestamp ourself
      payload.meta.timestamp = new Date()
      // const collection = this.state.simulation ? 'simulation' : 'measurements'

      firebase.firestore().collection('simulation').doc().set(payload)
        .then(function () {
        })
        // .catch(function (error) {
        // })
    },
    toggleSimulation ({ commit, dispatch }) {
      commit('toggleSimulation')
      // also reload the sim
      dispatch('loadMeasurements')
      // this.loadMeasurements()
    },
    setLimit ({ commit, dispatch }, payload) {
      commit('setLimit', payload)
      dispatch('loadMeasurements')
    },
    setKey ({ commit, dispatch }, payload) {
      commit('setKey', payload)
      dispatch('loadMeasurements')
    },
    incCongestion ({ commit }) {
      if (this.state.congestion < 32) {
        commit('setCongestion', this.state.congestion + 1)
      }
    },
    decCongestion ({ commit }) {
      if (this.state.congestion > 0) {
        commit('setCongestion', this.state.congestion - 1)
      }
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
    },
    limit (state) {
      return state.filter.limit
    },
    key (state) {
      return state.filter.key
    },
    congestion (state) {
      return state.congestion
    },
    capacity (state) {
      return state.capacity
    }
  }
})
