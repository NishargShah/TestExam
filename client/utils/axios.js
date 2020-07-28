import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.SERVER_API
});

export const setHeaderToken = token => {
    if (token) {
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete instance.defaults.headers.common['Authorization'];
    }
};

instance.interceptors.request.use(request => {
    console.log('req', request);
    return request;
}, error => {
    console.log('req', error);
    console.log('req', error.request.data.message);
    return Promise.reject(error);
});

instance.interceptors.response.use(response => {
    console.log('res', response);
    return response;
}, error => {
    console.log('res', error);
    console.log('res', error.response.data.message);
    return Promise.reject(error);
});

export default instance;
