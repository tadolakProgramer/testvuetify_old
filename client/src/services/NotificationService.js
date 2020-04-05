import Api from '../services/Api'

export default {
    getListaMaszyn() {
        return Api().get('/notification')
    },
    newNotification() {
        return Api().post('/notification/new')
    }
}