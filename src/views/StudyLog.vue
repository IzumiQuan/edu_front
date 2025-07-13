<script setup>
import { ref, onBeforeMount } from 'vue'
import request from '@/utils/request.js';
const parseTags = (tagString) => {
  try {
    return tagString ? JSON.parse(tagString) : [];
  } catch (e) {
    console.warn('tag 解析失败', tagString);
    return [];
  }
};
async function getcourseinfo(searcondition){
    let res = await request.post("/select/query",searcondition.value)
    courseinfo.value = res.data.records

}
onBeforeMount(()=>{
    getcourseinfo(searcondition)
})
let searcondition = ref({
    example:{
        name: "aaa"
    }
})
let courseinfo = ref([])
</script>

<template>
<div class="page">
 <div class="course-item" v-for="course in courseinfo" >
    <!-- 左侧图像区域 -->
    <div class="image-container">
     {{course.image}}
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
      <button class="exam-record-btn">
        考试记录
      </button>
      <button class="continue-learning-btn">
        继续学习
      </button>
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
  min-height: 100vh;
}
.course-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #eaeaea;
}

.image-container {
  width: 130px;
  height: 100px;
  background-color: #d3d3d3;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  border-radius: 5%;
}

.content-container {
  flex-grow: 1;
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
  display: flex;
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