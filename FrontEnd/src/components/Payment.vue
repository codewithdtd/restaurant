<template>
    <div class="payment col-md-3">
        <!-- <Notification :message="message" /> -->
        <p class="payment__title">Thông tin thanh toán</p>
        <form class="payment__form" @submit.prevent="handlePayment">
            <div class="payment__item">
                <label for="">Tên:</label>
                <input required type="text" v-model="name">
            </div>
            <div class="payment__item">
                    <label for="">Địa chỉ:</label>
                    <input required type="text" v-model="address">
            </div>
            <div class="payment__item">
                    <label for="">Số điện thoại:</label>
                    <input required type="text" v-model="phone">
            </div>
            <div class="payment__item">
                    <label for="">Ghi chú:</label>
                    <textarea v-model="note" rows="3"></textarea>
            </div>
            <div class="payment__item">
                <p>Tổng tiền: 
                    <span>
                        {{ total.toLocaleString() }} VNĐ
                    </span>
                </p>
            </div>
            <div class="payment__item">
                    <label for="">Hình thức thanh toán:</label>
                    <input required type="radio" name="method" value="cod" v-model="method_payment"> COD
                    <input required type="radio" name="method" value="card" v-model="method_payment"> Card
            </div>
            <div class="payment__item">
                <button>ĐẶT HÀNG</button>
            </div>
        </form>
    </div>
</template>
<script>
import { useUserStore } from '@/stores/userStore';
import userService from '@/services/user.service';
// import Notification from '../components/Notification.vue'
export default {
    emits: ['showNotify',],
    // components: {
    //     Notification
    // },
    props: {
        total: Number,
    },
    methods: {
        async handlePayment() {
            console.log('submit');
            const data = {
                // user: this.userStore.user._id,
                detail: this.userStore.cart,
                name: this.name,
                phone: this.phone,
                address: this.address,
                note: this.note,
                method_payment: this.method_payment, 
                totalPrice: this.total,
            };
            if(data.detail.length > 0)
                try {
                    await userService.addOrder(data);
                    this.message = 'Thành công'
                    this.$emit('showNotify',this.message)
                } catch (error) {
                    console.log(error);
                }
            else {
                this.message = 'Thất bại'
                this.$emit('showNotify',this.message)
            }
        }
    },
    data() {
        return {
            userStore: useUserStore(),
            name: useUserStore().user.name,
            address: useUserStore().user.address,
            phone: useUserStore().user.phone,
            method_payment: '',
            note: '',
            message: ''
        }
    }
}
</script>
<style>
.payment {
    background-color: rgba(100, 97, 90, 0.774);
    border: 2px solid #c8c8c8b9;
    height: fit-content;
}

.payment__title {
    text-transform: uppercase;
    font-weight: 600;
    font-size: 1.3rem;
    margin: 0 5px;
    border-bottom: 2px solid #ffffff;
    margin-bottom: 10px;
}

.payment__form {
    margin: 5px 10px;
}


.payment__item {
    display: flex;
    justify-content: space-between;
}

.payment__item input {
    max-width: 100%;
}

.payment__item button{
    width: 100%;
    background-color: var(--color-main);
    border: none;
    padding: 10px;
    border-radius: 30px;
    color: #fff;
    font-weight: 400;
}
</style>