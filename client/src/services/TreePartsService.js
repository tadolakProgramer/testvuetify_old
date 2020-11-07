import Api from '../services/Api'

export default {
    getTreeByMachine(IDS) {
        return Api().get('/components/gettree/',
            {params: IDS}
            )
    },
    addNewNode(credentials){
        return Api().post('/components/addNewNode', credentials)
    },
    updateNode(credentials){
        return Api().post('/components/updateNode', credentials)
    }
}
