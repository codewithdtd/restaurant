<template>
    <div class="detail">
        <Notification :message="message" />
       <div v-if="item" class="col-sm-11 row">
        <div class="detail__image col-sm-6">
            <img :src="'http://localhost:3000/static/'+item.image" alt="">
        </div>
        <div class="detail__info col-sm-6">
            <h3 class="detail__name">{{ item.name }}</h3>
            <p>{{ item.description }}</p>
            <p>Giá: {{ item.price.toLocaleString() }}</p>
            <p>Số lượng còn lại: {{ item.quanlity }}</p>
            <input v-if="item.quanlity <= 0" disabled ="number" min="1" v-model="quanlity">
            <input v-else type="number" min="1" v-model="quanlity">
            <button v-if="item.quanlity <= 0" disabled class="btn btn-warning" @click="addToCart(this.item)">Hết hàng</button>
            <button v-else class="btn btn-warning" @click="addToCart(this.item)">Thêm vào giỏ hàng</button>
        </div>
       </div>
       <p v-else>Không có sản phẩm</p>
    </div>
</template>
<script>
import menuService from '@/services/menu.service';
import userService from '@/services/user.service';
import Notification from '@/components/Notification.vue';
import { useUserStore } from '@/stores/userStore';
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
            if (!useUserStore().login) {
              // Hiển thị thông báo yêu cầu đăng nhập
              const confirmed = confirm('Bạn cần đăng nhập để mua hàng. Bạn có muốn đăng nhập ngay không?');
              if (confirmed) {
                // Chuyển hướng đến trang đăng nhập
                this.$router.push('/login'); // Thay đổi '/login' thành địa chỉ của trang đăng nhập của bạn
                }
            } else {
                const { _id, price, name, image } = data;
                const quanlity = {quanlity: this.quanlity};
                const filterData = { _id, price, name, image, ...quanlity }

                const success = await userService.addCart(filterData)
                if(!success.message){
                    this.message = "Thành công"
                }
                else this.message = "Thất bại"
            }
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
    min-height: 70vh;
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
    width: 80%;
    height: 50%;
    object-fit: contain;
}

.detail__info input{
    max-width: 50px;
}

</style>