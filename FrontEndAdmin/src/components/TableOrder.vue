<template>
    <div class="product__header">
        <div class="product__header__search">
            <i class="ri-search-line"></i>
            <input type="text" placeholder="Tìm kiếm" v-model="search">
        </div>
        <div class="order__header__action">
            <i class="ri-filter-line"></i>
            <div class="order__header__action__content text-center">
                <p>Giá tiền:</p>
                từ: <input type="number" v-model="filterMinPrice"> đến:<input type="number" v-model="filterMaxPrice">
                <p>Ngày đặt hàng:</p>
                từ: <input type="date" v-model="filterOrderDayMin"> đến <input type="date" v-model="filterOrderDayMax">
                <p>Ngày nhận hàng:</p>
                từ: <input type="date" v-model="filterDeliveryDayMin"> đến <input type="date" v-model="filterDeliveryDayMax">
            </div>
        </div>
    </div>
    <div class="tables">
        <div class="table__name">{{ nameTable }}</div>
        <div class="table__title row" >
            <div class="table__title__item col-sm-1">STT</div>
            <div class="table__title__item col-sm-2">
                TÊN
            </div>
            <div class="table__title__item col-sm-1">SỐ ĐIỆN THOẠI</div>
            <div class="table__title__item col-sm-2">NGÀY ĐẶT HÀNG
                <div class="filter" @click="handleSort('orderDay')">
                    <i v-if="sort_orderDay" class="ri-arrow-up-fill"></i>
                    <i v-else class="ri-arrow-down-fill"></i>
                </div>
            </div>
            <div class="table__title__item col-sm-2">NGÀY NHẬN HÀNG
                <div class="filter" @click="handleSort('deliveryDate')">
                    <i v-if="sort_deliveryDate" class="ri-arrow-up-fill"></i>
                    <i v-else class="ri-arrow-down-fill"></i>
                </div>
            </div>
            <div class="table__title__item col-sm-1">TỔNG TIỀN
                <div class="filter" @click="handleSort('price')">
                    <i v-if="sort_price" class="ri-arrow-up-fill"></i>
                    <i v-else class="ri-arrow-down-fill"></i>
                </div>
            </div>
            <div class="table__title__item col-sm-2">TRẠNG THÁI</div>
            <div class="table__title__item col-sm-1">
                <div class="filter">
                    <i @click="getAllOrder" class="ri-refresh-line"></i>
                </div>
            </div>
        </div>
        <div v-for="(item, index) in filteredList" class="table__list row" :key="item.id">
            <div class="table__list__item col-sm-1">{{ index + 1 }}</div>
            <div class="table__list__item col-sm-2">{{ item.name }}</div>
            <div class="table__list__item col-sm-1">{{ item.phone }}</div>
            <div class="table__list__item col-sm-2">{{ item.orderDay }}</div>
            <div class="table__list__item col-sm-2">{{ item.deliveryDate }}</div>
            <div class="table__list__item col-sm-1">{{ item.totalPrice }}</div>
            <div v-if="item.status == 'Giao hàng thành công'" class="table__list__item col-sm-2 text-success">{{ item.status }}</div>
            <div v-else-if="item.status == 'Đã hủy'" class="table__list__item col-sm-2 text-danger">{{ item.status }}</div>
            <div v-else class="table__list__item col-sm-2 text-info">{{ item.status }}</div>
            <div class="table__list__item table__list__item--edit col-sm-1">
                <i class="ri-eye-line" @click="handleEmit(item)"></i>
            </div>
        </div>
    </div>
</template>
<script>
import Image from '@/components/Image.vue';
import userService from '@/services/user.service.js'
export default {
    props: [
        "nameTable",
    ],
    mounted() {
        this.getAllOrder()
    },
    emits: ['add', 'edit'],
    components: {
        Image
    },
    computed: {
        sortByPrice() {
            if(this.sort_price)
                return this.list.sort((a,b) => a.totalPrice - b.totalPrice)
            else
                return this.list.sort((a,b) => b.totalPrice - a.totalPrice)
        },
        sortByDeliveryDate() {
            if(this.sort_deliveryDate)
                return this.list.sort((a,b) => {
                    const deliveryDateA = this.parseDateString(a.deliveryDate);
                    const deliveryDateB = this.parseDateString(b.deliveryDate);
                    if (!deliveryDateA && !deliveryDateB) {
                        return 0; // Nếu cả hai đều trống, giữ nguyên vị trí ban đầu
                    } else if (!deliveryDateA) {
                        return 1; // Nếu chỉ deliveryDateA trống, đẩy b về sau a
                    } else if (!deliveryDateB) {
                        return -1; // Nếu chỉ deliveryDateB trống, đẩy a về sau b
                    } else {
                        return deliveryDateA - deliveryDateB;
                    }
                })
            else
                return this.list.sort((a,b) => {
                    const deliveryDateA = this.parseDateString(a.deliveryDate);
                    const deliveryDateB = this.parseDateString(b.deliveryDate);
                    if (!deliveryDateA && !deliveryDateB) {
                        return 0; // Nếu cả hai đều trống, giữ nguyên vị trí ban đầu
                    } else if (!deliveryDateA) {
                        return 1; // Nếu chỉ deliveryDateA trống, đẩy b về sau a
                    } else if (!deliveryDateB) {
                        return -1; // Nếu chỉ deliveryDateB trống, đẩy a về sau b
                    } else {
                        return deliveryDateB - deliveryDateA;
                    }
                })
        },
        sortByOrderDay() {
            if(this.sort_orderDay)
                return this.list.sort((a,b) => {
                    const orderDayA = this.parseDateString(a.orderDay);
                    const orderDayB = this.parseDateString(b.orderDay);
                    return orderDayA - orderDayB;
                })
            else
                return this.list.sort((a,b) => {
                    const orderDayA = this.parseDateString(a.orderDay);
                    const orderDayB = this.parseDateString(b.orderDay);
                    return orderDayB - orderDayA;
                })
        },
        listStrings() {
            return this.list.map((item) => {
                const { name, note, address, phone, totalPrice, orderDay, deliveryDate, status  } = item;
                return [name, note, address, phone, totalPrice, orderDay, deliveryDate, status ].join(" ").toLowerCase();
            });
        },
            // Trả về các contact có chứa thông tin cần tìm kiếm.
        filteredList() {
            if(this.filterMinPrice != null && this.filterMaxPrice != null) {
                return this.list.filter((item) => {
                    let price = item.totalPrice;
                    console.log(this.filterMinPrice)
                    return (price >= this.filterMinPrice) && (price <= this.filterMaxPrice);
                });
            }
            if(this.filterOrderDayMin != null && this.filterOrderDayMax != null) {
                return this.list.filter(item => {
                    let orderDay = this.parseDateString(item.orderDay);
                    return orderDay >= new Date(this.filterOrderDayMin) && orderDay <= new Date(this.filterOrderDayMax);
                });
            }
            if(this.filterDeliveryDayMin != null && this.filterDeliveryDayMax != null) {
                return this.list.filter(item => {
                    let DeliveryDay = this.parseDateString(item.deliveryDate);
                    return DeliveryDay >= new Date(this.filterDeliveryDayMin) && DeliveryDay <= new Date(this.filterDeliveryDayMax);
                });
            }
            if(this.filterDeliveryDayMin != null && this.filterDeliveryDayMax != null) {
                return this.list.filter(item => {
                    let DeliveryDay = this.parseDateString(item.deliveryDate);
                    return DeliveryDay >= new Date(this.filterDeliveryDayMin) && DeliveryDay <= new Date(this.filterDeliveryDayMax);
                });
            }
            if (!this.search ) return this.list;
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
    methods: {
        async getAllOrder() {
            this.list = await userService.getAllOrder();
            this.search = '',
            this.filterOrderDayMin = null,
            this.filterOrderDayMax = null,
            this.filterDeliveryDayMax = null,
            this.filterDeliveryDayMin = null,
            this.filterMaxPrice = null,
            this.filterMinPrice = null
            // this.list = this.list.filter(item => item.deleted == 0);
        },
        handleEmit(product) {
            this.$emit('edit', product);
        },
        parseDateString(dateString) {
            if(dateString != null) {
                let parts = dateString.split(/[\/ :]/);
                // parts sẽ là một mảng chứa [ngày, tháng, năm, giờ, phút, giây]
                let day = parseInt(parts[0], 10);
                let month = parseInt(parts[1], 10);
                let year = parseInt(parts[2], 10);
                let hours = parseInt(parts[3], 10);
                let minutes = parseInt(parts[4], 10);
                let seconds = parseInt(parts[5], 10);
                
                // Tạo đối tượng Date với các thành phần trên
                return new Date(year, month - 1, day, hours, minutes, seconds);
            }
        },
        handleSort(item) {
            if(item == 'orderDay') {
                this.sort_orderDay = !this.sort_orderDay;
                this.sort_price = false;
                this.sort_deliveryDate = false;
                this.sortByOrderDay;
            }
            if(item == 'price') {
                this.sort_price = !this.sort_price;
                this.sort_orderDay = false;
                this.sort_deliveryDate = false;
                this.sortByPrice;
            }
            if(item == 'deliveryDate') {
                this.sort_deliveryDate = !this.sort_deliveryDate;
                this.sort_price = false;
                this.sort_orderDay = false;
                this.sortByDeliveryDate;
            }
        },
        handleAdd() {
            this.$emit('add');
        },
    },
    data() {
        return {
            list: [],
            sort_orderDay: false,
            sort_price: false,
            sort_deliveryDate: false,
            search: '',
            filterMinPrice: null,
            filterMaxPrice: null,
            filterOrderDayMin: null,
            filterOrderDayMax: null,
            filterDeliveryDayMin: null,
            filterDeliveryDayMax: null,
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

.table__list__item {
    word-wrap: break-word;
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

.order__header__action {
    border-radius: 10px;
    background-color: rgb(255, 255, 255);
    padding: 5px 8px;
    margin-right: 10px;
    position: relative;
}

.order__header__action:hover {
    background-color: #c4ffba;
    cursor: pointer;
}

.order__header__action:hover .order__header__action__content {
    display: block;
}

.order__header__action__content {
    display: none;
    position: absolute;
    top: 100%;
    z-index: 1;
    background-color: #fff;
    width: 400px;
    right: 0;
    border-radius: 5px;
    padding: 5px;
}

.order__header__action__content p {
    margin: 0;
}

.order__header__action__content input {
    background-color: #cecece;
}


</style>

  