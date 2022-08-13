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
            console.log('mutation', advertisements.data);
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
        async getAdvertisements({ commit }, pageNumber){
           const ADVERTISEMENTS =  await advertisementServices.getAdvertisements(pageNumber)
           console.log(ADVERTISEMENTS);
            commit('SET_ADVERTISEMENTS', ADVERTISEMENTS);
            commit('SET_CURRENT_PAGE', ADVERTISEMENTS.data.current_page)
            commit('SET_LAST_PAGE', ADVERTISEMENTS.data.last_page)
            commit('SET_LINKS', ADVERTISEMENTS.data.links)
        }
    },
    getters:{
        advertisements: (state) => state.advertisements,
        currentPage: (state) => state.currentPage,
        lastPage: (state) => state.lastPage,
        links: (state) => state.links
    }
}
export default advertisementModule;