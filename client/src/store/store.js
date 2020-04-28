import Vue from "vue";
import Vuex from 'vuex'

import user from "./user"
import lists from"./lists"
import dateTimeDialog from "./dateTimeDialog";


Vue.use(Vuex)

export default new Vuex.Store({
    static: true,
    modules: {
        user: user,
        lists : lists,
        dateTimeDialog: dateTimeDialog
    }
})
