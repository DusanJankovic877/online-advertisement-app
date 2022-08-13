import { RequestHandler } from "./RequestHandler";
class UserServices extends RequestHandler {
    async getUsersAdvertisements(payload){
        return await this.apiClient.get(`get-users-advertisements?page=${payload.nextPage}&users-advertisements=${payload.usersAdvertisements}`)
        
    }
}
const userServices = new UserServices();
export default userServices;