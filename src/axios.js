import axios from 'axios';

const Axios = axios.create({
    baseUrl: 'https://reqres.in/api/',
    timeout: 1000,

})

export default Axios;