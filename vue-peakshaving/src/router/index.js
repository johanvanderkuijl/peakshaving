import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home.vue'
import Measurements from '@/components/Measurements.vue'
import AddMeasurement from '@/components/measurements/Add.vue'
import Login from '@/components/user/Login.vue'
import AuthGuard from './auth-guard'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: 'Peakshaving'
    }
  },
  {
    path: '/measurements',
    name: 'measurements',
    component: Measurements,
    meta: {
      title: 'Peakshaving - metingen'
    }
  },
  {
    path: '/measurements/add',
    name: 'add-measurements',
    component: AddMeasurement,
    beforeEnter: AuthGuard,
    meta: {
      title: 'Peakshaving - meting toevoegen'
    }
  },
  {
    path: '/user/login',
    name: 'login',
    component: Login,
    meta: {
      title: 'Peakshaving - login'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
