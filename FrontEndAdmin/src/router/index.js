import { createWebHistory, createRouter } from "vue-router";
import Login from "@/views/Login.vue";
const routes = [
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    
]
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;