const errorsModule = {
    namespaced: true,
    state:{
        authErrors: {},
        unauthError: null,
        message: null
    },
    mutations:{
        /**
         * Set authErrors in state Object
         * @param {Object} state 
         *@param {Object} errors 
         */
        SET_AUTH_ERRORS(state, errors){
            state.authErrors = errors
        },
        /**
         * Delete authErrors in state Object
         * @param {Object} state 
         */
        DELETE_AUTH_ERRORS(state){
            state.authErrors = {}
        },
        /**
         * Set un auth errors in state Object 
         * @param {Object} state 
         *@param {Object} error 
         */
        SET_UNAUTH_ERROR(state, error) {
            state.unauthError = error
        },
        /**
         * Delete un auth errors in state Object
         * @param {Object} state 
         */
        DELETE_UNAUTH_ERRORS(state) {
            state.unauthError = null
        },
        /**
         * Set message in state Object
         * @param {Object} state 
         *@param {Object} message 
         */
        SET_MESSAGE(state, message){
            state.message = message
            setTimeout(function(){state.message = ''}, 2000); 
            
        },
                /**
         * Delete message in state Object
         * @param {Object} state 
         *@param {Object} message 
         */
        DELETE_MESSAGE(state){
            state.message = null
        }
        
    },
    actions:{
        /**
         * Commiting a mutation to set auth errors if errors exists
         * 
         * @param {Method} commit 
         * @param {Object} errors 
         */
        setAuthErrors({ commit }, errors){
            if(errors){
                commit('SET_AUTH_ERRORS', errors)
            }
        },
        /**
         * Commiting a mutation to delete auth errors
         * 
         * @param {Method} commit 
         */
        deleteAuthErrors({ commit }){
            commit('DELETE_AUTH_ERRORS')
        },
        /**
         * Commiting a mutation to set un auth errors
         * 
         * @param {Method} commit 
         * @param {Object} errors 
         */
        setUnauthError({ commit }, error){
            commit('SET_UNAUTH_ERROR', error)
        },
        /**
         * Commiting a mutation to delete un auth error
         * 
         * @param {Method} commit 
         */
        deleteUnauthError({ commit }){
            commit('DELETE_UNAUTH_ERRORS')
        },
        /**
         * Commiting a mutation to set un auth message
         * 
         * @param {Method} commit 
         * @param {Object} message 
         */
        setMessage({ commit }, message){
            commit('SET_MESSAGE', message)
        },
        /**
         * Commiting a mutation to delete message
         * 
         * @param {Method} commit 
         */
        deleteMessage({ commit }){
            commit('DELETE_MESSAGE')
            console.log('deletes');
        }
    },
    getters:{
        authErrors: (state)=> state.authErrors,
        unauthError: (state) => state.unauthError,
        message: (state) => state.message
    },
}
export default errorsModule