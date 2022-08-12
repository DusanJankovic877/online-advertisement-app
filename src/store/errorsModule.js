const errorsModule = {
    namespaced: true,
    state:{
        authErrors: {},
        unauthError: null
    },
    mutations:{
        /**
         * Seting authErrors in state Object
         *  
         * @param {Object} state 
         *@param {Object} errors 
         */
        SET_AUTH_ERRORS(state, errors){
            state.authErrors = errors
        },
                /**
         * Deleting authErrors in state Object
         *  
         * @param {Object} state 
         *@param {Object} errors 
         */
        DELETE_AUTH_ERRORS(state){
            state.authErrors = {}
        },
        SET_UNAUTH_ERROR(state, error) {
            state.unauthError = error
        },
        DELETE_UNAUTH_ERRORS(state) {
            state.unauthError = null
        }
    },
    actions:{
        /**
         * Commiting a mutation to set authErrors if errors exists
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
         * Commiting a mutation to delete authErrors if errors exists
         * 
         * @param {Method} commit 
         */
        deleteAuthErrors({ commit }){
            commit('DELETE_AUTH_ERRORS')
        },
        setUnauthError({ commit }, error){
            commit('SET_UNAUTH_ERROR', error)
            console.log('SET_UNAUTH_ERROR', error);
        },
        deleteUnauthError({ commit }){
            commit('DELETE_UNAUTH_ERRORS')

        }
    },
    getters:{
        authErrors: (state)=> state.authErrors,
        unauthError: (state) => state.unauthError
    },
}
export default errorsModule