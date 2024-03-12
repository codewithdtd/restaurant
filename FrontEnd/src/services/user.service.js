import createApiClient from "./api.service";
class UserService {
    constructor(baseUrl = "/api/user") {
    this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
    async register(data) {
        return (await this.api.post("/register", data)).data;
    }

}
export default new UserService();