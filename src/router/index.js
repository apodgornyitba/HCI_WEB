import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/help',
    name: 'help',
    component: () => import('../views/ayudaView.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/aboutView.vue')
  },
  {
    path: '/addUser',
    name: 'addUser',
    component: () => import('../views/AddUserScreenView.vue')
  },
  {
    path: '/mainScreen',
    name: 'mainScreen',
    component: () => import('../views/mainScreenView.vue')
  },
  {
    path: '/houseScreen',
    name: 'houseScreen',
    component: () => import('../views/houseScreenView.vue')
  },
  {
    path: '/acknowledgment',
    name: 'acknowledgment',
    component: () => import('../views/AcknowledgementsView.vue')
  },
  {
    path: '/createroutine',
    name: 'routinecreation',
    component: () => import('../views/routine/RoutineCreationView.vue')
  },
  {
    path: '/modifyDevices',
    name: 'modifyDevices',
    component: () => import('../views/modifyDevicesView.vue')
  },
  {
    path: '/parlante',
    name: 'Parlante',
    component: () => import('../views/devices/ParlanteView.vue')
  },
  {
    path: '/lampara',
    name: 'Lampara',
    component: () => import('../views/devices/LamparaView.vue')
  },
  {
    path: '/heladera',
    name: 'Heladera',
    component: () => import('../views/devices/FridgeView')
  },
  {
    path: '/puerta',
    name: 'Puerta',
    component: () => import('../views/devices/PuertaView')
  },

  {
    path: '/grifo',
    name: 'Grifo',
    component: () => import('../views/devices/GrifoView')
  },
  {
    path: '/ac',
    name: 'AC',
    component: () => import('../views/devices/ACView')
  },
  {
    path: '/horno',
    name: 'Horno',
    component: () => import('../views/devices/HornoView')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
