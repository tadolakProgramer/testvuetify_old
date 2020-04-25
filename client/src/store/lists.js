
export default {
    state: {
        listTypesMachinery: null,
        listHals: null
    },
    mutations: {
        setListaTypowMaszyn(state, listaMaszyn) {
            state.listTypesMachinery = listaMaszyn
        },
        setListaHal(state, listHals) {
            state.listHals = listHals
        }
    },
    actions: {
        setListaTypowMaszyn({commit}, listaMaszyn) {
            commit('setListaTypowMaszyn', listaMaszyn)
        },
        setListaHal({commit}, listHals) {
            commit('setListaHal', listHals)
        }
    },
    getters: {
        getListaTypowMaszyn(state) {
            return state.listTypesMachinery
        },
        getListaHal(state) {
            return state.listHals
        }
    }
}


