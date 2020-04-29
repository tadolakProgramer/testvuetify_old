import Api from '../services/Api'

export default {
    getListaMaszyn() {
        return Api().get('/failure')
    },
    newfailure() {
        return Api().post('/failure/new/'
        )
    },
    getMaszyna(IDS){
        return Api().get('/getMaszyna/',
            {params: IDS}
        )
    },
    addNewFailure(credentials) {
        return Api().put('/failure/new/', credentials)
    },
    getAllFailure() {
        return Api().get('/getAllFailure')
    },

    getOneFailure(ID_AWARIA) {
        return Api().get('/getOneFailure',
            {params: ID_AWARIA})
    },

    getFailureMachina(IDS){
        return Api().get('/getFailureMachine/',
            {params: IDS})
    }
}
