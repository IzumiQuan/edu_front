<script setup>
import { ref, onBeforeMount } from 'vue'
import request from '@/utils/request'
let events = ref([])
let sc = ref({
    example: {
        name: '',
    }
})
async function getEvents() {
    let resp = await request.post('/enroll/query', sc.value)
    if (resp.code === 200) {
        events.value = resp.data.records
    }
}
onBeforeMount(() => {
    getEvents()
})
</script>

<template>
    <div class="container">
        <div class="item" v-for="(event, index) in events" :key="index">
            <div class="left">
                <div style="margin: 15px 0;">{{ event.activity }}</div>
                <div>活动时间：{{ new Date(event.activityDate).toLocaleString('zh-CN') }}</div>
                <div>报名时间：{{ new Date(event.createDate).toLocaleString('zh-CN') }}</div>
            </div>
            <div class="right">
                <div>已报名</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    background-color: white;
    width: 75%;
    margin: 10px 5px;
    padding: 25px 50px;
    display: flex;
    flex-direction: column;
}

.item {
    flex: 0 0 100px;
    padding: 15px;
    font-size: 13px;
    border-bottom: 1px solid rgba(230, 230, 230, 1);
    display: flex;
    flex-direction: row;
    align-items: center;
}

.left {
    flex: 0 0 200px;
}

.right {
    margin-left: auto;
}
</style>