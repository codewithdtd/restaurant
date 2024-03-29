<script>
import Navbar from './components/Navbar.vue';
import Login from './views/Login.vue';
export default {
    components: { Navbar, Login },
}
</script>

<template>
    <div id="app">
        <div>
            <Navbar />
        </div>
        <div>
            <router-view />
        </div>
        <!-- <Login /> -->
    </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;700&family=Noto+Sans+HK:wght@100..900&family=Oswald:wght@200&family=Pacifico&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap');

#app {
    padding: 0;
    font-family: "Work Sans", sans-serif;
    background: url(./assets/bg.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    padding: 0;
    --color-main: rgb(255, 224, 26);
    --color-background: rgb(37, 37, 37);
    display: flex;
}
</style>
