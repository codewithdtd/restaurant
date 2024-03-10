import { createWebHistory, createRouter } from "vue-router";
import Register from "@/views/Register.vue";
// import Home from "@/views/Home.vue";
// import Menu from "@/views/Menu.vue";
// import Order from "@/views/Orders.vue";
// import Cart from "@/views/Cart.vue";
// import Login from "@/views/Login.vue";
// import Payment from "@/views/Payment.vue";

const routes = [
    {
        path: "/",
        name: "register",
        component: Register,
    },
    {
        path: "/",
        name: "register",
        component: Register,
    },
    {
        path: "/",
        name: "register",
        component: Register,
    },
    {
        path: "/",
        name: "register",
        component: Register,
    },
    {
        path: "/",
        name: "register",
        component: Register,
    },
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;