<template>
    <div class="filter">
        <div class="filter__category">
            <!-- <h4>Danh mục
                <span class="" @click="showCategory">
                    <i class="fa-solid fa-caret-down"></i>
                </span>       
            </h4>  
            <ul class="filter__category_list" :class="{'filter__category_list--active': show_category == true}">
                <li class="filter__category__list__item" :class="{ 'filter__category__list__item--active': id_category === '' }" @click="findCategory('')">
                    Tất cả
                </li> 
                <li class="filter__category__list__item" :class="{ 'filter__category__list__item--active': id_category === item._id }" v-for="item in category" :key="item._id" @click="findCategory(item._id)">
                    {{ item.name }}
                </li>  
            </ul> -->

            Danh mục:
            <select @change="findCategory" v-model="id_category">
                <option :value="''">Tất cả sản phẩm</option>
                <option v-for="item in category" :key="item.id" :value="item._id">{{ item.name }}</option>
            </select>
        </div>
        <div class="filter__price">
            Sắp xếp giá:
            <select @change="handleSort" v-model="sort">
                <option :value="''">Mặc định</option>
                <option value="asc">Tăng dần</option>
                <option value="desc">Giảm dần</option>
            </select>
        </div>
        <div class="filter__range">
            Mức giá: 0
            <input @change="filterPrice" class="" type="range" v-model="price" min="50000" max="600000"> {{ formatPrice }} VNĐ
        </div>
    </div>
</template>
<script>
import menuService from "@/services/menu.service";

export default {
    async mounted() {
        this.category = await menuService.getAllCategory();
    },
    computed: {
        formatPrice() {
            return parseInt(this.price).toLocaleString();
        }
    },
    methods: {
        async findCategory() {  
            this.$emit('filter', this.id_category);
        },
        async handleSort() {
            this.$emit('sort', this.sort);
        },
        async filterPrice() {
            this.$emit('range', this.price);
        }
    },
    data() {
        return {
            category: [],
            id_category: '',
            sort: '',
            price: 0,
        }
    },
}
</script>
<style>
.filter {
    background-color: rgba(70, 70, 70, 0.737);
    backdrop-filter: blur(10px);
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    margin-top: 20px;
    border-radius: 5px;
    justify-content: space-around;
    color: #fff;
    text-align: center;
}

.filter select {
    padding: 2px;
    border-radius: 5px;
}

</style>