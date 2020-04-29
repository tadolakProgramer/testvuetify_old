export default {
    state: {
        isfailureCreate: false,
        isfailureEdit: false,
        idFailure: 0
    },
    mutations: {
        setfailureCreate(state) {
            state.isfailureCreate = true
            state.isfailureEdit = false
            state.idFailure = 0
        },
        setfailureEdit(state, idFailure) {
            state.isfailureCreate = false
            state.isfailureEdit = true
            state.idFailure = idFailure
        }
    },
    action: {
        setfailureCreate({commit}) {
            commit('setfailureCreate')
        },
        setfailureEdit({commit}, idFailure) {
            commit('setfailureEdit', idFailure)
        }
    },
    getters: {
        isfailureCreate(state) {
            return state.isfailureCreate
        },
        isfailureEdit(state) {
            return state.isfailureEdit
        },
        getIdFailure(state) {
            return state.idFailure
        }
    }
}