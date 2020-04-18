import Api from '../services/Api'

export default {
    getListaMaszyn() {
        return Api().get('/notification')
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
    addNewNotification() {
        return Api().put('/notification/new/')
    }
}
