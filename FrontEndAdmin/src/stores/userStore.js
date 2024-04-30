import { defineStore } from "pinia";
import router from "@/router";
import userService from "@/services/user.service";
export const useUserStore = defineStore('userStore', {
    state:() => ({
        user: null,
        login: false,
        product: [],
    }),
    getters: {

    },
    actions: {
        setUser(data) {
            this.user = data 
            this.login = true
        },
        async logout() {
            this.user = null;
            this.login = false;
            this.product = [];
            await userService.logout(); 
            await router.push("/login");
            // Xóa dữ liệu trong session storage ở đây
        }
    },
    persist: {
        enabled: true,
    }
})