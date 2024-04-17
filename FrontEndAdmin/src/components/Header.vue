<template>
    <div class="header">
        <div class="header__left"> JDa / {{ this.$route.name }}
            <p>{{ this.$route.name }}</p>
        </div>
        <div class="header__right">
            <div class="header__item header__notify">
                <i class="ri-notification-3-line"></i>
            </div>
            <div class="header__item header__user">
                <i class="ri-user-line"></i> 
            </div>
        </div>
    </div>
</template>
<style>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* background-color: aliceblue; */
}

.header__left {
    font-size: 0.9rem;
    color: #535353;
}

.header__left p {
    margin: 0;
    font-weight: 600;
    font-size: 1rem;
    color: #000000;
}

.header__right {
    /* background-color: #ffffff; */
    display: flex;
    justify-content: end;
    font-size: 1.1rem;
    align-items: center;
}

.header__item {
    margin-right: 10px;
    padding: 5px;
}

.header__notify, .header__user {
    background-color: rgb(196, 255, 199);
    border-radius: 50%;
    padding: 5px 9px;
}

</style>
