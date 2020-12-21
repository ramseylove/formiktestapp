import Axios from 'axios';

const request = Axios.create({
    baseURL: 'https://reqres.in/api',
    timeout: 1000,

})

export default request;