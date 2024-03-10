<script>
import AppHeader from "@/components/AppHeader.vue";

export default {
    components: {
        AppHeader,
    },

}
</script>

<template>
    <div class="container-fluid">
        <AppHeader />
        <div>
            <router-view />
        </div>
    </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;700&family=Noto+Sans+HK:wght@100..900&family=Oswald:wght@200&family=Pacifico&display=swap');

.container-fluid {
    font-family: "Noto Sans HK", sans-serif;
}
</style>
