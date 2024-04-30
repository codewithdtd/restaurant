import createApiClient from "./api.service";

class UserService {
    constructor(baseUrl = "/api/user") {
    this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
    async getAllOrder() {
        return (await this.api.get("/order")).data;
    }
    async login(data) {
        return (await this.api.post("/login", data)).data;
    }
    async logout() {
        const user = (await this.api.post("/logout")).data; 
        return user;
    }
}
export default new UserService();