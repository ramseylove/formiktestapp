import Axios from 'axios';

export default axios = Axios.create({
    baseUrl: 'https://reqres.in/api/',
    timeout: 1000,

})