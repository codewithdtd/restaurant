import createApiClient from "./api.service";
class MenuService {
    constructor(baseUrl = "/api/menu") {
    this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
    async getByCategory(id) {
        return (await this.api.get(`category/${id}`)).data;
    }
    async getAllCategory() {
        return (await this.api.get("/category")).data;
    }
    async getOne(id) {
        return (await this.api.get("/"+id)).data;
    }

}
export default new MenuService();