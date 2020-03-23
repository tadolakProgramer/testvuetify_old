import Vue from 'vue';
import Vuetify from 'vuetify/lib';

import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#4CAF50', // #E53935
                secondary: colors.lightGreen, // #FFCDD2
                accent: '#1565C0',
                error: '#F44336',
                info: '#00E676',
                warning: '#FFC107',
                success: '#4CAF50',
            },
        },
    },
});
