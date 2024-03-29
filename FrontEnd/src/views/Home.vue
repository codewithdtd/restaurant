<template>
    <!-- <AppHeader /> -->
    <div class="home">
        <div class="home__one">
            <div class="home__one__element">
                <h1>Welcome to JDa Chef</h1>
                <p>Là nhà hàng lâu đời chúng tôi luôn xem trọng trải nghiệm của khách hàng, ở đây chúng tôi có nhiều món ăn ngon và hấp dẫn xin mời quý khách hàng cũng thưởng thức</p>
                <router-link to="/menu">
                    <button class="">Xem Menu</button>
                </router-link>
            </div>
        </div>
        <div class="home__two">
            <div class="home__two__left">
                    <img src="../assets/home1.jpg" alt="">
                    <img src="../assets/home2.jpg" alt="">
                    <img src="../assets/home3.jpg" alt="">
                    <img src="../assets/home4.jpg" alt="">
            </div>  
            <div class="home__two__right">
                <h2>Nhà hàng chúng tôi</h2>
                <p>
                    Thực đơn của nhà hàng vô cùng phong phú, với hơn 100 món ăn đa dạng, từ các món khai vị thanh đạm, món chính đậm đà cho đến các món tráng miệng ngọt ngào. Mỗi món ăn đều được chế biến tỉ mỉ, cầu kỳ, mang hương vị đặc trưng của từng vùng miền Trung Quốc.
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style>
.home__one {
    color: #fff;
    height:calc(100vh - 100px);
    max-width: 100%;
    /* background: #373737; */
    background: url('https://media.architecturaldigest.com/photos/6140c8b1e7f3368a585e1c58/16:9/w_2560%2Cc_limit/_SI_4383-Edit.jpg');    
    background-repeat: no-repeat;
    background-size: cover;
    text-align: center;
    /* align-items: center; */
}

.home__one__element {
    width: 100%;
    height: 100%;
    background-color: #00000084;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.home__one h1 {
    /* padding-top: 15%; */
    font-family: "Dancing Script", cursive;
    color: var(--color-main);
    font-size: 3rem;
    font-weight: 700;
    text-shadow: 0.1rem 0.1rem #414141;
}

.home__one p {
    width: 60%;
    /* margin: auto; */
    color: #ffffff;
    font-weight: 400;
    /* background-color: #00000059; */
    padding: 10px 0;
}
.home__one button {
    font-size: 1.1rem;
    border-radius: 10px;
    color: #282828;
    padding: 10px 50px;
    font-weight: 600;
    background-color: #d8cb11;
    border: none;
}
.home__one button:hover {
    background-color: #a0960f;
}


.home__two {
    color: #fff;
    height: calc(100vh - 100px);
    max-width: 100%;
    background: #1e1e1e;
    background-repeat: no-repeat;
    background-size: cover;
    text-align: center;
    display: flex;
    text-align: center;
    justify-content: center;
}

.home__two__right {
    /* font-size: 2rem; */
    margin: 20px 0;
    max-width: 50%;
    align-self: center;
    text-align: left;
}

.home__two__right h2 {
    /* font-family: "Dancing Script", cursive; */
    color: var(--color-main);
    /* font-size: 2rem; */
    font-weight: 500;
}

.home__two__right p {
    font-weight: 300;
}

.home__two__left {
    display: flex;
    max-height: fit-content;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    max-height: 100%;
} 
.home__two__left img {
   display: block;
   border-radius: 20px;
   max-height: 40%;
   margin: 10px;
}

@media screen and  (max-width: 1175px) {
    .home__two__left img { 
        max-height: 30%;
    }
}
</style>