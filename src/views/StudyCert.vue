<script setup>
import { ref, onBeforeMount } from 'vue'
import request from '@/utils/request.js'
let sc = ref({
  example: {
    name: "aaa"
  }
})
let form = ref({

})
let courseInfo = ref([])
let link = ref("")
let certVisible = ref(false)
let formVisible = ref(false)

onBeforeMount(() => {
  getCourseInfo(sc)
})
async function getCourseInfo(sc) {
  let res = await request.post("/select/query", sc.value)
  courseInfo.value = res.data.records
}

function handleAction(course) {
  if (course.certLink) {
    link.value = course.certLink
    certVisible.value = true
  } else {
    formVisible.value = true
  }
}
</script>

<template>
  <div class="container">
    <div class="info-container" v-for="(course, index) in courseInfo" :key="index">
      <div>
        <div class="info-item">
          <span class="label">所属课程：</span>
          <span class="value">{{ course.name }}</span>
        </div>
        <div class="info-item">
          <span class="label">颁发时间：</span>
          <span class="value">{{ course.createDate ? new Date(course.createDate).toLocaleString('zh-CN') : '-' }}</span>
        </div>
      </div>
      <div class="button-container">
        <button class="action-btn" @click="handleAction(course)">
          {{ course.certLink ? '查看证书' : '申请' }}
        </button>
      </div>
    </div>
  </div>
  <el-dialog v-model="certVisible" title="查看证书" width="20%">
    <div class="cert">
      <el-image :src="link" alt="证书" />
    </div>
    <template #footer>
      <div style="display: flex;">
        <el-button type="primary" @click="certVisible = false" style="margin: 0 auto; width: 150px;">
          保存证书
        </el-button>
      </div>
    </template>
  </el-dialog>
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

.info-container {
  display: flex;
  padding: 20px;
  border-bottom: 1px solid #eaeaea;
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
  margin: auto 0;
}

.action-btn {
  background-color: #555;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.action-btn:hover {
  background-color: #333;
}
</style>