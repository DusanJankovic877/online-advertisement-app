import { RequestHandler } from "./RequestHandler";
class AuthServices extends RequestHandler{
    async signUp(payload){
        const REQUEST = await this.apiClient.post('/auth/register', payload)
        return REQUEST
     }
    async login(payload){
       const RESPONSE = await this.apiClient.post('/auth/login', payload)
       return RESPONSE.data;
    }
    async me(){
        const RESPONSE = await this.apiClient.post('/auth/me')
        return RESPONSE.data;

    }
    async logout(){
        const RESPONSE = await this.apiClient.post('/auth/logout');
        return RESPONSE;
    }
}
const authServices = new AuthServices();
export default authServices;