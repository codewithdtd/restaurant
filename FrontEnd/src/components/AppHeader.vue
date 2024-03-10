<template>
   <div class="header row">
        <div class="header__logo col-md-2">
            <router-link to="/" class="header__logo">
                JDa Chef
            </router-link>
        </div>

        <div class="header__navbar col-md-5">
            <router-link to="/">Trang chủ</router-link>
            <router-link to="/">Menu</router-link>
            <router-link to="/">Giới thiệu</router-link>
            <router-link to="/">Liên hệ</router-link>
        </div>
        
        <div class="header__function col-md-5 row">
            <div class="header__function__icon col-md-6">
                <div class="header__icon__search">
                    <input type="text" class="search__input">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </div>
                <router-link to="/">
                    <i class="fa-solid fa-bag-shopping header__icon__cart"></i>
                </router-link>
            </div>
    
            <div class="header__function__info col-md-6">
                <router-link to="/">
                    <button class="btn btn-outline-warning">Đăng ký</button>
                </router-link>
                <router-link to="/">
                    <button class="btn btn-warning">Đăng nhập</button>
                </router-link>
            </div>
        </div>
   </div>
</template>

<script>
export default {
    data() {
        return {
            user: true,
        }
    }

}
</script>

<style>

.header {
    background-color: aquamarine;
}

.header__function {
    background-color: rgb(124, 78, 168);
}
</style>