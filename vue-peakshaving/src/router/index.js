import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Measurements from '@/components/Measurements.vue'

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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
