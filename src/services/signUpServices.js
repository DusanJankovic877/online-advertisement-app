import { RequestHandler } from "./RequestHandler";
class SignUpServices extends RequestHandler{
    async signUp(payload){
       const REQUEST = await this.apiClient.post('/signup', payload)
       console.log(REQUEST);
    }
}
const signUpServices = new SignUpServices();
export default signUpServices;