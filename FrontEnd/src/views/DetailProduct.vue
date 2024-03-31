<template>
    <div class="detail">
        <Notification :message="message" />
       <div v-if="item" class="col-sm-11 row">
        <div class="detail__image col-sm-6">
            <img :src="item.image" alt="">
        </div>
        <div class="detail__info col-sm-6">
            <h3 class="detail__name">{{ item.name }}</h3>
            <p>{{ item.description }}</p>
            <p>Giá: {{ item.price.toLocaleString() }}</p>
            <p>Số lượng còn lại: {{ item.quanlity }}</p>
            <input type="number" min="1" v-model="quanlity">
            <button class="btn btn-warning" @click="addToCart(this.item)">Thêm vào giỏ hàng</button>
        </div>
       </div>
       <p v-else>Không có sản phẩm</p>
    </div>
</template>
<script>
import menuService from '@/services/menu.service';
import userService from '@/services/user.service';
import Notification from '@/components/Notification.vue';
export default {
    // mounted() {
    //     this.getItem();
    // },
    components: {
        Notification
    },
    watch: {
        '$route.params.id': {
            immediate: true, // Gọi ngay lập tức khi component được mounted
            handler(newId, oldId) {
                this.getItem(); // Gọi phương thức getItem() khi params id thay đổi
            }
        }
    },
    methods: {
        async getItem() {
            this.item = await menuService.getOne(this.$route.params.id);
        },
         async addToCart(data) {
            const { _id, price, name, image } = data;
            const quanlity = {quanlity: this.quanlity};
            const filterData = { _id, price, name, image, ...quanlity }

            const success = await userService.addCart(filterData)
            if(!success.message){
                this.message = "Thành công"
            }
            else this.message = "Thất bại"
        },
        hideNotify() {
            this.message = ''
        }
    },
    data() {
        return {
            item: '',
            quanlity: 1,
            message: ''
        }
    }
}
</script>

<style>
.detail {
    min-height: 100vh;
    height: fit-content;
    justify-content: center;
    display: flex;
    padding-top: 50px;
    color: #fff;
    /* background-color: #00000083; */
    background: #000000d7;    
    background-size: cover;
    background-repeat: no-repeat;
}

.detail__image img {
    max-width: 80%;
    max-height: 70%;
}

.detail__info input{
    max-width: 50px;
}

</style>