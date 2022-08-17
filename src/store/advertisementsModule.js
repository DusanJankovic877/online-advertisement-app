import advertisementServices from '../services/advertisementServices'
// import { upsert } from '@/helpers'
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
            userId: ''
        },
        showUsersAdverts: false
    },
    mutations:{
        /**
         * Set avdertisements in state object
         * @param {Object} state 
         * @param {Object} advertisements 
         */
        SET_ADVERTISEMENTS(state, advertisements){
            state.advertisements = advertisements.data.data
        },
        /**
         * Set current page at stete object
         * @param {Object} state 
         * @param {Object} currentPage 
         */
        SET_CURRENT_PAGE(state, currentPage){
            state.currentPage = currentPage
        },
        /**
         * Set last page in state object
         * @param {Object} state 
         * @param {Object} lastPage 
         */
        SET_LAST_PAGE(state, lastPage){
            state.lastPage = lastPage
        },
        /**
         * Remove first and last item in array
         * Set links in state object
         * @param {Object} state 
         * @param {Array} links 
         */
        SET_LINKS(state, links){
            //remove first item in array
            links.shift()
            //remove last item in array
            links.pop()
            //set links in state object
            state.links = links
        },
        /**
         * Empty advertisements in state object
         * @param {Object} state 
         */
        DELETE_ADVERTISEMENTS(state){
            state.advertisements = {}
        },
        /**
         * Set avdertisement in state object
         * @param {Object} state 
         * @param {Object} advertisement 
         */
        SET_ADVERTISEMENT(state, advertisement){
            state.advertisement = advertisement
        },
        /**
         * Set fileter advertisements parameters
         * Resource is name of parameter
         * Item is value for parameter
         * @param {Object} state 
         * @param {String} resource 
         * @param {String} item 
         */
        SET_ITEM(state, {resource, item}){
            state.filterAdvertisements[resource] = item
        },
        /**
         * Set show users advertisements
         * @param {Object} state 
         * @param {Boolean} payload 
         */
        SET_SHOW_USERS_ADVRTS(state, payload){
            state.showUsersAdverts = payload
        }
    },
    actions:{
        /**
         * Get params for fiter
         * Assign filter params to filterAdvertisements object 
         * Get advertisements based on what parameters for fileter I got
         * Set parameters for pagination
         * @param {Object} state 
         * @param {Method} commit 
         * @param {Object} payload 
         */
        async filterAdverts({state, commit }, payload){
            //set next page
            if(payload.page)commit('SET_ITEM', { resource: 'page', item: payload.page }) 
            //set category
            if(payload.category )if(payload.category !== 'None') commit('SET_ITEM', { resource: 'category', item: payload.category })
            // empty category
            else if(payload.category === 'None'){commit('SET_ITEM', { resource: 'category', item: '' })}
            //set title
            if(payload.title || payload.title === null)commit('SET_ITEM', { resource: 'title', item: payload.title })
            //set price order
            if(payload.priceOrder)commit('SET_ITEM', { resource: 'priceOrder', item: payload.priceOrder })
            //set userId and showUsersAdverts
            if(payload.showUsersAdvertisements){
                commit('SET_SHOW_USERS_ADVRTS', payload.showUsersAdvertisements)
                commit('SET_ITEM', { resource: 'userId', item: payload.userId })
            //empty userId and showUsersAdverts
            }else if(payload.showUsersAdvertisements === false){
                commit('SET_SHOW_USERS_ADVRTS', payload.showUsersAdvertisements)
                commit('SET_ITEM', { resource: 'userId', item: '' })
            }
            //get filtered adverts
            const FILTERED_ADVERTISEMENTS = await advertisementServices.filterAvertisements(state.filterAdvertisements)
            //set parameters for pagination
            commit('SET_ADVERTISEMENTS', FILTERED_ADVERTISEMENTS);
            commit('SET_CURRENT_PAGE', FILTERED_ADVERTISEMENTS.data.current_page)
            commit('SET_LAST_PAGE', FILTERED_ADVERTISEMENTS.data.last_page)
            commit('SET_LINKS', FILTERED_ADVERTISEMENTS.data.links)
        },
        /**
         * Get avertisements
         * Set params for pagination
         * @param {Method} commit 
         * @param {Object} payload 
         */
        async getAdvertisements( {commit} , payload){
            //get avdertisement
            const ADVERTISEMENTS =  await advertisementServices.getAdvertisements({nextPage: payload.nextPage});
            //set params for pagination
            commit('SET_ADVERTISEMENTS', ADVERTISEMENTS);
            commit('SET_CURRENT_PAGE', ADVERTISEMENTS.data.current_page)
            commit('SET_LAST_PAGE', ADVERTISEMENTS.data.last_page)
            commit('SET_LINKS', ADVERTISEMENTS.data.links)
        },
        /**
         * Get advertisement
         * Set advertisement
         * @param {Method} commit 
         * @param {Object} payload 
         */
        async getAdvertisement( { commit } , payload){
            //Get advertisement
            const ADVERTISEMENT = await advertisementServices.getAdvertisement(payload) 
            //Set advertisement
            commit('SET_ADVERTISEMENT', ADVERTISEMENT.data)
            
        },
        /**
         * Determine if it is edit or create advertisement
         * Send updated advertisement and get edited advertisement
         * If not edited create advertisement
         * @param {Method} commit 
         * @param {Object} payload 
         */
        async getCreateEditAdvertisement( {commit} , payload){
            //check for option
            if(payload.heading === 'Edit Advertisement'){
                //get edited
                const ADVERTISEMENT = await advertisementServices.editAdvertisement(payload.advertisement)
                //set edited
                commit('SET_ADVERTISEMENT', ADVERTISEMENT.data.advertisement)
            }
            //check for option
            else if(payload.heading === 'Create Advertisement'){
                //create advertisement 
                await advertisementServices.createAdvertisement(payload.advertisement)
            }
        },
        /**
         * Send id of advertisement to delete it
         * Set current page to go back on last "visited" page
         * @param {Method} dispatch 
         * @param {Object} payload 
         */
        async deleteAvertisement( { dispatch } , payload){
            //send id for delete
            await advertisementServices.deleteAvertisement(payload.id)
            //Set current page in store
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