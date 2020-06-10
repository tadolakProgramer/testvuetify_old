import Api from '../services/Api'

export default {
    getCountFailureByMachine() {
        return Api().get('/statistic/cauntFailureByMachine')
    },
    getFailurePerMonth() {
        return Api().get('/statistic/failurePerMonth')
    },

    getFailureMachineryByMonth(IDS) {
        return Api().get('/statistic/failureMachineryByMonth',
            {params: IDS}
        )
    },
}