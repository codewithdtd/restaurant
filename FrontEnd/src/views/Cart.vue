<template>
    <Notification :message="message" />
    <h1 class="cart__title" id="cart__title">GIỎ HÀNG</h1>
    <div class="cart row">
        <div class="cart__body col-md-8" v-if="userStore.cart.length > 0">
            <div v-for="item in userStore.cart" :key="item._id" class="cart__body__item row col-sm-11">
                <div class="cart__body__item__image col-sm-2">
                    <img :src="'http://localhost:3000/static/'+item.product.image" alt="">
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
        </div>
        <div v-else class="cart__body__item row col-md-8">Chưa có sản phẩm nào trong giỏ hàng</div>
        <Payment :total="total" @showNotify="showNotify"/>
    </div>
</template>

<script>
import { useUserStore } from '@/stores/userStore';
import userService from '@/services/user.service';
import Payment from '../components/Payment.vue';
import Notification from '../components/Notification.vue'
export default {
    components: {
        Payment, Notification
    },
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
            if(!updated.message){
                this.getCart();
                this.message = ''
            }
            else 
                this.message = updated.message
        },
        async deleteCart(data) {
            const deleted = await userService.deleteCart(data._id)
            if(deleted)
                this.getCart()
            else 
                this.message = "Không thể xóa"
        },
        showNotify(message) {
            this.message = message
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
    background: #484646;
    /* height: 100vh; */
    /* background: url('../assets/bg.jpg'); */
    /* background: rgb(194, 194, 194); */
    /* background-color: rgb(62, 60, 55); */
    background: #000000d7;    

    background-repeat: no-repeat;
    background-size: cover;
    color: #fff;
    /* position: relative; */

}
#cart__title {
    /* font-family: "Dancing Script", cursive; */
    text-align: center;
    color: var(--color-main);
    /* color: #f6f5f5; */
    height: fit-content;
    font-size: 2.5rem;
    padding: 10px;
    /* background: rgb(194, 194, 194); */
    /* background-color: rgb(62, 60, 55); */
    background: #000000d7;    

    margin: 0;
}

.cart .cart__body__item {
    height: 25vh;
    background-color: rgba(100, 97, 90, 0.859);
    align-items: center;
    /* box-shadow: rgba(255, 255, 255, 0.426) 1.95px 1.95px 2.6px; */
    border-bottom: 3px solid #fdfdfd92 ;
    border-right: 3px solid #ffffff92 ;
    border-top: 1px solid #6d6d6d92 ;
    border-left: 1px solid #6d6d6d92 ;
    margin: 0 auto;
    /* border-radius: 5px; */
    /* margin-bottom: 10px; */
}
.cart .cart__body__item__image {
    height: 80%;
    /* width: 100px; */
    overflow: hidden;
    margin: auto;
    display: flex;
}

.cart .cart__body__item__image img {
    width: 100%;
    min-height: 100%;
    align-self: center;
    object-fit: cover;
}

.cart__body__item__quanlity {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
}
.cart__body__item__quanlity p {
    margin: 0;
    color: rgb(255, 95, 95);
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

</style>