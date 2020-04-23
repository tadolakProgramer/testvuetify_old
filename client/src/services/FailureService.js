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
        return Api().get('/failure/new/',
            {params: IDS}
        )
    },
    addNewFailure(credentials) {
        return Api().put('/failure/new/', credentials)
    },
    getAllFailure() {
        return Api().get('/getAllFailure')
    },

    getFailureMachina(IdMaszyna){
        return Api().get('/getFailureMachine/',
            {params: IdMaszyna})
    }
}
