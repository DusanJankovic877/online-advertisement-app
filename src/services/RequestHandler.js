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
        this.apiClient.interceptors.response.use( async response => {
            // await delay(3000);
            // store.dispatch('doneLoading')
            if(response.status === 200 && response.data.message){
                console.log(response.data.message);
                await store.dispatch('errorsModule/setMessage', response.data.message)
            }
            // if(response)
            return response;

        }, async error => {
            if (error.response.status === 422) {
                console.log(error.response);
                if (error.response.data.errors) {
                    await store.dispatch('errorsModule/setAuthErrors', error.response.data.errors)
                    return Promise.resolve();
                }
                // await store.dispatch('doneLoading')
            } 
            else if(error.response.status === 401){
                console.log(error.response);
                await store.dispatch('errorsModule/setUnauthError', error.response.data.error)
                return Promise.resolve();
            }else {
                return Promise.reject(error);
            }
            // else if (error.response.status === 422) {
            //     if (error.response.config.url === '/auth/login') {
            //         await store.dispatch('AdminModule/setAuthError', error.response.data.message)
            //         await store.dispatch('AdminModule/setAuthErrors', error.response.data.errors)
            //     } else {
            //         await store.dispatch('setErrors', error.response.data.errors)
            //     }
            //     await store.dispatch('doneLoading')
            //     return Promise.resolve();
            // } 
        });
    }
}