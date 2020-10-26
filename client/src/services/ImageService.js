import Api from '../services/Api'

export default {
    upLoudImage(formData) {
        console.log(formData)
        return Api().post('/update', formData , {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            }
            )
    }
}
