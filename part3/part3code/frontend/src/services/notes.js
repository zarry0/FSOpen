import axios from 'axios'
const baseUrl = '/api/notes' //relative url

const getAll = () => {
    const request = axios.get(baseUrl);
    const nonExisting = {
        id : 1000,
        content : 'This note is not saved to server',
        important : true
    }
    return request
        .then(
            responseSuccess => responseSuccess.data.concat(nonExisting)
        );

};

const create = (newObj) => {
    return axios.post(baseUrl, newObj)
        .then(response => response.data);
};

const update = (id, newObj) => {
    return axios.put(`${baseUrl}/${id}`, newObj)
        .then(response => response.data);
};

// export default {
//     getAll: getAll,
//     create: create,
//     update: update
// }

export default {getAll, create, update}