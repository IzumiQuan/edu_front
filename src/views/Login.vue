<script setup>
import LoginPanel from '@/components/LoginPanel.vue'
</script>

<template>
    <div class="page">
        <LoginPanel class="login" />
    </div>
</template>

<style scoped>
.page {
    margin: 0;
    background-color: rgba(240, 240, 240, 1);
    width: 100%;
    min-height: 100vh;
}

.login {
    position: absolute;
    top: 10vh;
    left: 35%;
}
</style>