<script setup>
import { ref, onBeforeMount } from 'vue'
import request from '@/utils/request.js'
import router from '@/router'
let sc = ref({
  example: {
    name: "aaa"
  }
})

let courseInfo = ref([])

onBeforeMount(() => {
  getCourseInfo(sc)
})
async function getCourseInfo(sc) {
  let res = await request.post("/select/query", sc.value)
  courseInfo.value = res.data.records;
}

function handleAction(course) {
  if (course.createDate) {
    router.push()
  } else {
    router.push()
  }
}
</script>

<template>
  <div class="info-container" v-for="(course, index) in courseInfo" :key="index">

    <div class="info-item">
      <span class="label">所属课程：</span>
      <span class="value">{{ course.name }}</span>
    </div>

    <div class="info-item">
      <span class="label">颁发时间：</span>
      <span class="value">{{ course.createDate || '-' }}</span>
    </div>

    <div class="button-container">
      <button class="action-btn" @click="handleAction(course)">
        {{ course.createDate ? '查看证书' : '申请' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.info-container {
  padding: 20px;
  border-bottom: 1px solid #eaeaea;
  display: flex;
  justify-content: space-between; 
  align-items: flex-start; 
}

.info-item {
  margin-bottom: 10px; 
  font-size: 16px;
  color: #333;
}

.label {
  font-weight: bold;
  display: inline-block; 
  min-width: 80px; 
}

.value {
  margin-left: 5px;
  color: #666;
  display: inline-block; 
}

.button-container {
  display: flex;
  align-items: center;
}

.action-btn {
  background-color: #555;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.action-btn:hover {
  background-color: #333;
}
</style>