import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
//import Vuetify from 'vuetify/lib'
//import colors from 'vuetify/lib/util/colors'

Vue.config.productionTip = false

//Vue.use(Vuetify)

new Vue({
  vuetify,
  //vuetify= new Vuetify(){
  // theme:{
  //  themes:{
  //    light:{
  //            primary: colors.red.darken1,
  //            secondary: colors.red.lighten4,
  //            accent: colors.indigo.base,
  //          },
  //          dark: {
  //            primary: colors.lime.darken2
  //          }
  //         }
  //      },
  //}),
  render: h => h(App)
}).$mount('#app')
