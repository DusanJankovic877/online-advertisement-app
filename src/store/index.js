import { createStore } from 'vuex'
import authModule from './authModule';
import errorsModule from './errorsModule';
import advertisementsModule from './advertisementsModule';
import usersModule from './usersModule';

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
    advertisementsModule,
    usersModule
  }
})
