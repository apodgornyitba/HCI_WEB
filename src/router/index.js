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
        path: '/roomScreen/:roomId',
        name: 'roomScreen',
        props: true,
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
        path: '/c89b94e8581855bc/:deviceId',
        props: true,
        name: 'parlante',
        component: () => import('../views/devices/ParlanteView.vue')
    },
    {
        path: '/go46xmbqeomjrsjr/:deviceId',
        name: 'lampara',
        component: () => import('../views/devices/LamparaView.vue'),
    },
    {
        path: '/rnizejqr2di0okho/:deviceId',
        name: 'heladera',
        component: () => import('../views/devices/FridgeView')
    },
    {
        path: '/lsf78ly0eqrjbz91/:deviceId',
        name: 'puerta',
        component: () => import('../views/devices/PuertaView'),
    },
    {
        path: '/eu0v2xgprrhhg41g/:deviceId',
        name: 'persiana',
        component: () => import('../views/devices/PersianaView')
    },
    {
        path: '/dbrlsh7o5sn8ur4i/:deviceId',
        name: 'grifo',
        component: () => import('../views/devices/GrifoView')
    },
    /*{
        path: '/li6cbv5sdlatti0j/:deviceId',
        name: 'ac',
        component: () => import('../views/devices/ACView')
    },*/
    {
        path: '/im77xxyulpegfmv8/:deviceId',
        name: 'horno',
        component: () => import('../views/devices/HornoView')
    },
    /*{
        path: '/ofglvd9gqx8yfl3l/:deviceId',
        name: 'aspiradora',
        component: () => import('../views/devices/AspiradoraView')
    },
    {
        path: '/mxztsyjzsrq7iaqc/:deviceId',
        name: 'alarma',
        component: () => import('../views/devices/AlarmaView')
    },*/

    // 404: Not found
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
