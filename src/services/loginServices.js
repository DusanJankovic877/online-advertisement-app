import { RequestHandler } from "./RequestHandler";
class LoginServices extends RequestHandler{
    async login(payload){
       const RESPONSE = await this.apiClient.post('/login', payload)
       console.log(RESPONSE);
    }
}
const loginServices = new LoginServices();
export default loginServices;