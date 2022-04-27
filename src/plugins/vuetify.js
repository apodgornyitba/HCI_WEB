import Vue from 'vue';
import Vuetify from 'vuetify/lib';
// import userIcon from './user.png'
import light from './theme'

Vue.use(Vuetify);

export default new Vuetify({
    // icons:{
    //     values:{
    //         custom: {
    //             customUserIcon: userIcon,
    //         },
    //     },
    // },
    theme:{
        themes:{ light }
    },
});