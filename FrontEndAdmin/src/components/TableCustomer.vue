<template>
    <div class="product__header">
        <div class="product__header__search">
            <i class="ri-search-line"></i>
            <input type="text" placeholder="Tìm kiếm" v-model="search">
        </div>
    </div>
    <div class="tables">
        <div class="table__name">{{ nameTable }}</div>
        <div class="table__title row" >
            <div class="table__title__item col-sm-1">STT</div>
            <div class="table__title__item col-sm-2">
                TÊN
                <div class="filter" @click="handleSort('name')">
                    <i v-if="sort_name" class="ri-arrow-up-fill"></i>
                    <i v-else class="ri-arrow-down-fill"></i>
                </div>
            </div>
            <div class="table__title__item col-sm-2">EMAIL</div>
            <div class="table__title__item col-sm-2">SỐ ĐIỆN THOẠI</div>
            <div class="table__title__item col-sm-2">ĐỊA CHỈ
                <div class="filter" @click="handleSort('address')">
                    <i v-if="sort_address" class="ri-arrow-up-fill"></i>
                    <i v-else class="ri-arrow-down-fill"></i>
                </div>
            </div>
            <div class="table__title__item col-sm-2">
                <div class="filter">
                    <i @click="getAllUser" class="ri-refresh-line"></i>
                </div>
            </div>
        </div>
        <div v-for="(item, index) in filteredList" class="table__list row" :key="item.id">
            <div class="table__list__item col-sm-1">{{ index + 1 }}</div>
            <div class="table__list__item col-sm-2">{{ item.name }}</div>
            <div class="table__list__item col-sm-2">{{ item.email }}</div>
            <div class="table__list__item col-sm-2">{{ item.phone }}</div>
            <div class="table__list__item col-sm-2">{{ item.address}}</div>
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
import userService from '@/services/user.service.js'
export default {
    props: [
        "nameTable",
    ],
    mounted() {
        this.getAllUser()
    },
    emits: ['add', 'edit'],
    computed: {
        sortByName() {
            if(this.sort_name)
                return this.list.sort((a, b) => {
                    var nameA = a.address.toUpperCase(); // Chuyển đổi name thành chữ hoa để so sánh không phân biệt hoa thường
                    var nameB = b.name.toUpperCase();
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    return 0; // Trường hợp nameA === nameB
                });
            else 
                return this.list.sort((a, b) => {
                        var nameA = a.address.toUpperCase(); // Chuyển đổi name thành chữ hoa để so sánh không phân biệt hoa thường
                        var nameB = b.name.toUpperCase();
                        if (nameB < nameA) {
                            return -1;
                        }
                        if (nameB > nameA) {
                            return 1;
                        }
                        return 0; // Trường hợp nameA === nameB
                    });
    
        },
        sortByaddress() {
            if(this.sort_address)
                return this.list.sort((a, b) => {
                    var nameA = a.address.toUpperCase(); // Chuyển đổi name thành chữ hoa để so sánh không phân biệt hoa thường
                    var nameB = b.address.toUpperCase();
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    return 0; // Trường hợp nameA === nameB
                });
            else 
                return this.list.sort((a, b) => {
                        var nameA = a.address.toUpperCase(); // Chuyển đổi name thành chữ hoa để so sánh không phân biệt hoa thường
                        var nameB = b.address.toUpperCase();
                        if (nameB < nameA) {
                            return -1;
                        }
                        if (nameB > nameA) {
                            return 1;
                        }
                        return 0; // Trường hợp nameA === nameB
                    });
        },
        listStrings() {
            return this.list.map((item) => {
                const { name, phone, address, email  } = item;
                return [name, phone, address, email ].join(" ").toLowerCase();
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
        async getAllUser() {
            this.list = await userService.getAll();
            this.list = this.list.filter(item => item.deleted == 0);
        },
        handleSort(item) {
            if(item == 'name') {
                this.sort_name = !this.sort_name;
                this.sort_price = false;
                this.sort_address = false;
                this.sortByName;
            }
            if(item == 'address') {
                this.sort_address = !this.sort_address;
                this.sort_price = false;
                this.sort_name = false;
                this.sortByaddress;
            }
        },
        handleEmit(product) {
            this.$emit('edit', product);
        },
        async handleDelete(product) {
            console.log(product)
            if (await userService.deleteUser(product)) 
                this.getAllUser();
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
            sort_address: false,
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

  