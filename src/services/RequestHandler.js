import axios from 'axios'

import store from '../store';

// import router from '../router'
// import  NProgress  from 'nprogress';


export class RequestHandler {
    constructor() {
        this.apiClient = axios.create({
            baseURL: 'http://127.0.0.1:8000/api',
            Accept: 'application/json',
            enctype: 'multipart/form-data',
            // header: { 'Access-Control-Allow-Origin': '*' }
        });
        // async function delay(delayInms) {
        //     return new Promise(resolve  => {
        //       setTimeout(() => {
        //         resolve(2);
        //       }, delayInms);
        //     });
        //   }
        this.apiClient.interceptors.request.use(config => {
            // store.dispatch('startLoading')
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
    }
}