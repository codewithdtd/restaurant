<template>
    <div class="order">
        <div class="order__form" :class="{'order__form--active': order_form }">
            <form action="" @submit.prevent="handleSubmit">
                <p class="btn btn-outline-danger close" @click="handleorder">&times</p>
                <h3>Đơn hàng</h3>
                <div class="order__form__item">
                    <p>Tên:</p>
                    <input v-if="!order._id" required type="text" v-model="order.name">
                    <span v-else>{{ order.name }}</span>
                </div>
                <div class="order__form__item">
                    <p>Địa chỉ:</p>
                    <input v-if="!order._id" required type="text" v-model="order.address">
                    <span v-else>{{ order.address }}</span>
                </div>
                <div class="order__form__item">
                    <p>Số điện thoại:</p>
                    <input v-if="!order._id" required type="text" v-model="order.phone">
                    <span v-else>{{ order.phone }}</span>
                </div>
                <div class="order__form__item">
                    <p>Tổng tiền:</p>
                    <input v-if="!order._id" required type="text" v-model="order.phone">
                    <span v-else>{{ formatThousandSeparator(order.totalPrice) }}</span>
                </div>
                <div v-if="order._id" class="order__form__item">
                    <p>Ngày đặt hàng:</p>
                    <span>{{ order.orderDay }}</span>
                </div>
                <div class="order__form__item">
                    <p>Trạng thái:</p>
                    <select v-if="order.status != 'Giao hàng thành công'" name="" id="" v-model="order.status">
                        <option :value="order.status" selected>{{ order.status }}</option>
                        <option value="Đang chuẩn bị hàng">Đang chuẩn bị hàng</option>
                        <option value="Đang giao hàng">Đang giao hàng</option>
                        <option value="Giao hàng thành công">Giao hàng thành công</option>
                        <option value="Đã hủy">Đã hủy</option>
                    </select>
                    <input v-else type="text" :value="order.status" readonly>
                </div>
                <div class="order__form__item">
                    <p>Ghi chú:</p>
                    <textarea v-if="!order._id" name="" id="" cols="30" rows="3">{{ order.note }}</textarea>
                    <span v-else>{{ order.note }}</span>
                </div>
                <div class="order__form__item__table">
                    <div class="order__form__item__product">
                        <div class="col-sm-3">Hình ảnh</div>
                        <div class="col-sm-3">Tên</div>
                        <div class="col-sm-3">Số lượng</div>
                        <div class="col-sm-3">Giá</div>
                    </div>
                    <div v-for="product in order.detail" class="order__form__item__product">
                        <div class="col-sm-3"><Image :src="product.product.image"></Image></div>
                        <div class="col-sm-3">{{ product.product.name }}</div>
                        <div class="col-sm-3">{{ product.quanlity }}</div>
                        <div class="col-sm-3">{{ formatThousandSeparator(product.price) }}</div>
                    </div>
                </div>
                <button v-if="!order._id">Thêm</button>
                <button v-else>Cập nhật</button>
            </form>
        </div>
        <TableOrder ref="tableorder" :nameTable="this.$route.name" @add="handleorder" @edit="handleEditorder"></TableOrder>
    </div>
</template>
<script>
import TableOrder from '@/components/TableOrder.vue'
import userService from '@/services/user.service.js'
import Image from '@/components/Image.vue';
export default {
    components: {
        TableOrder, Image
    },
    methods: {
        async handleorder() {
            this.order = {};
            this.order_form = !this.order_form;
            await this.$refs.tableorder.getAllOrder();
        },
        handleEditorder(order) {
            this.order = order;
            console.log(this.order);
            this.order_form = !this.order_form;
        },
        handleImage(img) {
            this.image = img;
            this.imagePreview = URL.createObjectURL(img);
        },
        async handleSubmit() {              
            if(this.order._id == null) { 
                if(await userService.addorder(this.order)) {
                    this.order = data;
                    this.order_form = !this.order_form;
                }
            }
            if(this.order._id != null) {
                if(this.order.status == 'Giao hàng thành công')
                    this.order.deliveryDate = new Date().getDate()+'/'+ (new Date().getMonth()+1)+'/'+new Date().getFullYear() + ' ' + new Date().getHours() +':' + new Date().getMinutes() + ':' + new Date().getSeconds();
                if(await userService.updateOrder(this.order)) {
                    this.order_form = !this.order_form;
                }
            }

            await this.$refs.tableorder.getAllOrder();

        },
        formatThousandSeparator(number) {
            let numberString = String(number);
            let result = '';
            for (let i = numberString.length - 1, j = 0; i >= 0; i--, j++) {
                result = (j > 0 && j % 3 === 0) ? '.' + result : result;
                // Thêm ký tự từ chuỗi số vào kết quả
                result = numberString[i] + result;
            }
            return result;
        }
    },
    mounted() {
    },
    data() {
        return {
            order_form: false,
            order: {},
            filter: '',
            categories: [],
        }
    }

}


</script>
<style>
.order__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.order__header input {
    font-size: 0.9rem;
    padding: 5px 7px;
    border-radius: 7px;
    border: none;
    width: 10rem;
}

.order__header__action {
    display: flex;
    align-items: center;
}

.order__header__search {
    background-color: rgb(255, 255, 255);
    padding: 0 4px;
    border-radius: 7px;
}

.order__header__search input:focus, .order__header__filter select:focus {
    border: none;
    outline: none;
}

.order__header__action button {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    border: none;
    font-weight: 400;
    font-size: 20px;
    background-color: rgb(196, 255, 199);
}
.order__header__action button:hover {
    background-color: #fff;
}

.order__header__filter {
    background-color: #fffefe;
    border-radius: 7px;
    overflow: hidden;
    padding: 1px 0 2px 10px;
    margin-right: 5px;
}

.order__header__filter select{
    font-size: 0.9rem;
    padding: 5px 3px;
    border: none;
    /* width: 10rem; */
}

.order__form {
    background-color: rgba(0, 0, 0, 0.397);
    /* backdrop-filter: blur(1px); */
    width: 100%;
    position: fixed;
    z-index: 1;
    height: 100%;
    top: -200%;
    left: 0;
    display: flex;
    transition: .5s ease;
    /* display: none; */
}

.order__form.order__form--active {
    top: 0;
}

.order__form form {
    position: relative;
    background-color: #2e2e2e;
    /* backdrop-filter: blur(10px); */
    margin: auto;
    height: fit-content;
    text-align: center;
    border-radius: 10px;
    color: #efefef;
    padding: 20px 0;
    /* border: 2px solid; */
    box-shadow: 1px 5px 10px rgba(255, 255, 255, 0.267);
    
}

.order__form form h3 {
    padding: 15px;
    color: #3dd651;
    font-weight: 600;
    font-size: 2rem;
}

.order__form__item {
    display: flex;
    /* justify-content: space-between; */
    padding: 0px 15px;
    text-align: start;
}
.order__form__item p {
    width: 150px;
}

.order__form__item input, 
.order__form__item select,
.order__form__item textarea {
    flex-grow: 1;
    border-radius: 10px;
    border: none;
    margin: 5px 0;
}


.order__form form button {
    width: 150px;
    height: 40px;
    border-radius: 12px;
    background-color: #32a041;
    border: none;
    font-weight: 600;
    color: rgb(255, 255, 255);
}
.order__form form .close {
    position: absolute;
    right: 10px;
    top: 10px;
}

.order__form__item img {
    height: 100px;
    width: 100px;
    object-fit: cover;
    border-radius: 10px
}

.order__form__item__table {
    display: flex;
    flex-direction: column;
}

.order__form__item__product {
    display: flex;
    justify-content: space-between;
    width: 100%;
    text-align: center;
}

.order__form__item__product div {
    border: 1px solid;
}

</style>

  