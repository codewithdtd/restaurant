<template>
    <div class="menu">
        <div class="notification" @click="hideNotify" v-if="message"> 
            <div class="notification__message"><i class="fa-solid fa-circle-check"></i>
                <p>{{ message }}</p>
            </div>
        </div>
        <div class="menu__product col-lg-10 col-md-9 col-12">
            <Filter @sort="sort" @filter="filter" @range="range" />
            <h1 class="menu__title">Thực Đơn</h1>
            <div class="menu__product__list" v-if="menu.length>0">
                <div class="menu__product__item col-lg-2 col-3" v-for="item in menu">
                    <router-link :to="{ path: '/menu/' + item._id}" class="menu__product__item__image">
                        <img :src="'http://localhost:3000/static/'+item.image" alt="" class="">
                    </router-link>
                    
                    <div class="menu__product__item__information">
                        <p class="menu__product__item__name">{{ item.name }}</p>
                        <p class="menu__product__item__price">{{ parseInt(item.price).toLocaleString() }}</p>
                    </div>
                    <div class="menu__product__item__button">
                        <button v-if="item.quanlity > 0" @click="addToCart(item)">Mua</button>
                        <button v-else class="btn btn-secondary" disabled>Hết hàng</button>
                        <router-link :to="{ path: '/menu/' + item._id}">Xem thêm</router-link>
                    </div>
                </div>
            </div>
            <div class="menu__product__list row text-light" v-else>Không có sản phẩm nào</div>         
        </div>
    </div>
</template>

<script>
import menuService from "@/services/menu.service";
import userService from "@/services/user.service";
import { useUserStore } from "@/stores/userStore";
import Filter from "@/components/Filter.vue";
export default {
    components: {
        Filter,
    },
    watch: {
        '$route.query'(newValue) {
            this.query = this.$route.query.search;
            this.getData();
        },
    },
    computed: {
        productStrings() {
            return this.menu.map((product) => {
                const { name, price, description, category } = product;
                return [name, price, description, category].join(" ").toUpperCase();
            });
        },
        filteredProducts() {
            if (this.query == '') return this.menu;
            return this.menu.filter((_products, index) =>
                    this.productStrings[index].includes(this.query.toUpperCase())
            );
        },
    },
    async mounted() {
        this.getData();
        // this.menu = this.id_category? await menuService.getByCategory(id_category): await menuService.getAll();
        // this.menu = this.menu.filter(item => item.deleted != 1)
    },
    data() {
        return {
            menu: [],
            id_category: '',
            message: '',
            query: ''
        }
    },
    methods: {
        async getData() {
            this.menu = this.id_category? await menuService.getByCategory(id_category): await menuService.getAll();
            this.menu = this.menu.filter(item => item.deleted != 1)
        
            if(this.query != '') {
                this.menu = this.filteredProducts;
            }

        },
        async addToCart(data) {
            if (!useUserStore().login) {
              // Hiển thị thông báo yêu cầu đăng nhập
              const confirmed = confirm('Bạn cần đăng nhập để mua hàng. Bạn có muốn đăng nhập ngay không?');
              if (confirmed) {
                // Chuyển hướng đến trang đăng nhập
                this.$router.push('/login'); // Thay đổi '/login' thành địa chỉ của trang đăng nhập của bạn
                }
            }
            else {
                const { _id, price, name, image } = data;
                const filterData = { _id, price, name, image }
                const success = await userService.addCart(filterData)
                if(!success.message){
                    this.message = "Thành công"
                }
                else this.message = "Thất bại"
            }
        },
        hideNotify() {
            this.message = ''
        },
        async sort(data) {
            console.log(this.beforeSort)
            if (data == 'asc') 
                this.menu = this.menu.sort((a, b) => a.price - b.price)
            else if (data == 'desc')
                this.menu = this.menu.sort((a, b) => b.price - a.price)
            else {
                this.menu = await menuService.getAll();
                this.menu = this.menu.filter(item => item.deleted != 1)
            }
        },   
        async filter(data) {
            this.menu = data != '' ? await menuService.getByCategory(data): await menuService.getAll();    
        },
        async range(data) {
            this.menu = await menuService.getAll();
            this.menu = this.menu.filter(item => item.deleted != 1)
            this.menu = this.menu.filter(item => item.price <= data)
        }  
    }
}   
</script>

<style>

.menu {
    height: fit-content;
    min-height: 100vh;
    position: relative;
    /* background: url("../assets/bg.jpg"); */
    background: #000000d7;    
    margin-top: -10px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.menu__title {
    color: #fff;
    font-family: "Dancing Script", cursive;
    text-align: center;
    color: var(--color-main);
    /* font-size: 2.5rem; */
    margin: 10px;
}

.menu__product__list {
    display: flex;
    flex-wrap: wrap;
}

.menu__product__item {
    height: 40vh;
    background-color: #00000077;
    padding: 0;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid #fff;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    margin: 10px 4%;
}

.menu__product__item:hover {
    background-color: #4e4e4e77;
    transform: translateY(-5px);
    transition: .4s ease;
}

.menu__product__item__image {
    height: 65%;
    overflow: hidden;
}

.menu__product__item__image img{
    height: 100%;
    width: 100%;
    object-fit: cover;
}

.menu__product__item__information {
    flex-grow: 1;
    text-align: center;
    margin: 0 5px;
}
.menu__product__item__information p {
    margin: 0;
    font-size: 0.9rem;
}

.menu__product__item__name {
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #ffffff;
}

.menu__product__item__price {
    color: var(--color-main);
}

.menu__product__item__button {
    margin: 5px;
    display: flex;
    justify-content: space-around;
}

.menu__product__item__button button {
    background-color: var(--color-main);
    border-radius: 8px;
    width: 50%;
    font-weight: 600;
    color: #000000;
    padding: 5px;
}

.menu__product__item__button button:hover {
    background-color: #c8b11d;
    /* color: #484848; */
    border: 1px solid #fff;
}
.menu__product__item__button a {
    font-size: 0.7rem;
    align-self: end;
    color: var(--color-main);
}

.notification {
    position: absolute;
    background-color: #00000072;
    border: 2px solid #000000;
    border-radius: 5px;
    height: 100%;
    width: 100%;
    color: #00a933;
    display: flex;
    opacity: 1;
    z-index: 1;
    transition: opacity 0.5s ease;;
}

.notification__message {
    margin: auto;
    margin-top: 15%;
    background-color: #ffffff;
    /* width: 200px;
    height: 120px; */
    padding: 30px 80px;
    text-align: center;
}
.notification__message i {
    font-size: 3rem;
}



</style>