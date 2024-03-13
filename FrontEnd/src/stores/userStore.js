import { defineStore } from "pinia";

export const useUserStore = defineStore('userStore', {
    state:() => ({
        user: null,
        login: false,
    }),
    getters: {

    },
    actions: {
        setUser(data) {
            this.user = data 
            this.login = true
            // console.log(this.user)
        },
        logout() {
            this.user = null;
            this.login = false;
            // Xóa dữ liệu trong session storage ở đây
        }
    },
    persist: {
        enabled: true,
    }
})