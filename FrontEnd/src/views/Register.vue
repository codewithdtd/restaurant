<template>
    <div class="register">
        <form action="" method="" @submit.prevent="handleSubmit" >
            <div v-if="register" class="alert alert-success">
                Thành công
            </div>
            <h1>Đăng Ký</h1>
            <div class="register__info ">
                <div class="register__info__item">
                    <label for="" class="">Họ Tên:</label>
                    <input type="text" v-model="name">
                </div>
                <div class="register__info__item">
                    <label for="" class="">Số điện thoại:</label>
                    <input type="text" v-model="phone">
                </div>
            </div>
            <div class="register__info ">
                <div class="register__info__item">
                    <label for="" class="">Mật khẩu:</label>
                    <input type="password" v-model="password">
                </div>
                <div class="register__info__item">
                    <label for="" class="">Xác nhận mật khẩu:</label>
                    <input type="password" v-model="password_comfirm">
                </div>
            </div>
            <div class="register__info register__info__item">
                <label for="">Email (Nếu có):</label>
                <input type="text" v-model="email">
            </div>
            <div class="register__info register__info__item">    
                <label for="">Địa chỉ:</label>
                <textarea name="" id="" cols="30" rows="3" v-model="address"></textarea>
            </div>
          
            <p class="m-1">
                Bạn đã có tài khoản?
                <router-link to="/login">Đăng nhập</router-link>
            </p>
            
          
            <button class="m-1 btn btn-outline-warning">Đăng ký</button>
        </form>
    </div>
</template>

<script>
import userService from '@/services/user.service'

export default {
    methods: {
        async handleSubmit() {
            const data = {
                name: this.name,
                phone: this.phone,
                password: this.password,
                email: this.email,
                address:this.address,
            }
            console.log(data);

            try {
                this.register = await userService.register(data);
                    this.message = "thành công.";
            } catch (error) {
                console.log(error);
            }

        }
    },
    data() {
        return {
            name: '',
            phone: '',
            password: '',
            password_comfirm: '',
            email: '',
            address:'',
            register: null,
        }
    }
}
</script>

<style>
.register {
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    background: url('../assets/bg.jpg');
}

.register h1{
    font-weight: 700;
    /* font-family: "Satisfy", cursive; */
    font-family: "Dancing Script", cursive;
    color: rgb(255, 224, 26);
    font-size: 2.5rem;
    
}

.register form {
    /* background-color: rgba(255, 255, 255, 0.208); */
    background-color: rgba(0, 0, 0, 0.589);
    border-radius: 40px;
    padding: 10px 20px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border: 1px solid #6a6a6a;
    color: #fff;
}

.register__info {
    display: flex;
    margin-bottom: 10px;
}

.register__info__item {
    display: flex;
    flex-direction: column;
    align-items: start;
    margin: 0 10px;
    color: #fff;
}

.register__info__item input, textarea {
    width: 100%;
    border-radius: 15px;
    border: none;
    background-color: rgb(255, 255, 255);
    font-size: 1.2rem;
    padding-left: 10px;
}

.register form a {
    color: rgb(255, 224, 26);
}

</style>
