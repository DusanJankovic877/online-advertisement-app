import { createStore } from 'vuex'
import authModule from './authModule';
import errorsModule from './errorsModule';
import advertisementsModule from './advertisementsModule';

export default createStore({

  modules: {
    authModule,
    errorsModule,
    advertisementsModule
  }
})
