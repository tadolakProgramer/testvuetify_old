import Api from '../services/Api'

export default {
    getListaMaszyn() {
        return Api().get('/notification')
    },
    newnotification(maszynaId) {
        const  ID = maszynaId
        return Api().post('/notification/new/',{
            params: ID}
        )
    },
    getMaszyna(maszynaId){
        return Api().get('/notification/new/', {
            params: maszynaId
        })
    }
}
