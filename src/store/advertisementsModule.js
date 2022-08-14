import advertisementServices from '../services/advertisementServices'
const advertisementModule = {
    namespaced: true,
    state:{
        advertisements: {},
        advertisement: null,
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
        },
        DELETE_ADVERTISEMENTS(state){
            state.advertisements = {}
        },
        SET_ADVERTISEMENT(state, payload){
            state.advertisement = payload
        }
    },
    actions:{
        
        async getAdvertisements({ commit }, payload){
            const CATEGORY = !!payload.category
            const SEARCH_BY_TITLE = !!payload.searchByTitle
            const SEARCH_BY_PRICE = !!payload.searchByPrice
            let advertisements = {}
            if(SEARCH_BY_TITLE){
                advertisements = await advertisementServices.getAdvertisementsByTitle({
                    nextPage: payload.nextPage, 
                    searchByTitle: payload.searchByTitle
                });
            }else if(CATEGORY){
                advertisements =  await advertisementServices.getAdvertisementsByCategory({nextPage: payload.nextPage, category: payload.category});
            }else if(SEARCH_BY_PRICE){
                advertisements =  await advertisementServices.getAdvertisementsByPrice({nextPage: payload.nextPage, price: payload.searchByPrice});
            }else{
                advertisements =  await advertisementServices.getAdvertisements({nextPage: payload.nextPage});
            }
            commit('SET_ADVERTISEMENTS', advertisements);
            commit('SET_CURRENT_PAGE', advertisements.data.current_page)
            commit('SET_LAST_PAGE', advertisements.data.last_page)
            commit('SET_LINKS', advertisements.data.links)
        },
        async getAdvertisement( { commit } , payload){

            const ADVERTISEMENT = await advertisementServices.getAdvertisement(payload) 
            commit('SET_ADVERTISEMENT', ADVERTISEMENT.data)
            
        },
        async getCreateEditAdvertisement( {commit} , payload){
            let advertisement = {}
            if(payload.heading === 'Edit Advertisement'){
                advertisement = await advertisementServices.editAdvertisement(payload.advertisement)
                commit('SET_ADVERTISEMENT', advertisement.data.advertisement)
            }
            else if(payload.heading === 'Create Advertisement'){
                advertisement = await advertisementServices.createAdvertisement(payload.advertisement)
            }
        }
        
    },
    getters:{
        advertisements: (state) => state.advertisements,
        advertisement: (state) => state.advertisement,
        currentPage: (state) => state.currentPage,
        lastPage: (state) => state.lastPage,
        links: (state) => state.links
    }
}
export default advertisementModule;