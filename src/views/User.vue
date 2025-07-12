<script setup>
import AsideBar from '@/components/AsideBar.vue';

</script>

<template>
    <div>
        <AsideBar />
        <router-view></router-view>
    </div>
</template>

<style scoped>
div {
    display: flex;
    flex-direction: row;
}
</style>