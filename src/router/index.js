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
    path: '/mainScreen',
    name: 'mainScreen',
    component: () => import('../views/mainScreenView.vue')
  },
  {
    path: '/roomScreen',
    name: 'roomScreen',
    component: () => import('../views/roomScreenView.vue')
  },
  {
    path: '/acknowledgment',
    name: 'acknowledgment',
    component: () => import('../views/AcknowledgementsView.vue')
  },
  {
    path: '/modifyDevices',
    name: 'modifyDevices',
    component: () => import('../views/modifyDevicesView.vue')
  },
  {
    path: '/addDevice',
    name: 'addDevice',
    component: () => import('../views/addDeviceView.vue')
  },
  {
    path: '/addRoom',
    name: 'addRoom',
    component: () => import('../views/addRoomView.vue')
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
