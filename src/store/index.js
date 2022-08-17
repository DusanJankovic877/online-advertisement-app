import { createStore } from 'vuex'
import authModule from './authModule';
import errorsModule from './errorsModule';
import advertisementsModule from './advertisementsModule';
import categoriesModule from './categoriesModule';

export default createStore({

  modules: {
    authModule,
    errorsModule,
    advertisementsModule,
    categoriesModule
  }
})
