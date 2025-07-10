<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
let keyword = ref('')
let handleMessage = (value) => {
    keyword.value = value
}
</script>

<template>
    <div class="page">
        <NavBar @message="handleMessage" />
        <RouterView :keyword="keyword" />
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