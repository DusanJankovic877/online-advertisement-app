import authServices from "../services/authServices"
const authModule = {
    namespaced: true,
    state:{
        token: null,
        user: null
    },
    mutations:{
        SET_TOKEN(state, token){
            state.token = token;
        },
        RESET_TOKEN(state){
            state.token = null
        },
        SET_USER(state, user){
            state.user = user
        },
        RESET_USER(state){
            state.user = null
        }
    },
    actions:{
        async getSignUpData({  dispatch }, payload){
            const RESPONSE = await authServices.signUp(payload)
            if(RESPONSE.status === 200)dispatch('attempt', RESPONSE.data.access_token)
          },
        async getLoginData( {dispatch} , payload){
            const TOKEN = await authServices.login(payload);
            if(TOKEN)dispatch('attempt', TOKEN.access_token);
        },
        async attempt({commit, state}, token){
            if(token) commit('SET_TOKEN', token);
            if(!state.token)return;
            try{
                const RESPONSE = await authServices.me();
                commit('SET_USER', RESPONSE);
            }
            catch(e){
                commit('SET_TOKEN', null);
                commit('SET_USER', null);
            }
        },
        async getLogout({ commit }){
           const RESPONSE = await authServices.logout();
           if(RESPONSE.data.message === 'Successfully logged out' && RESPONSE.status === 200){
                commit('RESET_USER')
                commit('RESET_TOKEN')
                localStorage.removeItem('token')
           }

        }
    },
    getters:{
        isLogged: (state) => {return !!state.token && !!state.user},
        loggedUser: (state) => state.user,
    }

}
export default authModule;