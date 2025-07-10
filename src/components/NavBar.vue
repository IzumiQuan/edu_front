<script setup>
import { ref } from 'vue'
let emit = defineEmits(['message'])
let keyword = ref('')
function search() {
    emit('message', keyword.value)
}
</script>

<template>
    <el-menu mode="horizontal" class="navbar">
        <el-menu-item index="0" class="item disabled" disabled>在线学习平台</el-menu-item>
        <el-menu-item index="1" class="item"><el-avatar></el-avatar>专属课程</el-menu-item>
        <el-menu-item index="2" class="item"><el-avatar></el-avatar>活动报名</el-menu-item>
        <el-menu-item index="3" class="input disabled" disabled>
            <el-input placehoder="搜索关键字" v-model="keyword" @change="search">
                <template #prepend>
                    <el-image style="display: flex;" fit="fill" src="https://cdn8.axureshop.com/demo2025/2328743/images/%E7%BB%A7%E7%BB%AD%E6%95%99%E8%82%B2/u285.svg"></el-image>
                </template>
            </el-input>
        </el-menu-item>
        <el-menu-item index="4" class="disabled" disabled>
            <el-dropdown>
                <div class="ddl" style="">
                    <el-avatar></el-avatar>
                    <div>张三</div>
                    <el-icon><arrow-down /></el-icon>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>个人中心</el-dropdown-item>
                        <el-dropdown-item>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </el-menu-item>
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
        font-size: 20px;
        font-weight: 900;
    }
    .item:nth-child(3) {
        margin-right: 25%;
    }
    .disabled {
        opacity: 1;
        cursor: default;
    }
    .navbar .input {
        background-color: rgba(240, 240, 240, 1);
        border-radius: 125px;
        --el-menu-item-height: 20px;
    }
    .navbar .ddl {
        display: flex;
        flex-direction: row;
        align-items: center;
        outline: none
    }
</style>