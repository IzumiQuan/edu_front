<script setup>
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
</script>

<template>
    <div class="page">
        <NavBar />
        <RouterView />
    </div>
</template>

<style scoped>
.page {
    margin: 0;
    background-color: rgba(240, 240, 240, 1);
    width: 100%;
    min-height: 100vh;
}
</style>