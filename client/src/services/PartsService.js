import Api from '../services/Api'

export default {
    getALLParts() {
        return Api().get('/getAllParts')
    },
}