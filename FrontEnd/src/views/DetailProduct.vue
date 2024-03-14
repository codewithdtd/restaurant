<template>
    <div class="detail">
        <div class="notification" @click="hideNotify" v-if="message"> 
            <div class="notification__message"><i class="fa-solid fa-circle-check"></i>
                <p>{{ message }}</p>
            </div>
        </div>


       <div v-if="item" class="col-sm-11 row">
        <div class="detail__image col-sm-6">
            <img :src="item.image" alt="">
        </div>
        <div class="detail__info col-sm-6">
            <h3 class="detail__name">{{ item.name }}</h3>
            <p>{{ item.description }}</p>
            <p>Giá: {{ item.price.toLocaleString() }}</p>
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
export default {
    mounted() {
        this.getItem();
    },
    methods: {
        async getItem() {
            if(!this.item)
                this.item = await menuService.getOne(this.$route.params.id);
        },
         async addToCart(data) {
            const { _id, price, name, image } = data;
            const filterData = { _id, price, name, image }
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
    background-color: #00000083;
}

.detail__image img {
    max-width: 80%;
}


</style>