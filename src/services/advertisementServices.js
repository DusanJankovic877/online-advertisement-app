import { RequestHandler } from "./RequestHandler";

class AdvertisementServices extends RequestHandler {
    /**
     * 
     * @param {Object} payload 
     * @returns Object with advertisements and params for pagination
     */
    async getAdvertisements(payload){
        return await this.apiClient.get(`get-advertisements?page=${payload.nextPage}`)
    }
    /**
     * 
     * @param {Object} payload 
     * @returns  Object with filtered advertisements and params for pagination
     */
    async filterAvertisements(payload){
       return await this.apiClient.get(`filter-adverts?page=${payload.page}&category=${payload.category}&title=${payload.title}&priceOrder=${payload.priceOrder}&userId=${payload.userId}`)
    }
    /**
     * 
     * @param {Number} id 
     * @returns Object with advertisement
     */
    async getAdvertisement(id){
        return await this.apiClient.post('get-advertisement', {id: id})
    }
    /**
     * 
     * @param {Object} advertisement 
     * @returns Object with edited advertisement
     */
    async editAdvertisement(advertisement){
        console.log(advertisement);
        return await this.apiClient.put('edit-advertisement', advertisement)
    }
    /**
     * Sending data for new advertisement to be created
     * @param {Object} advertisement 
     */
    async createAdvertisement(advertisement){
        await this.apiClient.post('create-advertisement', advertisement)
    }
    /**
     * Sending id for n advertisement to be deleted
     * @param {Number} id 
     */
    async deleteAvertisement(id){
        await this.apiClient.delete(`delete-advertisement/${id}`)
    }

}
const advertisementServices = new AdvertisementServices();
export default advertisementServices;