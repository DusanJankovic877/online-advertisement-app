import axios from 'axios'
import store from '../store';

export class RequestHandler {
    constructor() {
        this.apiClient = axios.create({
            baseURL: 'http://127.0.0.1:8000/api',
            Accept: 'application/json'
        });

        this.apiClient.interceptors.request.use(config => {
            if (localStorage.getItem('token')) {
                config.headers['Authorization'] = `Bearer ${store.state.authModule.token}`
                }
                store.subscribe((mutation) => {
                    switch (mutation.type) {
                        case 'authModule/SET_TOKEN':
                            if (mutation.payload) {
                                this.apiClient.defaults.headers.common['Authorization'] = `Bearer ${store.state.authModule.token}`
                                localStorage.setItem('token', mutation.payload)
                            } else {
                                this.apiClient.defaults.headers.common['Authorization'] = null
                                localStorage.removeItem('token')
                            }
                            break;
                        }
                    })
                    
                  
            return config;
        });
        this.apiClient.interceptors.response.use(  response => {
            if(response.status === 200 ){
                if(response.data.message)store.dispatch('errorsModule/setMessage', response.data.message)  
            }
            return response;

        }, async error => {
            if (error.response.status === 422) {
                if (error.response.data.errors) {
                    await store.dispatch('errorsModule/setAuthErrors', error.response.data.errors)
                    return Promise.resolve();
                }
            } 
            else if(error.response.status === 401){
                await store.dispatch('errorsModule/setUnauthError', error.response.data.error)
                return Promise.resolve();
            }else {
                return Promise.reject(error);
            }
        });
    }
}