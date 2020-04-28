export default {
    state: {
        titleDialog: null,
        dateTime: '',
        dialogType: ''
    },
    mutations: {
        setTitleDialog(state, title) {
            state.titleDialog = title
        },
        setDateTime(state, dateTime) {
            state.dateTime = dateTime
        },
        setDialogType(state, dialogType) {
            state.type = dialogType
        }
    },
    action: {
        setTitleDialog({commit}, title) {
            commit('setTitleDialog', title)
        },
        setDateTime({commit}, dateTime) {
            commit('setDateTime', dateTime)
        },
        setDialogType({commit}, dialogType) {
            commit('setType', dialogType)
        }
    },
    getters: {
        getTitle(state) {
            return state.titleDialog
        },
        getDateTime(state) {
            return state.dateTime
        },
        getTypeDialog(state) {
            return state.dialogType
        }
    }
}