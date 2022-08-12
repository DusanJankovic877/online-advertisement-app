import { createStore } from 'vuex'
import authModule from './authModule';
import errorsModule from './errorsModule';

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: { 
  },
  modules: {
    authModule,
    errorsModule
  }
})
