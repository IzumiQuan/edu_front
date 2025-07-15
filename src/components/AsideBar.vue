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
        path:"/user/study"
    },
    {
        text:"学习证书",
        path:"/user/cert"
    },
    {
        text:"报名记录",
        path:"/user/enroll"
    },
     {
        text:"我的会员",
        path:"/user/vip"
    },
     {
        text:"订单管理",
        path:"/user/order"
    },
     {
        text:"发票管理",
        path:"/user/bill"
    },
     {
        text:"联系我们",
        path:"/user/contact"
    },
     {
        text:"账号安全",
        path:"/user/safety"
    },
     {
        text:"系统设置",
        path:"/user/setting"
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
    max-height: 80vh;
    margin: 10px 5px 10px 50px;
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