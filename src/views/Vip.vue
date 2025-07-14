<script setup>
import { ref, onBeforeMount } from 'vue'
import CourseCard from '@/components/CourseCard.vue'
import { query } from '@/api/courseApi.js'
import router from '@/router'
let user =  ref(JSON.parse(sessionStorage.getItem('user')))
let course = ref([])
let sc = ref({
  pageSize: 12,
  example: {
    name: null,
  }
})
onBeforeMount(() => {
  handleData()
})
async function handleData() {
  let resp = await query(sc.value)
  if (resp.code === 200) {
    course.value = resp.data.records
  }
}

function handleCourse(course) { 
  router.push("/course/" + course.id)
}
</script>

<template>
  <div class="user-page">
    <main class="main-content">
      <div class="user-card">
        <div class="card-header">
          <h3 style="font-size: 14px;text-align: center;">{{ user.name }}的学习卡</h3>
        </div>
        <div class="card-body">
          <p style="font-size: 12px;text-align: center;">剩余<span style="font-size: 18px;font-weight: 500;">{{ user.classHour }}</span>学时</p>
          <div style="display: flex;"><button @click="handleRecharge" class="btn">充值</button></div>
          <p style="font-size: 11px;text-align: center;">VIP有效期至{{ new Date(user.vipEndTime).toLocaleString('zh-CN') }}</p>
        </div>
      </div>
      <!-- 课程列表区域 -->
      <div class="course-container">
        <div class="course-grid">
          <CourseCard v-for="(item, index) in course" :key="index" :course="item" @click="handleCourse(item)" class="course-item" />
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.user-page {
  background-color: white;
  width: 75%;
  margin: 10px 5px;
  padding: 25px 50px;
}

.main-content {
  width: 100%; 
  padding: 20px;
  box-sizing: border-box; 
  display: flex;
  flex-direction: column;
}

.user-card {
  background-color: rgba(170, 170, 170, 1); 
  border: 0px;
  border-radius: 8px;
  margin: 0 auto 25px 0;
  padding: 10px 25px;
  width: 300px;
}

.card-header {
  margin-bottom: 15px;
}

.card-body p {
  margin-bottom: 10px;
}

.card-body button {
  background-color: rgba(100, 100, 100, 1);
  color: white;
  border: none;
  padding: 8px 16px;
  margin: 0 auto;
  border-radius: 40px;
  font-size: 13px;
  width: 125px;
  height: 40px;
  cursor: pointer;
}

.course-container {
  border-top: 1px solid #e9ecef;
  padding: 20px;
  flex: 1;
}

.course-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.course-item {
  border: 1px solid #e9ecef;
  border-radius: 8px;
  overflow: hidden;
  background-color: white; 
  cursor: pointer;
}
</style>