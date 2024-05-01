import createApiClient from "./api.service";

class UserService {
    constructor(baseUrl = "/api/admin") {
    this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
    async updateUser(data) {
        return (await this.api.put("/"+data._id, data)).data;
    }
    async login(data) {
        return (await this.api.post("/login", data)).data;
    }
    async logout() {
        const user = (await this.api.post("/logout")).data; 
        return user;
    }
    // order
    async getAllOrder() {
        return (await this.api.get("/order")).data;
    }
    async updateOrder(data) {
        return (await this.api.put("/order",data)).data; 
    }


}
export default new UserService();