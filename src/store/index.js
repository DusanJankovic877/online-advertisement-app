import { createStore } from 'vuex'
import loginServices from '../services/loginServices';
import signUpServices from '../services/signUpServices';
export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
    async getSignUpData(state, payload){
      await signUpServices.signUp(payload)
    },
    async getLoginData(state, payload){
      await loginServices.login(payload)
    }
    
  },
  modules: {
  }
})
