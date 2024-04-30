<template>
    <div class="tables">
        <div class="table__name">{{ nameTable }}</div>
        <div class="table__title row" >
            <div class="table__title__item col-sm-1">STT</div>
            <div class="table__title__item col-sm-2">TÊN</div>
            <div class="table__title__item col-sm-2">SỐ LƯỢNG</div>
            <div class="table__title__item col-sm-4">CÁC SẢN PHẨM</div>
            <div class="table__title__item col-sm-2"></div>
        </div>
        <div v-for="(item, index) in list" class="table__list row" :key="item.id">
            <div class="table__list__item col-sm-1">{{ index + 1 }}</div>
            <div class="table__list__item col-sm-2">{{ item.name }}</div>
            <div class="table__list__item col-sm-2">{{ item.quantity }}</div>
            <div class="table__list__item col-sm-4">{{ }}</div>
            <div class="table__list__item table__list__item--edit col-sm-1">
                <i class="ri-edit-line"></i>
            </div>
            <div class=" table__list__item table__list__item--delete col-sm-1">
                <i class="ri-delete-bin-2-line"></i>
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
        this.getAllCategory()
    },
    components: {
        Image
    },
    methods: {
        async getAllCategory() {
            this.list = await ProductService.getAllCategory();
            this.product = await ProductService.getAll();

            for (let item of this.list) {
                let quantity = 0;
                // Tìm các sản phẩm có category tương ứng và tính tổng số lượng
                for (let productItem of this.product) {
                    if (productItem.category === item.name) {
                        quantity++;
                    
                    }
                }
                // Lưu số lượng vào đối tượng categoryQuantities
                item.quantity = quantity;
            }
        }
    },
    data() {
        return {
            list: [],
            product: [],
            categoryQuantities: {}
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
.table__list {
    height: 100px;
    color: #fff;
    border-top: 2px solid;
    display: flex;
    align-items: center;
}
.table__list__item i {
    background-color: transparent;
    color: #fff;
    font-size: 1.3rem;
}

.table__list__item--edit i {
    color: rgb(48, 155, 48);
}

.table__list__item--delete i {
    color: rgb(195, 44, 44);
}

</style>

  