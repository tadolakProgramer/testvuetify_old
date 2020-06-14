import Api from '../services/Api'

export default {
    getALLParts() {
        return Api().get('/getAllParts')
    },
    getAllPartsType() {
        return Api().get('/part/getAllTypePart')
    },
    getAllProducer() {
        return Api().get('/part/getAllProducer')
    },
    postPart(credentials) {
        return Api().post('/part/addPart', credentials)
    }
}