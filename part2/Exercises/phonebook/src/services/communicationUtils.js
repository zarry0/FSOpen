import axios from 'axios'

const baseURL = 'http://localhost:3001/persons';

const getAll = () => {
    return axios.get(baseURL).then(response => response.data)
}

const post = (obj) => {
    return axios.post(baseURL, obj).then(response => response.data);
}

export default {getAll, post}