<template>
    <div class="home">
        <h1>Welcome to JDa Chef</h1>
        <p>Là nhà hàng lâu đời chúng tôi luôn xem trọng trải nghiệm của khách hàng, ở đây chúng tôi có nhiều món ăn ngon và hấp dẫn xin mời quý khách hàng cũng thưởng thức</p>
        <router-link to="/menu">
            <button class="btn btn-outline-warning">Xem Menu</button>
        </router-link>
    </div>
</template>

<script>
export default {
    
}
</script>

<style>
.home {
    color: #fff;
    height: 100vh;
    /* background: #373737; */
    background: url("../assets/bg.jpg");    
    background-repeat: no-repeat;
    background-size: cover;
    text-align: center
    /* align-items: center; */
}
.home h1 {
    padding-top: 100px;
    font-family: "Dancing Script", cursive;
    color: var(--color-main);
    font-size: 2.7rem;
}

.home p {
    width: 60%;
    margin: auto;
    color: #ffffff;
    font-weight: 600;
    background-color: #00000059;
    padding: 10px 0;
}
.home button {
    font-size: 1.2rem;
    border-radius: 30px;
    padding: 10px 30px;
}
</style>