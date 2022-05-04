import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import light from './vuetify/theme'

Vue.use(Vuetify);

export default new Vuetify({

    theme: {
        options: { customProperties: true },
        themes: {light}
    },
});
