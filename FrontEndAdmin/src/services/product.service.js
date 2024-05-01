import createApiClient from "./api.service";

class ProductService {
    constructor(baseUrl = "/api/menu") {
    this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
    async getAllCategory() {
        return (await this.api.get("/category")).data;
    }
    async addProduct(data) {
        return (await this.api.post(`/`, data)).data;
    }
    async updateProduct(data) {
        return (await this.api.put(`/${data['id']}`, data)).data;
    }
    async deleteProduct(data) {
        return (await this.api.delete(`/${data._id}`)).data;
    }
    async addCategory(data) {
        return (await this.api.post("/category",data)).data;
    }
    async updateCategory(data) {
        return (await this.api.put("/category/"+data._id,data)).data;
    }
    async deleteCategory(data) {
        return (await this.api.delete("/category/"+data._id,data)).data;
    }
}
export default new ProductService();