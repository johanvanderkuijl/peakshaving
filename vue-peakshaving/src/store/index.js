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
    congestion: 0,
    capacity: 32,
    simulation: true,
    filter: {
      limit: 10,
      key: 'I_1',
      meter: 1
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
      if (state.measurements.length > 20) {
        state.measurements.splice(0, 1)
      }
      state.measurements.push(payload)
    },
    toggleSimulation (state) {
      state.simulation = !state.simulation
    },
    setLimit (state, payload) {
      state.filter.limit = payload
    },
    setMeter (state, payload) {
      state.filter.meter = payload
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
    // only load if simulation is false
    loadMeasurements ({ commit }) {
      const collection = this.state.simulation ? 'simulation' : 'measurements'
      const limit = this.state.filter.limit
      // const meter = this.state.filter.meter

      let unsubscribe

      // console.log('using meter', meter)

      const getRealtimeUpdates = function (document) {
        unsubscribe = firebase.firestore().collection(collection)
          // .where('meta.version', '==', parseInt(this.state.filter.meter))
          .where('meta.version', '==', 2)
          .orderBy('meta.timestamp', 'desc')
          .limit(limit)
          .onSnapshot(function (querySnapshot) {
            commit('setLoading', true)
            const measurements = []
            querySnapshot.forEach(function (doc) {
              if (doc && doc.exists) {
                const measurement = {
                  ...doc.data(),
                  id: doc.id
                }
                measurements.push(measurement)
              }
            })
            commit('setLoading', false)
            commit('setMeasurements', measurements.reverse())
          })
      }

      if (this.state.simulation) {
        // console.log('unsubscribing from realtime mesasurements')
        unsubscribe()
      } else {
        // loadRealtime()
        // console.log('subscribing to realtime mesasurements')
        getRealtimeUpdates()
      }
    },
    addMeasurement ({ commit }, payload) {
      if (this.state.simulation) {
        commit('addMeasurement', payload)
      } else {
        // set the timestamp ourself
        // payload.meta.timestamp = new Date()
        // // const collection = this.state.simulation ? 'simulation' : 'measurements'

        // firebase.firestore().collection('simulation').doc().set(payload)
        //   .then(function () {
        //   })
        //   // .catch(function (error) {
        //   // })
      }
    },
    toggleSimulation ({ commit, dispatch }) {
      commit('toggleSimulation')
      if (!this.state.simulation) {
        dispatch('loadMeasurements')
      } else {
        // dispatch('loadMeasurements')
        commit('setMeasurements', [])
        location.reload()
      }
    },
    setLimit ({ commit, dispatch }, payload) {
      commit('setLimit', payload)
      this.state.measurements = []
      dispatch('loadMeasurements')
    },
    setMeter ({ commit, dispatch }, payload) {
      commit('setMeter', payload)
      dispatch('loadMeasurements')
    },
    setKey ({ commit, dispatch }, payload) {
      commit('setKey', payload)
      dispatch('loadMeasurements')
    },
    incCongestion ({ commit }) {
      if (this.state.congestion < this.state.capacity) {
        commit('setCongestion', this.state.congestion + 1)
      }
    },
    decCongestion ({ commit }) {
      if (this.state.congestion > 0) {
        commit('setCongestion', this.state.congestion - 1)
      }
    },
    setCongestion ({ commit }, payload) {
      commit('setCongestion', payload)
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
    meter (state) {
      return state.filter.meter
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
