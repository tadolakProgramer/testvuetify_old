import Api from '../services/Api'

export default {
    getListaMaszyn() {
        return Api().get('/notification')
    },
    newnotification(IDS) {
        return Api().post('/notification/new/IDS',{IDS:IDS}
        )
    },
    getMaszyna(IDS){
        return Api().get('/notification/new/',
            {params: IDS}
        )
    }
}
