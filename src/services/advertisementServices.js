import { RequestHandler } from "./RequestHandler";

class AdvertisementServices extends RequestHandler {
    async getAdvertisements(payload){
        console.log('services', payload);
        return await this.apiClient.get(`get-advertisements?page=${payload.nextPage}`)
    }
    async filterAvertisements(payload){
        console.log('payload', payload);
       return await this.apiClient.get(`filter-adverts?page=${payload.page}&category=${payload.category}&title=${payload.title}&priceOrder=${payload.priceOrder}&userId=${payload.userId}`)
    }
    async getAdvertisement(id){
        return await this.apiClient.post('get-advertisement', {id: id})
    }
    async editAdvertisement(advertisement){
        return await this.apiClient.put('edit-advertisement', advertisement)
    }
    async createAdvertisement(advertisement){
        await this.apiClient.post('create-advertisement', advertisement)
       
    }
    async deleteAvertisement(id){
        await this.apiClient.delete(`delete-advertisement/${id}`)
    }

}
const advertisementServices = new AdvertisementServices();
export default advertisementServices;