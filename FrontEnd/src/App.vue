<script>
import AppHeader from "@/components/AppHeader.vue";

export default {
    components: {
        AppHeader,
    },

}
</script>

<template>
    <div id="app" class="container-fluid">

        <AppHeader />
        <div>
            <router-view />
        </div>
    </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;700&family=Noto+Sans+HK:wght@100..900&family=Oswald:wght@200&family=Pacifico&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap');

#app {
    /* font-family: "Noto Sans HK", sans-serif; */
    font-family: "Work Sans", sans-serif;
    background: url(./assets/background.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    padding: 0;
    --color-main: rgb(255, 224, 26);
    --color-background: #4d4d4d;
}

</style>
