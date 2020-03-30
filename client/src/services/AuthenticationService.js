import Api from '../services/Api'

export default {
  register (credentials) {
    return Api().post('/register', credentials);
  },
  getHale () {
    console.log('hehe hehe');
    return Api().get('/register');
  }
}
