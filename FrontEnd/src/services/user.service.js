import createApiClient from "./api.service";
class UserService {
    constructor(baseUrl = "/api/user") {
    this.api = createApiClient(baseUrl);
    }
    async get(id) {
        console.log(id)
        return (await this.api.get("/"+id)).data;
    }
    async getCart() {
        return (await this.api.get("/cart")).data;
    }
    async register(data) {
        return (await this.api.post("/register", data)).data;
    }
    async login(data) {
        const user = (await this.api.post("/login", data)).data; 
        localStorage.setItem('token', user.accessToken)
        return user;
    }
}
export default new UserService();