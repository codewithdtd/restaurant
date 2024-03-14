<template>
    <div class="cart">
        <h1 class="cart__title">Giỏ hàng</h1>
        <div class="cart__body" v-if="userStore.cart.length > 0">
            <div v-for="item in userStore.cart" :key="item._id" class="cart__body__item row col-sm-11">
                <div class="cart__body__item__image col-sm-2">
                    <img :src=item.product.image alt="">
                </div>
                <div class="cart__body__item__name col-sm-3">
                    <p>{{ item.product.name }}</p>
                    <!-- <p>Loại: {{ item.product.category }}</p> -->
                </div>
                <div class="cart__body__item__quanlity col-sm-2">
                    <!-- <button @click="item.quanlity > 1 ? item.quanlity-- : item.quanlity">-</button> -->
                    <!-- <p class="">{{ item.quanlity }}</p> -->
                    <input type="number" min="1" @focusout="update(item)" v-model="item.quanlity">
                    <!-- <button @click="item.quanlity++">+</button> -->
                    <p v-if="message">{{ message }}</p>
                </div>
                <div class="cart__body__item__price col-sm-3 text-center">{{ item.price.toLocaleString() }}</div>
                <div class="cart__body__item__action col-sm-2">
                    <!-- <button class="btn btn-outline-warning" @click="update(item)">Cập nhật</button> -->
                    <i class="fa-solid fa-x btn btn-danger" @click="deleteCart(item)"></i>
                </div>
            </div>
            <div class="cart__body__payment col-sm-11">
                <p>Tổng tiền: {{ total.toLocaleString() }}</p>
                <router-link to="/" class="btn btn-warning">Thanh toán</router-link>
            </div>
        </div>
        <div v-else class="cart__body__item row col-sm-11">Chưa có sản phẩm nào trong giỏ hàng</div>
    </div>
</template>

<script>
import { useUserStore } from '@/stores/userStore';
import userService from '@/services/user.service';

export default {
    created() {
        this.getCart();
    },
    methods: {
        async getCart() {
            if(this.userStore.login) {
                this.userStore.cart = await userService.getCart()
                this.cart =  this.userStore.cart.map(item => item.price)
                this.total = this.cart.reduce((acc, price) => {
                    return acc+price;
                },0);
            }
        },
        async update(payload) {
            const updated = await userService.updateCart(payload)
            if(!updated.message)
                this.getCart()
            else 
                this.message = updated.message
        },
        async deleteCart(data) {
            const deleted = await userService.deleteCart(data._id)
            if(deleted)
                this.getCart()
            else 
                this.message = "Không thể xóa"
        }
    },
    data() {
        return {
            total: 0,
            message: '',
            cart: [],
            userStore: useUserStore(),
        }
    }
}
</script>

<style>
.cart {
    height: fit-content;
    min-height: 100vh;
    /* height: 100vh; */
    color: #fff;
}
.cart__title {
    font-family: "Dancing Script", cursive;
    text-align: center;
    color: var(--color-main);
    /* font-size: 2.5rem; */
    margin: 10px;
}

.cart .cart__body__item {
    height: 25vh;
    background-color: rgba(36, 35, 32, 0.878);
    align-items: center;
    /* box-shadow: rgba(255, 255, 255, 0.426) 1.95px 1.95px 2.6px; */
    border-bottom: 3px solid #ffffff92 ;
    border-right: 3px solid #ffffff92 ;
    border-top: 1px solid #6d6d6d92 ;
    border-left: 1px solid #6d6d6d92 ;
    margin: auto;
    border-radius: 5px;
    margin-bottom: 10px;
}
.cart .cart__body__item__image {
    height: 90%;
    overflow: hidden;
    margin: auto;
    display: flex;
}

.cart .cart__body__item__image img {
    width: 100%;
    align-self: center;
}

.cart__body__item__quanlity {
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.cart__body__item__quanlity p {
    margin: 0;
}

.cart__body__item__quanlity input {
    max-width: 40px;
}

.cart__body__item__quanlity button {
    border: none;
    border-radius: 4px;
}

.cart__body__item__action {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.cart__body__payment {
    text-align: end;
    font-weight: 700;
}
</style>