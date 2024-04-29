<template>
    <div class="product">
        <div class="product__form" :class="{'product__form--active': product_form }">
            <form action="" @submit.prevent="handleSubmit">
                <p class="btn btn-outline-danger close" @click="handleProduct">&times</p>
                <h3 v-if="!product">Thêm sản phẩm</h3>
                <h3 v-else>Chỉnh sửa sản phẩm</h3>
                <div class="product__form__item">
                    <p>Tên:</p>
                    <input required type="text" v-model="name">
                </div>
                <div class="product__form__item">
                    <p>Giá:</p>
                    <input required type="number" v-model="price">
                </div>
                <div class="product__form__item">
                    <p>Danh mục:</p>
                    <select name="" id="" v-model="category">
                        <option :value="category">{{ category }}</option>
                        <option v-for="item in categories" :key="item.id" :value="item.name">{{ item.name }}</option>
                    </select>
                </div>
                <div class="product__form__item">
                    <p>Số lượng:</p>
                    <input required type="number" v-model="quanlity">
                </div>
                <div class="product__form__item">
                    <p>Mô tả:</p>
                    <textarea name="" id="" cols="30" rows="3">{{ description }}</textarea>
                </div>
                <div class="product__form__item">
                    <p>Hình ảnh:</p>
                    <img v-if="product.image != null && imagePreview == null" :src="'http://localhost:3000/static/'+product.image" alt="">
                    <img v-else :src="imagePreview" alt="">
                    <input v-if="product.image == null" required type="file" accept="image/*" @change="handleImage($event.target.files[0])">
                    <input v-if="product.image != null" type="file" accept="image/*" @change="handleImage($event.target.files[0])">
                </div>
                <button v-if="!product._id">Thêm</button>
                <button v-else>Cập nhật</button>
            </form>
        </div>
        <TableProduct ref="tableProduct" :nameTable="this.$route.name" @edit="handleEditProduct"></TableProduct>
    </div>
</template>
<script>
import TableProduct from '@/components/TableProduct.vue'
import ProductService from '@/services/product.service.js'

export default {
    components: {
        TableProduct
    },
    methods: {
        handleProduct() {
            this.product = {};
            this.name = '';
            this._id = null;
            this.price = 0;
            this.description = '';
            this.quanlity = 0;
            this.status = 0;
            this.category = '';
            this.imagePreview = null;
            this.product_form = !this.product_form;
        },
        handleEditProduct(product) {
            this.product = product;
            console.log(this.product);
            this.name = product.name;
            this._id = product._id;
            this.price = product.price;
            this.description = product.description;
            this.quanlity = product.quanlity;
            this.status = product.status;
            this.category = product.category;
            this.imagePreview = null;
            this.product_form = !this.product_form;
        },
        async fetchCategory() {
            this.categories = await ProductService.getAllCategory();
        },
        handleFilter() {
            console.log('Danh mục đã chọn:', this.filter);
        },
        handleImage(img) {
            this.image = img;
            this.imagePreview = URL.createObjectURL(img);
        },
        async handleSubmit() {
            const data = new FormData();
                
            if(this.product._id == null) { 
                data.append('name', this.name);
                data.append('price', this.price);
                data.append('category', this.category);
                data.append('image', this.image);
                data.append('status', this.status);
                data.append('quanlity', this.quanlity);
                data.append('description', this.description);
                console.log(data);
                if(await ProductService.addProduct(data)) {
                    this.product = data;
                    this.product_form = !this.product_form;
                // }
                // if(await ProductService.addProduct(this.product)) {
                //     this.product_form = !this.product_form;
                    this.fetchCategory();
                }
            }
            if(this.product._id != null) {
                data.append('_id', this.product._id);
                data.append('name', this.name);
                data.append('price', this.price);
                data.append('category', this.category);
                // data.append('image', this.image);
                data.append('status', this.status);
                data.append('quanlity', this.quanlity);
                data.append('description', this.description);
                this.imagePreview == null ? data.append('image', this.product.image) : data.append('image', this.image);
                console.log(data)
                if(await ProductService.updateProduct(data)) {
                    this.product = data;
                    this.product_form = !this.product_form;
                    this.fetchCategory();
                }
            }

            await this.$refs.tableProduct.getAllProduct();

        }
    },
    // updated() {
    //     this.fetchCategory();
    // },
    mounted() {
        this.fetchCategory();
    },
    data() {
        return {
            product_form: false,
            product: {},
            filter: '',
            categories: [],
            imagePreview: null,
            image: null,
            _id: null,
            name: '',
            price: 0,
            description: '',
            quanlity: 0,
            category: '',
            status: '',
        }
    }

}


</script>
<style>
.product__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.product__header input {
    font-size: 0.9rem;
    padding: 5px 7px;
    border-radius: 7px;
    border: none;
    width: 10rem;
}

.product__header__action {
    display: flex;
    align-items: center;
}

.product__header__search {
    background-color: white;
    padding: 0 4px;
    border-radius: 7px;
}

.product__header__search input:focus, .product__header__filter select:focus {
    border: none;
    outline: none;
}

.product__header__action button {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    border: none;
    font-weight: 400;
    font-size: 20px;
    background-color: rgb(196, 255, 199);
}
.product__header__action button:hover {
    background-color: #fff;
}

.product__header__filter {
    background-color: #fffefe;
    border-radius: 7px;
    overflow: hidden;
    padding: 1px 0 2px 10px;
    margin-right: 5px;
}

.product__header__filter select{
    font-size: 0.9rem;
    padding: 5px 3px;
    border: none;
    /* width: 10rem; */
}

.product__form {
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

.product__form.product__form--active {
    top: 0;
}

.product__form form {
    position: relative;
    background-color: #2e2e2e;
    /* backdrop-filter: blur(10px); */
    margin: auto;
    height: fit-content;
    text-align: center;
    border-radius: 20px;
    color: #fff;
    padding: 20px 0;
    /* border: 2px solid; */
    box-shadow: 1px 5px 10px rgba(255, 255, 255, 0.267);
    
}

.product__form form h3 {
    padding: 15px;
    color: #3dd651;
    font-weight: 600;
    font-size: 2rem;
}

.product__form__item {
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
    text-align: start;
}
.product__form__item p {
    width: 150px;
}

.product__form__item input, 
.product__form__item select,
.product__form__item textarea {
    flex-grow: 1;
    border-radius: 10px;
    border: none;
}


.product__form form button {
    width: 150px;
    height: 40px;
    border-radius: 12px;
    background-color: #32a041;
    border: none;
    font-weight: 600;
    color: rgb(255, 255, 255);
}
.product__form form .close {
    position: absolute;
    right: 10px;
    top: 10px;
}

.product__form__item img {
    height: 100px;
    width: 100px;
    object-fit: cover;
    border-radius: 10px
}

</style>

  