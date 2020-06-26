import axios from 'axios';

const token = localStorage.getItem('token');
console.log(token);
const instance = axios.create({
  baseURL: 'http://localhost:4000/api/v1',
  headers: {
    Authorization: token,

  },
})

export default instance;