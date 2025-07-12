<script setup>
import AsideBar from '@/components/AsideBar.vue';

</script>

<template>
    <div>
        <AsideBar />
        <router-view class="user"></router-view>
    </div>
</template>

<style scoped>
div {
    display: flex;
    flex-direction: row;
}
.user {
    min-height: 75vh;
}
</style>