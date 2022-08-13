import advertisementServices from '../services/advertisementServices'
const advertisementModule = {
    namespaced: true,
    state:{
        advertisements: {},
        gallery: null,
        currentPage: null,
        lastPage:null,
        links: {}
    },
    mutations:{
        SET_ADVERTISEMENTS(state, advertisements){
            state.advertisements = advertisements.data.data
        },
        SET_CURRENT_PAGE(state, currentPage){
            state.currentPage = currentPage
        },
        SET_LAST_PAGE(state, lastPage){
            state.lastPage = lastPage
        },
        SET_LINKS(state, links){
            links.shift()
            links.pop()
            state.links = links
        }
    },
    actions:{
        
        async getAdvertisements({ commit }, payload){
            const CATEGORY = !!payload.category
            const SEARCH_BY_TITLE = !!payload.searchByTitle
            let advertisements = {}
            if(SEARCH_BY_TITLE){
                advertisements = await advertisementServices.getAdvertisementsByTitle({
                    nextPage: payload.nextPage, 
                    searchByTitle: payload.searchByTitle
                });
            }else if(CATEGORY){
                advertisements =  await advertisementServices.getAdvertisementsByCategory({nextPage: payload.nextPage, category: payload.category});
            }else{
                advertisements =  await advertisementServices.getAdvertisements({nextPage: payload.nextPage});
            }
            commit('SET_ADVERTISEMENTS', advertisements);
            commit('SET_CURRENT_PAGE', advertisements.data.current_page)
            commit('SET_LAST_PAGE', advertisements.data.last_page)
            commit('SET_LINKS', advertisements.data.links)
        },
        
    },
    getters:{
        advertisements: (state) => state.advertisements,
        currentPage: (state) => state.currentPage,
        lastPage: (state) => state.lastPage,
        links: (state) => state.links
    }
}
export default advertisementModule;