<template>
    <div class="notification" @click="hideNotify" v-if="message == 'Thành công'"> 
        <div class="notification__message"><i class="fa-solid fa-circle-check"></i>
            <p>{{ message }}</p>
        </div>
    </div>
    <div class="notification notification--error" @click="hideNotify" v-if="message == 'Thất bại'"> 
        <div class="notification__message"><i class="fa-solid fa-circle-xmark"></i>
            <p>{{ message }}</p>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        message: String,
    },
    data() {
        return {
            
        }
    },
    methods: {
        hideNotify() {
            this.$router.push('/');
        },
    }
}
</script>
<style>
.notification {
    position: fixed;
    background-color: #00000072;
    border: 2px solid #000000;
    border-radius: 5px;
    height: 100vh;
    width: 100vw;
    color: #00a933;
    display: flex;
    opacity: 1;
    z-index: 1;
    transition: opacity 0.5s ease;;
}

.notification__message {
    margin: auto;
    margin-top: 15%;
    background-color: #ffffff;
    /* width: 200px;
    height: 120px; */
    padding: 30px 80px;
    text-align: center;
}
.notification__message i {
    font-size: 3rem;
}

.menu__category__button {
    display: none;
}

.notification--error {
    color: rgb(226, 21, 21);
}
</style>