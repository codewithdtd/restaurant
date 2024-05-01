<template>
    <div class="header__function__search col-sm-5">
        <button @click="searchMenu">
            <i class="fa-solid fa-magnifying-glass"></i>
        </button>
        <input type="text" class="search__input" v-model="search" @keyup="searchMenu">
        <span v-if="search" @click="this.search = ''">x</span>
        <div class="search__response" v-if="this.search !== ''">
            <p v-for="item in filteredProducts" :key="item">
                <router-link @click="this.search = ''" :to="{name: 'DetailProduct', params: { id: item._id }}">{{ item.name }}</router-link>
            </p>
        </div>
    </div>
</template>

<script>
import menuService from '@/services/menu.service';
import router from '@/router';

export default {
    async mounted() {
        this.menu = await menuService.getAll();
        this.menu = this.menu.filter(item => item.deleted != 1)
    },
    computed: {
        productStrings() {
            return this.menu.map((product) => {
                const { name, price, description, category } = product;
                return [name, price, description, category].join(" ").toUpperCase();
            });
        },
        filteredProducts() {
            if (!this.search) return this.menu;
            return this.menu.filter((_book, index) =>
                    this.productStrings[index].includes(this.search.toUpperCase())
            // Đoạn mã xử lý đầy đủ sẽ trình bày bên dưới
            );
        },
    },
    methods: {
        searchMenu(event) {
            this.search_res = this.menu.filter((item) => item.name.toLowerCase().includes(this.search.toLowerCase()));
            
            if(event.key === 'Enter')
                router.push('/menu?search='+this.search)
            if(this.search == '') {
                this.search_res = '';
            }
        }
    },
    data() {
        return {
            menu: [],
            search_res: '', 
            search: '',
        }
    },
}
</script>

<style> 
.header__function__search input {
    width: 70%;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    padding-left: 10px;
    border: none;
    height: 35px;
    background-color: #ffffff;
    outline: none;
    padding-right: 18%;
}

.header__function__search span {
    /* background-color: #d2d2d2; */
    font-size: 1.4rem;
    font-weight: 300;
    right: 11%;
    position: absolute;
    /* background-color: aqua; */
    color: #ffffff;
    width: 30px;
    text-align: center;
}

.header__function__search span:hover {
    background-color: #d5d5d5;
    border-radius: 50%;
    cursor: pointer;
}

.header__function__search button {
    width: 20%;
    height: 35px;
    border: none;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    background-color: #ffffff;
    padding: 0;
}
.header__function__search {
    position: relative;
}

.search__response {
    max-height: 200px;
    width: 90%;
    background-color: #fff;
    position: absolute;
    z-index: 1;
    margin: 0;
    border-radius: 10px;
    overflow-y: scroll;
}

.search__response p {
    margin: 5px;
}

.search__response a {
    text-decoration: none;
    color: #333;
    display: block;
}
.search__response a:hover {
    background-color: rgb(217, 217, 217);
}

</style>