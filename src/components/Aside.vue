<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
let router=useRouter()
function handleClick(path){
    router.push(path)
}

let itemlist=ref([
    {
        text:"基本信息",
        path:"/baseinfo"
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

<div class="item">
  <div v-for="item in itemlist" class="tag" @click="handleClick(item.path)">{{item.text}}</div>
</div>
</template>

<style scoped>
.item{
    background-color: white;
    display: flex;
    width:150px;
    flex-direction: column;
    margin: 120px 0 0 50px ;
}
.tag{
    flex: 1;
    margin-top: 30px;
    font-size: 14px;
    text-align: center;

}

.tag:hover{
    cursor: pointer;
}
.tag:active{
    opacity: 0.5;

}

</style>