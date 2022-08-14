import { RequestHandler } from "./RequestHandler";

class AdvertisementServices extends RequestHandler {
    async getAdvertisements(payload){
        return await this.apiClient.get(`get-advertisements?page=${payload.nextPage}`)
    }
    async getAdvertisementsByCategory(payload){
        return await this.apiClient.get(`get-advertisements-by-category?page=${payload.nextPage}&category=${payload.category}`)
    }
    async getAdvertisementsByTitle(payload){
        return await this.apiClient.get(`get-advertisements-by-title?page=${payload.nextPage}&title=${payload.searchByTitle}&category=${payload.category}`)
    }
    async getAdvertisementsByPrice(payload){    
        return await this.apiClient.get(`get-advertisements-by-price?page=${payload.nextPage}&price=${payload.price}&category=${payload.price}`)
    }
    async getAdvertisement(id){
        return await this.apiClient.post('get-advertisement', {id: id})
    }
    async editAdvertisement(advertisement){
        return await this.apiClient.post('edit-advertisement', advertisement)
    }
    async createAdvertisement(advertisement){
        return await this.apiClient.post('create-advertisement', advertisement)
    }
}
const advertisementServices = new AdvertisementServices();
export default advertisementServices;