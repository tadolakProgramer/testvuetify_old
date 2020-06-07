import Api from '../services/Api'

export default {
    getCountFailureByMachine() {
        return Api().get('/statistic/cauntFailureByMachine')
    },
}