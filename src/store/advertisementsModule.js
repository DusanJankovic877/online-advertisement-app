import advertisementServices from '../services/advertisementServices'
const advertisementModule = {
    namespaced: true,
    state:{
        advertisements: {},
        advertisement: null,
        currentPage: null,
        lastPage:null,
        links: {},
        filterAdvertisements: {
            page: '',
            category: '',
            title: '',
            priceOrder: '',
            userId: ""
        },
        showUsersAdverts: false
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
        async filterAdverts({state, commit }, payload){
            if(payload.page){
                state.filterAdvertisements.page = payload.page
            }
            if(payload.category )if(payload.category !== 'None')state.filterAdvertisements.category = payload.category
            else if(payload.category === 'None'){console.log('none', payload.category); state.filterAdvertisements.category = ''}
            if(payload.title || payload.title === null)state.filterAdvertisements.title = payload.title
            if(payload.priceOrder)state.filterAdvertisements.priceOrder  = payload.priceOrder 
            if(payload.showUsersAdvertisements){
                state.showUsersAdverts = payload.showUsersAdvertisements
                state.filterAdvertisements.userId = payload.userId
            }else if(payload.showUsersAdvertisements === false){
                state.showUsersAdverts = payload.showUsersAdvertisements
                state.filterAdvertisements.userId = ''
            }

            const FILTERED_ADVERTISEMENTS = await advertisementServices.filterAvertisements(state.filterAdvertisements)
            commit('SET_ADVERTISEMENTS', FILTERED_ADVERTISEMENTS);
            commit('SET_CURRENT_PAGE', FILTERED_ADVERTISEMENTS.data.current_page)
            commit('SET_LAST_PAGE', FILTERED_ADVERTISEMENTS.data.last_page)
            commit('SET_LINKS', FILTERED_ADVERTISEMENTS.data.links)
        },
        async getAdvertisements( {commit} , payload){
            const ADVERTISEMENTS =  await advertisementServices.getAdvertisements({nextPage: payload.nextPage});
            commit('SET_ADVERTISEMENTS', ADVERTISEMENTS);
            commit('SET_CURRENT_PAGE', ADVERTISEMENTS.data.current_page)
            commit('SET_LAST_PAGE', ADVERTISEMENTS.data.last_page)
            commit('SET_LINKS', ADVERTISEMENTS.data.links)
        },
        async getAdvertisement( { commit } , payload){
            const ADVERTISEMENT = await advertisementServices.getAdvertisement(payload) 
            commit('SET_ADVERTISEMENT', ADVERTISEMENT.data)
            
        },
        async getCreateEditAdvertisement( {commit} , payload){
          
            if(payload.heading === 'Edit Advertisement'){
                const ADVERTISEMENT = await advertisementServices.editAdvertisement(payload.advertisement)
                commit('SET_ADVERTISEMENT', ADVERTISEMENT.data.advertisement)
            }
            else if(payload.heading === 'Create Advertisement'){
                await advertisementServices.createAdvertisement(payload.advertisement)
            }
        },
        async deleteAvertisement( {dispatch } , payload){
            await advertisementServices.deleteAvertisement(payload.id)
            dispatch('getAdvertisements', {nextPage: payload.currentPage})
        }
        
    },
    getters:{
        advertisements: (state) => state.advertisements,
        advertisement: (state) => state.advertisement,
        currentPage: (state) => state.currentPage,
        lastPage: (state) => state.lastPage,
        links: (state) => state.links,
        filterAdvertisements: (state) => state.filterAdvertisements,
        showUsersAdverts: (state) => state.showUsersAdverts
    }
}
export default advertisementModule;