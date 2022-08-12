const errorsModule = {
    namespaced: true,
    state:{
        authErrors: {}
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
        }
    },
    getters:{
        authErrors: (state)=> state.authErrors
    },
}
export default errorsModule