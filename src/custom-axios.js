import axios from 'axios';

const token = localStorage.getItem('token');
const instance = axios.create({
    baseURL: 'localhost:4000/api/v1',
    headers: {
        Authorization: token,
        
      },
})

export default instance;