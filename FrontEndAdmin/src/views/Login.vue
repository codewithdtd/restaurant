<template>
    <div class="login">
        <h1 class="login__title">JDa Chef</h1>
        <div class="image">
            <div class="image__background"></div>
        </div>
        <div class="form">
            <form action="#" method="POST" @submit.prevent="handleSubmit">
                    <h1>TRANG QUẢN LÝ</h1>
                
                    <div class="login__info__item">
                        <i class="ri-user-line"></i>
                        <input required :class="{'error': error}" type="text" v-model="phone" placeholder="Số điện thoại">
                    </div>
                    <div class="login__info__item">
                        <i class="ri-lock-line"></i>
                        <input required :class="{'error': error}" type="password" v-model="password" placeholder="Mật khẩu">
                    </div>
                    <button class="m-1 btn btn-outline-warning">Đăng nhập</button>
            </form>
        </div>
    </div>
</template>

<script>
import { useUserStore } from '@/stores/userStore';
import userService from '@/services/user.service';
import router from '@/router';
export default {
    methods: {
        async handleSubmit() {
            const data = {
                phone: this.phone,
                password: this.password
            }
 
            try {
                const user = await userService.login(data);
                if(user) {
                    const { accessToken, ...orther } = user;
                    this.userStore.setUser(orther)
                    router.push('/')
                }
            } catch (e) {
                this.error = true;
                console.log(e);
            }

        }
    },
    data() {
        return {
            userStore: useUserStore(),
            phone: '',
            password: '',
            error: false,
        }
    },
}
</script>

<style scoped>
.login {
    height: 100vh;
    color: #000000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    text-align: center;
    width: 100vw;
    background-repeat: no-repeat;
    background-size: cover;
    background: #ffffff;
    /* background: linear-gradient(to right ,#000000, #333c3c); */
}
.login__title {
    position: fixed;
    top: 20px;
    left: 20px;
    /* color: #ffffff; */
    font-family: "Satisfy", cursive;
    font-size: 2.5rem;
    font-weight: 500;
    text-decoration: none;
    color: rgb(255, 224, 26);
    z-index: 1;
}
.login .image {
    min-width: 50vw;
    height: 100vh;
    display: flex;
    position: relative;
    background: url('https://statics.vincom.com.vn/xu-huong/chi_tiet_xu_huong/1/14-4/2/nha-hang-sang-trong.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50%;
}


.login .image__background {
    min-width: 50vw;
    height: 100vh;
    display: flex;
    position: relative;
    background: #0000007f;
}

.login .form h1{
    font-weight: 500;
    font-size: 2rem;
}

.login .form {
    padding: 10px 20px;
    color: #000000;
    min-width: 50%;
    height: 100vh;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.login .form form {
    border-radius: 10px;
    padding: 20px 20px;
    width: fit-content;
    width: 100%;
}

.login__info {
    display: flex;
    margin-bottom: 10px;
}

.login__info__item {
    display: flex;
    /* flex-direction: column; */
    align-items: center;
    justify-content: center;
    margin: 20px;
}

.login__info__item i {
    font-size: 1.5rem;
    margin-right: 15px;
}

.login__info__item input, textarea {
    width: 70%;
    border-radius: 5px;
    border: none;
    background-color: rgb(224, 224, 224);
    height: 40px;
    padding-left: 10px;
}
.login form a {
    color: rgb(255, 224, 26);
}

.login button{
    max-width: 200px;
    align-self: center;
}

.login p {
   color: #fff;
}
</style>
