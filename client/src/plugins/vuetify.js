import Vue from 'vue';
import Vuetify from 'vuetify/lib';

import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: colors.green, // #E53935
                secondary: colors.lightGreen, // #FFCDD2
                accent: '#1565C0',
                error: colors.red,
                info: '#2196F3',
                warning: '#FFC107',
                success: '#4CAF50',
            },
        },
    },
});

