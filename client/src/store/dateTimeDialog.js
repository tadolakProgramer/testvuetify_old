export default {
    state: {
        titleDialog: null,
        dateTimeStart: null,
        dateTimeEnd: null,
        dialogType: null
    },
    mutations: {
        setTitleDialog(state, title) {
            state.titleDialog = title
        },
        setDateTimeStart(state, dateTimeStart) {
            state.dateTimeStart = dateTimeStart
        },
        setDateTimeEnd(state, dateTimeEnd) {
            state.dateTimeEnd = dateTimeEnd
        },
        setDialogType(state, dialogType) {
            state.dialogType = dialogType
        }
    },
    action: {
        setTitleDialog({commit}, title) {
            commit('setTitleDialog', title)
        },
        setDateTimeStart({commit}, dateTimeStart) {
            commit('setDateTimeStart', dateTimeStart)
        },
        setDateTimeEnd({commit}, dateTimeEnd) {
            commit('setDateTimeEnd', dateTimeEnd)
        },
        setDialogType({commit}, dialogType) {
            commit('setDialogType', dialogType)
        }
    },
    getters: {
        getTitleDialog(state) {
            return state.titleDialog
        },
        getDateTimeStart(state) {
            return state.dateTimeStart
        },
        getDateTimeEnd(state) {
            return state.dateTimeEnd
        },
        getDialogType(state) {
            return state.dialogType
        }
    }
}
