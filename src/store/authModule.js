import authServices from "../services/authServices"
const authModule = {
    namespaced: true,
    state:{
        token: null,
        user: null
    },
    mutations:{
        /**
         * Seting token in state Object
         *  
         * @param {Object} state 
         *@param {Object} errors 
         */
        SET_TOKEN(state, token){
            state.token = token;
        },
        /**
         * Reset/Delete token in state Object
         *  
         * @param {Object} state 
         *@param {Object} errors 
         */
        RESET_TOKEN(state){
            state.token = null
        },
        /**
         * Seting user in state Object
         *  
         * @param {Object} state 
         *@param {Object} errors 
         */
        SET_USER(state, user){
            state.user = user
        },
        /**
         * Deleting user in state Object
         *  
         * @param {Object} state 
         *@param {Object} errors 
         */
        RESET_USER(state){
            state.user = null
        }
    },
    actions:{
        /**
         * Passing data to authServices to register user.
         * After that if response status is === 200,dispatch new action to get user data
         *  
         * @param {Object} dispatch 
         *@param {Object} payload 
         */
        async getSignUpData({  dispatch }, payload){
            const RESPONSE = await authServices.signUp(payload)
            if(RESPONSE.status === 200)dispatch('attempt', RESPONSE.data.access_token)
        },
        /**
         * Passing data to authServices to log in user.
         * After that if response status is === 200,dispatch new action to get user data
         *  
         * @param {Object} dispatch 
         *@param {Object} payload 
         */
        async getLoginData({ dispatch } , payload){
            const TOKEN = await authServices.login(payload);
            if(TOKEN)dispatch('attempt', TOKEN.access_token);
        },
        /**
         * If token exists commit mutation to set token.
         * If there is no token in state Object return.
         * Try to get token and commit mutation to set user, 
         * If there is and error commit mutations to delete token and user from state object.
         * @param {Method} commit 
         * @param {String} token 
         * @param {Object} state 
         * @returns 
         */
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
        /**
         * Start to log out, 
         * If if condition is true commit mutations to delete user and token from state Object,
         * and also delete toke n from local storage 
         * @param {Method} commit 
         */
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