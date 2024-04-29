<template>
    <div class="product__header">
        <div class="product__header__search">
            <i class="ri-search-line"></i>
            <input type="text" placeholder="Tìm kiếm" v-model="search">
        </div>
        <div class="product__header__action">
            <div class="product__header__filter">
                <i class="ri-filter-line"></i>
                <select name="" id="" v-model="filter" @change="this.search = this.filter">
                    <option disabled value="">Chọn danh mục</option>
                    <option v-for="item in category" :key="item.id" :value="item.name">{{ item.name }}</option>
                </select>
            </div>
            <button @click="handleProduct">+</button>
        </div>
    </div>
    <div class="tables">
        <div class="table__name">{{ nameTable }}</div>
        <div class="table__title row" >
            <div class="table__title__item col-sm-1">STT</div>
            <div class="table__title__item col-sm-2">HÌNH ẢNH</div>
            <div class="table__title__item col-sm-2">
                TÊN
                <div class="filter" @click="handleSort('name')">
                    <i v-if="sort_name" class="ri-arrow-up-fill"></i>
                    <i v-else class="ri-arrow-down-fill"></i>
                </div>
            </div>
            <div class="table__title__item col-sm-2">GIÁ
                <div class="filter" @click="handleSort('price')">
                    <i v-if="sort_price" class="ri-arrow-up-fill"></i>
                    <i v-else class="ri-arrow-down-fill"></i>
                </div>
            </div>
            <div class="table__title__item col-sm-2">SỐ LƯỢNG
                <div class="filter" @click="handleSort('quantity')">
                    <i v-if="sort_quantity" class="ri-arrow-up-fill"></i>
                    <i v-else class="ri-arrow-down-fill"></i>
                </div>
            </div>
            <div class="table__title__item col-sm-2">
                <div class="filter">
                    <i @click="getAllProduct" class="ri-refresh-line"></i>
                </div>
            </div>
        </div>
        <div v-for="(item, index) in filteredList" class="table__list row" :key="item.id">
            <div class="table__list__item col-sm-1">{{ index + 1 }}</div>
            <div class="table__list__item col-sm-2"><Image :src="item.image" /></div>
            <div class="table__list__item table__list__item--name col-sm-2 text-start">{{ item.name }} <br>Phân loại: {{ item.category }}</div>
            <div class="table__list__item col-sm-2">{{ item.price }}</div>
            <div class="table__list__item col-sm-2">{{ item.quanlity }}</div>
            <div class="table__list__item table__list__item--edit col-sm-1">
                <i class="ri-edit-line" @click="handleEmit(item)"></i>
            </div>
            <div class=" table__list__item table__list__item--delete col-sm-1">
                <i class="ri-delete-bin-2-line" @click="handleDelete(item)"></i>
            </div>
        </div>
    </div>
</template>
<script>
import Image from '@/components/Image.vue';
import ProductService from '@/services/product.service.js'
export default {
    props: [
        "nameTable",
    ],
    mounted() {
        this.getAllProduct()
    },
    // watch: {
    //     list(newValue) {
    //         this.getAllProduct();
    //     },
    // },
    computed: {
        sortByPrice() {
            if(this.sort_price)
                return this.list.sort((a,b) => a.price - b.price)
            else
                return this.list.sort((a,b) => b.price - a.price)
        },
        sortByQuantity() {
            if(this.sort_quantity)
                return this.list.sort((a,b) => a.quanlity - b.quanlity)
            else
                return this.list.sort((a,b) => b.quanlity - a.quanlity)
        },
        listStrings() {
            return this.list.map((item) => {
                const { name, price, description, category,  } = item;
                return [name, price, description, category, ].join(" ").toLowerCase();
            });
        },
            // Trả về các contact có chứa thông tin cần tìm kiếm.
        filteredList() {
            if (!this.search && !this.filter) return this.list;
            // return this.list.filter((_product, index) =>
            //     this.listStrings[index].includes(this.search.toLowerCase())
            const searchTerms = this.search.toLowerCase().split(' ');
            return this.list.filter((_product, index) =>
                // Kiểm tra xem mỗi từ trong chuỗi tìm kiếm có tồn tại trong mảng ban đầu không
                searchTerms.every(term =>
                    this.listStrings[index].includes(term)
                )
                // Đoạn mã xử lý đầy đủ sẽ trình bày bên dưới
            );
        },
    },
    components: {
        Image
    },
    methods: {
        async getAllProduct() {
            this.list = await ProductService.getAll();
            this.list = this.list.filter(item => item.deleted == 0);
            this.category = await ProductService.getAllCategory();
        },
        handleSort(item) {
            if(item == 'name') {
                this.sort_name = !this.sort_name;
                this.sort_price = false;
                this.sort_quantity = false;
            }
            if(item == 'price') {
                this.sort_price = !this.sort_price;
                this.sort_name = false;
                this.sort_quantity = false;
                this.sortByPrice;
            }
            if(item == 'quantity') {
                this.sort_quantity = !this.sort_quantity;
                this.sort_price = false;
                this.sort_name = false;
                this.sortByQuantity;
            }
        },
        handleEmit(product) {
            this.$emit('edit', product);
        },
        async handleDelete(product) {
            console.log(product)
            if (await ProductService.deleteProduct(product)) 
                this.getAllProduct();
        },
        handleFilter() {

        }
    },
    data() {
        return {
            list: [],
            category: [],
            sort_name: false,
            sort_price: false,
            sort_quantity: false,
            search: '',
            filter: ''
        }
    }
}


</script>
<style>
.tables {
    /* background-color: #fff; */
    flex-grow: 1;
    background-color: #2e2e2e;
    border-radius: 15px;
    padding: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 5px 10px;
    text-align: center;
    margin-top: 40px;
}

.table__name {
    background: linear-gradient(to right, rgb(33, 135, 59), rgb(78, 151, 74)) ;
    position: relative;
    height: 80px;
    /* width: 90%; */
    margin: 0 5px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    top: -40px;
    text-align: start;
    display: flex;
    align-items: center;
    padding-left: 20px;
    font-weight: 600;
    font-size: 1.2rem;
    color: #fff;
}

.table__title {
    font-weight: 700;
    color: #b3b3b3;
    font-size: 0.8rem;
    /* border-bottom: 2px solid; */
    padding-bottom: 15px;
}
.table__title__item {
    display: flex;
    justify-content: center;
    align-items: center;
}
.table__list {
    height: 100px;
    color: #fff;
    border-top: 2px solid;
    display: flex;
    align-items: center;
}

.table__list__item--name {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
}

.table__list__item i {
    background-color: transparent;
    color: #fff;
    font-size: 1.3rem;
    padding: 5px;
}

.table__list__item--edit i {
    color: rgb(48, 155, 48);
}

.table__list__item--delete i {
    color: rgb(195, 44, 44);
}

.tables .filter {
    display: flex;
    flex-direction: column;
    background-color: #2e2e2e;
    padding: 0;
}

.tables .filter i {
    background: #2e2e2e;
    font-size: 1rem;
    font-weight: 900;
    color: #c4ffba;
    padding-left: 0px;
    cursor: pointer;
}

.table__list__item i:hover {
    background-color: #424242;
    border-radius: 50%;
    cursor: pointer;
}

</style>

  