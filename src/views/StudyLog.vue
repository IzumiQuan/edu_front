<script setup>
import { ref, onBeforeMount } from 'vue'
import request from '@/utils/request.js'
let sc = ref({
  example: {
    name: "aaa"
  }
})
let courseInfo = ref([])
const parseTags = (tagString) => {
  try {
    return tagString ? JSON.parse(tagString) : [];
  } catch (e) {
    console.warn('tag 解析失败', tagString);
    return [];
  }
}
async function getcourseinfo(sc) {
  let res = await request.post("/select/query", sc.value)
  courseInfo.value = res.data.records
}

function handleClick(id) {
  router.push("/course/" + id)
}
onBeforeMount(() => {
  getcourseinfo(sc)
})
</script>

<template>
  <div class="page">
    <div class="course">
      <div class="course-item" v-for="course in courseInfo">
        <!-- 左侧图像区域 -->
        <div class="image-container">
          {{ course.image }}
        </div>

        <!-- 中间内容区域 -->
        <div class="content-container">
          <!-- 课程名称 -->
          <div class="course-title">
            {{ course.name }}
          </div>
          <!-- 课程标签 -->
          <span v-for="(tag, idx) in parseTags(course.tag)" :key="idx" class="tag-item">
            # {{ tag }}
          </span>
        </div>
        <!-- 右侧按钮区域 -->
        <div class="button-container">
          <el-button class="continue-learning-btn" @click="handleClick(course.id)">
            继续学习
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  background-color: white;
  width: 75%;
  margin: 10px 5px;
  padding: 25px 50px;
}

.course {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.course-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid rgba(240, 240, 240, 1);
}

.image-container {
  flex: 0 0 130px;
  height: 100px;
  background-color: #d3d3d3;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  border-radius: 5%;
}

.content-container {
  flex: 1;
}

.course-title {
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
}

.tag-item {
  font-size: 14px;
  color: #777;
}

.button-container {
  flex: 0 0 50px;
}

.exam-record-btn,
.continue-learning-btn {
  background-color: #555;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  margin-left: 8px;
  cursor: pointer;
}

.exam-record-btn:hover,
.continue-learning-btn:hover {
  background-color: #333;
}
</style>