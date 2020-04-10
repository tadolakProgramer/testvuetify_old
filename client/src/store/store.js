import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex)

export default  new Vuex.Store({
    strict: true,
    state: {
        token: null,
        user: null,
        inUserLoggedIn: false
    },
    mutations:{
        setToken(state, token){
            state.token = token

        }
    },
    actions:{
        setToken ({commit}) {
            commit('setToken, token')
        }
    }
})