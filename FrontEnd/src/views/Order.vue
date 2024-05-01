<template>
    <div class="order">
        <h3>Đơn hàng của bạn</h3>
        <div class="order__list order__list__title row col-sm-11">
            <div class="order__list__item col-sm-4"></div>
            <div class="order__list__item col-sm-2">Tổng tiền</div>
            <div class="order__list__item col-sm-2">Ngày đặt hàng</div>
            <div class="order__list__item col-sm-2">Ngày nhận hàng</div>
            <div class="order__list__item col-sm-2">Trạng thái</div>
        </div>
        <p v-if="order.length < 1">Chưa có đơn hàng</p>
        <div v-for="(item, index) in order" class="order__list row col-sm-11" :key="item.id">
            <div class="order__list__item order__list__item--sach col-sm-4">
                <div class="order__list__item__sach d-flex" v-for="item_item in item.detail">
                    <img :src="'http://localhost:3000/static/'+item_item.product.image" alt="">
                    <div>
                        <p>{{ item_item.product.name }}</p>
                        <p>x{{ item_item.quanlity }} {{ item_item.price }} VNĐ</p>
                        <!-- <p>{{ item_item.sach.ten }}</p> -->
                    </div>
                </div>
            </div>
            <div class="order__list__item col-sm-2">{{ item.totalPrice }} VNĐ</div>
            <div class="order__list__item col-sm-2">{{ item.orderDay }}</div>
            <div class="order__list__item col-sm-2">{{ item.deliveryDate }}</div>
            <div v-if="item.status == 'Giao hàng thành công'" class="order__list__item col-sm-2 text-success">
                {{ item.status }}
            </div>
            <div v-else-if="item.status == 'Đã hủy'" class="order__list__item col-sm-2 text-danger">
                {{ item.status }}
            </div>
            <div v-else class="order__list__item col-sm-2 text-primary">
                {{ item.status }}
            </div>
        </div>
    </div>
</template>

<script>
import userService from '@/services/user.service';
export default {
    updated() {
        this.getOrder();
    },
    mounted() {
        this.getOrder();
    },
    methods: {
        async getOrder() {
            this.order = await userService.getAllOrder();
        }
    },
    data() {
        return {
            order: [],
        }
    }
}
</script>

<style>
.order {
    height: 80vh;
    min-height: fit-content;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #ffffff;
}

.order h3 {
    margin-top: 20px;
    text-align: center;
    color: var(--color-main);
    height: min-content;
}
.order__list {
    align-items: center;
    border: 2px solid rgba(0, 0, 0, 0.77) ;
    border-top: none ;
    margin: 0 auto;
    padding: 10px 0;
    background-color: #cacaca;
}


.order__list__item__sach img{
    width: 70px;
}

.order__list__item--sach {
    text-align: start;
}

.order__list__item--sach p {
    margin: 0;
}

.order__list__title {
    background-color: var(--color-main);
    font-weight: 600;
}

</style>