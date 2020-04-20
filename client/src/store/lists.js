
export default {
    state: {
        listMachinery: null,
        listHals: null
    },
    mutations: {
        setListaMaszyn(state, listaMaszyn) {
            state.listMachinery = listaMaszyn
        },
        setListaHal(state, listHals) {
            state.listHals = listHals
        }
    },
    actions: {
        setListaMaszyn({commit}, listaMaszyn) {
            commit('setListaMaszyn', listaMaszyn)
        },
        setListaHal({commit}, listHals) {
            commit('setListaHal', listHals)
        }
    },
    getters: {
        getListaMaszyn(state) {
            return state.listMachinery
        },
        getListaHal(state) {
            return state.listHals
        }
    }
}


