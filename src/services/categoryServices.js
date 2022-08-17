import { RequestHandler } from "./RequestHandler";

class CategoryServices extends RequestHandler {
    async getCategories(){
        return await this.apiClient('get-categories')
    }
}
const categoryServices = new CategoryServices();
export default categoryServices;