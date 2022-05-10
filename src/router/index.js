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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
