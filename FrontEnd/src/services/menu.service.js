import createApiClient from "./api.service";
class MenuService {
    constructor(baseUrl = "/api/menu") {
    this.api = createApiClient(baseUrl);
    }
    async getAll() {
        console.log(localStorage.getItem('token'))
        return (await this.api.get("/")).data;
    }
    async getByCategory(id) {
        return (await this.api.get(`category/${id}`)).data;
    }
    async getAllCategory() {
        return (await this.api.get("/category")).data;
    }

}
export default new MenuService();