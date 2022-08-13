import { RequestHandler } from "./RequestHandler";

class AdvertisementServices extends RequestHandler {
    async getAdvertisements(pageNumber){
        return await this.apiClient.get(`get-advertisements?page=${pageNumber}`)
    }
}
const advertisementServices = new AdvertisementServices();
export default advertisementServices;