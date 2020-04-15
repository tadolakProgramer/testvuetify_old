import Api from '../services/Api'

export default {
    getListaMaszyn() {
        return Api().get('/notification')
    },
    newnotification(maszynaId) {
        return Api().post('/notification/new/',{
            params: maszynaId}
        )
    },
    getMaszyna(maszynaId){
        return Api().get('/notification/new/', {
            params: maszynaId
        })
    }
}
