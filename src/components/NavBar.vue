<script setup>

</script>

<template>
    <el-menu mode="horizontal" class="navbar">
        <el-menu-item index="0" class="item" disabled>在线学习平台</el-menu-item>
        <el-menu-item index="1" class="item"><el-avatar></el-avatar>专属课程</el-menu-item>
        <el-menu-item index="2" class="item"><el-avatar></el-avatar>活动报名</el-menu-item>
        <el-menu-item index="3" class="item"><el-avatar></el-avatar>个人中心</el-menu-item>
        <el-menu-item index="4" class="input" disabled><el-input placehoder="搜索关键字"></el-input></el-menu-item>
    </el-menu>
</template>

<style scoped>
    .navbar {
        height: 75px;
    }
    .item {
        height: 100%;
        margin: 0 25px;
        font-size: 16px;
    }
    .item:nth-child(1) {
        opacity: 1;
        cursor: default;
        font-size: 20px;
        font-weight: 900;
    }
    .navbar .input {
        opacity: 1;
        cursor: default;
    }
</style>