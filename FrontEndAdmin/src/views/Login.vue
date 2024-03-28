<template>
    <div class="login">
        <h1 class="login__title">JDa Chef</h1>
        <div class="image">
            <img src="../assets/web-traffic.png" alt="">
        </div>
        <div class="form">
            <form action="" method="" @submit.prevent="handleSubmit">
                    <h1>TRANG QUẢN LÝ</h1>
                
                    <div class="login__info__item">
                        <i class="ri-user-line"></i>
                        <input type="text" v-model="phone" placeholder="Số điện thoại">
                    </div>
                    <div class="login__info__item">
                        <i class="ri-lock-line"></i>
                        <input type="password" v-model="password" placeholder="Mật khẩu">
                    </div>
                    <button class="m-1 btn btn-outline-warning">Đăng nhập</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            phone: '',
            password: '',
        }
    },
}
</script>

<style>
.login {
    height: 100vh;
    /* color: #fff; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    text-align: center;
    /* background: url("../assets/bg.png"); */
    width: 100vw;
    background-repeat: no-repeat;
    background-size: cover;
    background: linear-gradient(to right ,#000000, #333c3c);
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
}
.login .image {
    min-width: 50vw;
    /* background-color: #f8f8f9; */
    display: flex;
    position: relative;
}

.image img {
    max-height: 50%;
    max-width: 40%;
    margin: auto;
    /* background-color: #fff; */
    /* border: 30px solid #757575; */
    box-sizing: content-box;
    /* border-radius: 50%; */
    z-index: 1;
}

.image::before {
    content: "";
    position: absolute;
    color: #ffffff;
    min-width: 50%;
    height: 50%;
    top: -10%;
    left: 20%;
    background-color: #2f5185;
    background: url("../assets/data.png");
    background-size: contain;
}

.login .form h1{
    font-weight: 500;
    /* font-family: "Satisfy", cursive; */
    /* font-family: "Dancing Script", cursive; */
    /* color: rgb(0, 187, 84); */
    font-size: 2.5rem;
    /* text-align: start; */
    color: #fff;
    
}

.login .form {
    /* background-color: #fff; */
    /* border-radius: 20px; */
    padding: 10px 20px;
    /* box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; */
    /* border: 1px solid #6a6a6a; */
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
    background-color: #f8f8f80f;
    border-radius: 30px;
    border: 1px solid #f2f2f267;
    padding: 20px 20px;
    width: fit-content;
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
    color: #ffffff;
}

.login__info__item i {
    font-size: 1.8rem;
    color: #fff;
    margin-right: 15px;
}

.login__info__item input, textarea {
    width: 200px;
    border-radius: 15px;
    border: none;
    background-color: rgb(252, 230, 230);
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
