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
}
const advertisementServices = new AdvertisementServices();
export default advertisementServices;