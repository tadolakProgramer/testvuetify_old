import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@mdi/font/css/materialdesignicons.css'
//import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify,
    {iconfont: 'mdi'|| 'fa'}
    );

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#4CAF50', // #E53935
                secondary: '#d9ffb3',
                accent: '#1565C0',
                error: '#F44336',
                info: '#00E676',
                warning: '#FFC107',
                success: '#33bf9e',
                szary: '#5b5b58',
            },
        },
    },
});
