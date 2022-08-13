import userServices from '../services/userServices'
import advertisementServices from '../services/advertisementServices';
const usersModule = {
    namespaced: true,
    state:{},
    mutations:{},
    actions:{
        async getUsersAdvertisements({ commit },payload){
            if(payload.showUsersAdvertisements){
                const ADVERTISEMENTS =  await userServices.getUsersAdvertisements(payload)
                commit('advertisementsModule/SET_ADVERTISEMENTS', ADVERTISEMENTS, {root:true});
                commit('advertisementsModule/SET_CURRENT_PAGE', ADVERTISEMENTS.data.current_page, {root:true})
                commit('advertisementsModule/SET_LAST_PAGE', ADVERTISEMENTS.data.last_page, {root:true})
                commit('advertisementsModule/SET_LINKS', ADVERTISEMENTS.data.links, {root:true})  
            }else{
                const ADVERTISEMENTS = await advertisementServices.getAdvertisements({nextPage: payload.nextPage})
                commit('advertisementsModule/SET_ADVERTISEMENTS', ADVERTISEMENTS, {root:true});
                commit('advertisementsModule/SET_CURRENT_PAGE', ADVERTISEMENTS.data.current_page, {root:true})
                commit('advertisementsModule/SET_LAST_PAGE', ADVERTISEMENTS.data.last_page, {root:true})
                commit('advertisementsModule/SET_LINKS', ADVERTISEMENTS.data.links, {root:true})  
            }
        },
        // deleteUsersAdvertisements({commit}, payload){
        //     console.log('delete');

        // }
    },
    getters:{}


}
export default usersModule