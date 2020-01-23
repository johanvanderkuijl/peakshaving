import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home.vue'
import Measurements from '@/components/Measurements.vue'
import AddMeasurement from '@/components/measurements/Add.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/measurements',
    name: 'measurements',
    component: Measurements
  },
  {
    path: '/measurements/add',
    name: 'measurements',
    component: AddMeasurement
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
