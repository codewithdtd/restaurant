import { createWebHistory, createRouter } from "vue-router";
import Register from "@/views/Register.vue";
import Home from "@/views/Home.vue";
import Menu from "@/views/Menu.vue";
import Order from "@/views/Order.vue";
import Cart from "@/views/Cart.vue";
import Login from "@/views/Login.vue";
import Payment from "@/views/Payment.vue";
import About from "@/views/About.vue";
import Contact from "@/views/Contact.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
    },
    {
        path: "/cart",
        name: "Cart",
        component: Cart,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/menu",
        name: "Menu",
        component: Menu,
    },
    {
        path: "/order",
        name: "Order",
        component: Order,
    },
    {
        path: "/payment",
        name: "Payment",
        component: Payment,
    },
    {
        path: "/about",
        name: "About",
        component: About,
    },
    {
        path: "/contact",
        name: "Contact",
        component: Contact,
    },
]
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;