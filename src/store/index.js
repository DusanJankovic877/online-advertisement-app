import { createStore } from 'vuex'
import authModule from './authModule';
import errorsModule from './errorsModule';
import advertisementsModule from './advertisementsModule';

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: { 
  },
  modules: {
    authModule,
    errorsModule,
    advertisementsModule
  }
})
