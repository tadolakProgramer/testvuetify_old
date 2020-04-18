import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex)

export default  new Vuex.Store({
    strict: true,
    state: {
        token: null,
        user: null,
        inUserLoggedIn: false,
        profesja: null
    },
    mutations: {
        setToken (state, token) {
            state.token = token
            state.isUserLoggedIn = !!(token)
        },
        setUser (state, user) {
            state.user = user
        },
        setProfesja (state, profesja){
            state.profesja = profesja
        }
    },
    actions: {
        setToken ({commit}, token) {
            commit('setToken', token)
        },
        setUser ({commit}, user) {
            commit('setUser', user)
        },
        setProfesja ({commit}, profesja) {
            commit('setProfesja', profesja)
        }
    },
    getters: {
        user (state) {
            return state.user
        },
        profesja (state){
            return state.profesja
        }
    }
})
