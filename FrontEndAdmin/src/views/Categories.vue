<template>
    <div class="user__form" :class="{'user__form--active': user_form }">
        <form action="" @submit.prevent="handleSubmit">
            <p class="btn btn-outline-danger close" @click="handleUser">&times</p>
            <h3>Danh mục</h3>
            <div class="user__form__item">
                <p>Tên:</p>
                <input required type="text" v-model="user.name">
            </div>
            <button>Xác nhận</button>
        </form>
    </div>
    <TableCategory ref="tableCategory" :nameTable="this.$route.name" @add="handleUser" @edit="handleEdit"></TableCategory>
</template>
<script>
import TableCategory from '@/components/TableCategory.vue'
import productService from '@/services/product.service.js'

export default {
    components: {
        TableCategory
    },
    methods: {
        async handleUser() {
            this.user = {};
            this.user_form = !this.user_form;
            await this.$refs.tableCategory.getAllCategory();
        },
        handleEdit(order) {
            this.user = order;
            console.log(this.user);
            this.user_form = !this.user_form;
        },
        async handleSubmit() {   
            if(this.user._id != null) {
                if(await productService.updateCategory(this.user)) {
                    this.user_form = !this.user_form;
                }
            }
            else if(this.user._id == null) {
                if(await productService.addCategory(this.user)) {
                    this.user_form = !this.user_form;
                }
            }

            await this.$refs.tableCategory.getAllCategory();

        },
    },
    data() {
        return {
            user_form: false,
            user: {},
            filter: '',
        }
    }
}


</script>
<style>
.user__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.user__header input {
    font-size: 0.9rem;
    padding: 5px 7px;
    border-radius: 7px;
    border: none;
    width: 10rem;
}

.user__header__action {
    display: flex;
    align-items: center;
}

.user__header__search {
    background-color: white;
    padding: 0 4px;
    border-radius: 7px;
}

.user__header__search input:focus, .user__header__filter select:focus {
    border: none;
    outline: none;
}

.user__header__action button {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    border: none;
    font-weight: 400;
    font-size: 20px;
    background-color: rgb(196, 255, 199);
}
.user__header__action button:hover {
    background-color: #fff;
}

.user__header__filter {
    background-color: #fffefe;
    border-radius: 7px;
    overflow: hidden;
    padding: 1px 0 2px 10px;
    margin-right: 5px;
}

.user__header__filter select{
    font-size: 0.9rem;
    padding: 5px 3px;
    border: none;
    /* width: 10rem; */
}

.user__form {
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

.user__form.user__form--active {
    top: 0;
}

.user__form form {
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

.user__form form h3 {
    padding: 15px;
    color: #3dd651;
    font-weight: 600;
    font-size: 2rem;
}

.user__form__item {
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
    text-align: start;
}
.user__form__item p {
    width: 150px;
}

.user__form__item input, 
.user__form__item select,
.user__form__item textarea {
    flex-grow: 1;
    border-radius: 10px;
    border: none;
}


.user__form form button {
    width: 150px;
    height: 40px;
    border-radius: 12px;
    background-color: #32a041;
    border: none;
    font-weight: 600;
    color: rgb(255, 255, 255);
}
.user__form form .close {
    position: absolute;
    right: 10px;
    top: 10px;
}

.user__form__item img {
    height: 100px;
    width: 100px;
    object-fit: cover;
    border-radius: 10px
}
</style>

  