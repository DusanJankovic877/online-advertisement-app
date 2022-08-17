import { RequestHandler } from "./RequestHandler";
class AuthServices extends RequestHandler{
    /**
     * 
     * @param {Object} payload 
     * @returns Registered user
     */
    async signUp(payload){
        return await this.apiClient.post('/auth/register', payload)
        
     }
     /**
      * 
      * @param {Object} payload 
      * @returns Returns token for logged user
      */
    async login(payload){
       const RESPONSE = await this.apiClient.post('/auth/login', payload)
       return RESPONSE.data;
    }
    /**
     * Sending users token to retrive users data
     * @returns Users data 
     */
    async me(){
        const RESPONSE = await this.apiClient.post('/auth/me')
        return RESPONSE.data;

    }
    /**
     * 
     * @returns message for log out
     */
    async logout(){
        const RESPONSE = await this.apiClient.post('/auth/logout');
        return RESPONSE;
    }
}
const authServices = new AuthServices();
export default authServices;