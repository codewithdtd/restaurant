<template>
   <div class="header row">
        <div class="header__logo col-sm-auto">
            <router-link to="/" class="header__logo__title">
                JDa Chef
            </router-link>
        </div>
        <div class="header__button col-sm-auto">
            <div class="header__function__item header__function__cart">
                <router-link to="/cart">
                    <i class="fa-solid fa-bag-shopping header__icon__cart"></i>
                </router-link>
            </div>
            <div class="header__function__item header__function__bar">
                <i class="fa-solid fa-bars "></i>
            </div>
        </div>


        <div class="header__menu col-md-10 col-sm-5 row">
            <div class="header__navbar col-md-6">
                <router-link to="/" class="header__navbar__link">Trang chủ</router-link>
                <router-link to="/menu" class="header__navbar__link">Menu</router-link>
                <router-link to="/about" class="header__navbar__link">Giới thiệu</router-link>
                <router-link to="/contact" class="header__navbar__link">Liên hệ</router-link>
            </div>
                
            <div class="header__function col-md-6 justify-content-end">
                <!-- <Search /> -->
                <div class="header__function__item header__function__search">
                    <input type="text" class="search__input">
                    <button>
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>
                <div class="header__function__item header__function__cart">
                    <router-link to="/cart">
                        <i class="fa-solid fa-bag-shopping header__icon__cart"></i>
                    </router-link>
                </div>
        
                <div class="header__function__item header__function__info">
                    <router-link to="/register">
                        <button class="btn btn-outline-warning">Đăng ký</button>
                    </router-link>
                    <router-link to="/login">
                        <button class="btn btn-warning">Đăng nhập</button>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Search from './Search.vue';
// import Navbar from './Navbar.vue';
// import NavbarHide from './NavbarHide.vue';


export default {
    components: { Search },
    methods: {
       
    },
    data() {
        return {
         
        }
    },

}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Satisfy&display=swap');

.header {
    background-color: rgb(77, 77, 77);
    align-items: center;
    border: 2px solid #333;
    position: sticky;
    top: 0;
    display: flex;
    justify-content: space-between;
    /* height: 100px; */
}
.header__logo {
    padding: 15px;
    margin-left: 10px;
}
.header__logo__title {
    font-family: "Satisfy", cursive;
    font-size: 1.8rem;
    font-weight: 500;
    text-decoration: none;
    color: rgb(255, 224, 26);
}

.header__navbar {
    flex-grow: 1;
    display: flex;
    justify-content: space-around;
    align-items: center;
    /* padding: 0 100px; */
}

.header__navbar a {
    font-size: 1rem;
    text-decoration: none;
    color: rgb(255, 255, 255);
    font-weight: 600;
    padding: 5px;
    position: relative;
}

.header__navbar a::before {
    height: 3px;
    background: rgb(228, 203, 34);
    content: " ";
    width: 0%;
    left: 1px;
    bottom: 3px;
    position: absolute;
    transition: ease 0.2s;
}
.header__navbar a:hover::before{
    width: 100%;
    /* background-color: #fff; */
}
.header__navbar a:hover {
    color: rgb(228, 203, 34);
}

.header__navbar .router-link-exact-active {
    color: rgb(228, 203, 34);
}
.header__navbar .router-link-exact-active::before {
    color: rgb(228, 203, 34);
    width: 100%;
} 



.header__icon__cart {
    text-decoration: none;
    color: #fff;
    font-size: 1.5rem;
    border-radius: 50%;
    margin-right: 15px;
}

.header__icon__cart:hover {
    color: rgb(255, 224, 26);
}

.header__function {
    display: flex;
    justify-content: end;
    align-items: center;
}
.header__menu {
    flex-grow: 1;
}

.header .header__button {
    display: none;
}

@media only screen and (max-width: 785px) {
    .header {
        position: relative;
    }
    .header__menu {
        position: absolute;
        top: 100%;
        right: 0;
        background-color:#4d4d4d;
        flex-direction: column;
        align-items: end;
        padding: 20px;
        /* height: 80vh; */
    }
    .header__navbar, .header__function {
        flex-direction: column;
        align-items: start;
        /* padding: 10px 0; */
    }
    .header__navbar {
        justify-content: center;
    }

    .header__function__cart {
        display: none;
    }

    .header__function{
        align-items: center;
    }

    .header__function__item {
        padding-top: 15px;
        text-align: center;
    }
    
    .header .header__button {
        /* display: inline-block; */
        margin-right: 20px;
        color: #fff;
        font-size: 1.4rem;
        cursor: pointer;
        border-radius: 10px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .header__button .header__function__item {
        padding: 0;
        margin-left: 10px;
        display: block;
    }

    .header__button .header__function__item.header__function__bar {
        padding: 4px 11px;
        border-radius: 7px;
    }

    .header .header__button .header__function__bar:hover {
        background-color: #686868;
    } 

    .header__navbar a {
        padding-bottom: 20px;
        /* background-color: #686868; */
        width: 100%;
    }

    .header__navbar a:hover {
        background-color: #686868;
    }


}

</style>