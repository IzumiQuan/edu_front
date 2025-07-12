<script setup>
import { ref } from 'vue'
import router from '@/router';
function handleClick(path){
    router.push(path)
}

let itemlist=ref([
    {
        text:"基本信息",
        path:"/user/info"
    },

    {
        text:"学习记录",
        path:"/studylog"
    },
    {
        text:"学习证书",
        path:"/certificate"
    },
    {
        text:"报名记录",
        path:"/submitlog"
    },
    {
        text:"我的学习卡",
        path:"/studycard"

    },
     {
        text:"我的会员",
        path:"/vip"

    },
     {
        text:"订单管理",
        path:"/order"

    },
     {
        text:"发票管理",
        path:"/receiptmannager"

    },
     {
        text:"联系我们",
        path:"/context"

    },
     {
        text:"账号安全",
        path:"/safety"

    },
     {
        text:"系统设置",
        path:"setting"

    },
])
</script>

<template>

<div class="list">
  <div v-for="item in itemlist" class="item" @click="handleClick(item.path)">{{item.text}}</div>
</div>
</template>

<style scoped>
.list {
    background-color: white;
    display: flex;
    width: 100px;
    flex-direction: column;
    min-height: 80vh;
    margin: 10px 5px 10px 100px;
    padding: 25px 50px;
}
.item {
    flex: 1;
    font-size: 14px;
    text-align: center;
}

.item:hover{
    cursor: pointer;
}
.item:active{
    opacity: 0.5;
}

</style>