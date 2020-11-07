import axios from 'axios'
import store from "../store/store";

export default () => {
  return axios.create({
    baseURL: 'http://192.168.1.146:3000/',
    //baseURL: 'http://192.168.0.41:3000/',
    headers: {
      Authorization: `Bearer ${store.state.token}`
    }
  })
}
