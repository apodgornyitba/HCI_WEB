import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PageNotFound from "@/views/PageNotFound";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
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
    path: '/modifyHome',
    name: 'modifyHome',
    component: () => import('../views/modifyHomeView.vue')
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
    name: 'parlante',
    component: () => import('../views/devices/ParlanteView.vue')
  },
  {
    path: '/lampara',
    name: 'lampara',
    component: () => import('../views/devices/LamparaView.vue')
  },
  {
    path: '/heladera',
    name: 'heladera',
    component: () => import('../views/devices/FridgeView')
  },
  {
    path: '/puerta',
    name: 'puerta',
    component: () => import('../views/devices/PuertaView')
  },
  {
    path: '/persiana',
    name: 'persiana',
    component: () => import('../views/devices/PersianaView')
  },

  {
    path: '/grifo',
    name: 'grifo',
    component: () => import('../views/devices/GrifoView')
  },
  {
    path: '/ac',
    name: 'ac',
    component: () => import('../views/devices/ACView')
  },
  {
    path: '/horno',
    name: 'horno',
    component: () => import('../views/devices/HornoView')
  },
  {
    path: '/aspiradora',
    name: 'aspiradora',
    component: () => import('../views/devices/AspiradoraView')
  },
  {
    path: '/alarma',
    name: 'alarma',
    component: () => import('../views/devices/AlarmaView')
  },

  {
    name: 'PageNotFound',
    path: '/:pathMatch(.*)*',
    component: PageNotFound
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
