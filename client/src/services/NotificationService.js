import Api from '../services/Api'

export default {
    getListaMaszyn(IdHala) {
        return Api().get('/notification',
            {params: IdHala})
    },
    newnotification() {
        return Api().post('/notification/new/'
        )
    },
    getMaszyna(IDS){
        return Api().get('/notification/new/',
            {params: IDS}
        )
    },
    addNewNotification(credentials) {
        return Api().put('/notification/new/', credentials)
    }
}
