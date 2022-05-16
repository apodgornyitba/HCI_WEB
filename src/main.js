import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store'

Vue.config.productionTip = false

new Vue({
  el: '#app',

  router,
  vuetify,
  store,

  render: h => h(App),

  beforeCreate() {
    this.$store.commit('user/initializeStore');
  }
}).$mount('#app')
