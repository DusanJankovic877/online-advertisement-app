import categoryServices from "../services/categoryServices"
const categoriesModule = {
    namespaced: true,
    state:{
        categories: {}
    },
    mutations:{
        SET_CATEGORIES(state, categories){
            state.categories = categories
        }
    },
    actions:{
        async getCategories({ commit }){
            const CATEGORIES = await categoryServices.getCategories();
            commit('SET_CATEGORIES', CATEGORIES.data)
        }
    },
    getters:{
        categories: (state) => state.categories
    }
}
export default categoriesModule;