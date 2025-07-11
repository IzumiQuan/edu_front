<script setup>
import { query } from '@/api/classApi';
import { ref, watch } from 'vue';
import { onBeforeMount } from 'vue';

let name = defineProps({
    keyword: String
})

let totalPage = ref(1)

let searchCondition = ref({
  currentPage: 1,
  pageSize: 8,
  example: {
    name: '',
  },
  list: [],
  range: [],
  orderBy: '',
})

watch([() => searchCondition.value.currentPage], ([newVal, oldVal]) => {
  handleData()
})

onBeforeMount(handleData)

async function handleData(){
  let resp = await query(searchCondition.value)
  courses.value = resp.data.records
  console.log(resp.data)
  totalPage.value = resp.data.pages
  searchCondition.value.currentPage = resp.data.current
}

const subjects = ['语文学科', '数学学科', '英语学科', '中文学科', '电工电气', '数码产品'];
const classHour = ['1-5', '6-10', '11-15', '16-20'];
let courses = ref([])
</script>

<template>
  <div class="container">
    <!-- 主体内容 -->
    <el-main class="main">
      <!-- Banner区域 -->
      <div class="banner">
        <div class="banner-content">
          <img src="@/assets/logo.svg" alt="Banner">
        </div>
      </div>
      <!-- 专业方向和学时筛选区域 -->
      <div class="filter">
        <span>专业方向</span>
        <el-button v-for="(direction, index) in subjects" :key="index" type="text" size="small">
          {{ direction }}
        </el-button>
      </div>
      <div class="filter">
        <span>学时</span>
        <el-button v-for="(hours, index) in classHour" :key="index" type="text" size="small">
          {{ hours }}学时
        </el-button>
        <el-button type="text" size="small" class="sort-button">
          发布时间<el-icon></el-icon>
        </el-button>
      </div>
      <!-- 课程列表区域 -->
      <div class="course-list">
        <div class="course-item" v-for="(course, index) in courses" :key="index">
          <div class="course-image">
            <img src="@/assets/logo.svg" alt="课程图片">
          </div>
          <div class="course-info">
            <p class="course-title">{{ course.name }}</p>
            <p class="course-desc">{{ course.intro }}</p>
          </div>
        </div>
      </div>
      <el-pagination backgroud class="pag"
        layout="prev, pager, next" 
        :total="totalPage * searchCondition.pageSize"
        v-model:current-page="searchCondition.currentPage"
      />
    </el-main>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: #f5f5f5;
}
.logo img {
  height: 30px;
}
.nav {
  display: flex;
  gap: 20px;
}
.nav-item {
  text-decoration: none;
  color: inherit;
}
.search-bar {
  flex: 1;
  max-width: 300px;
}
.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}
.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.main {
  flex: 1;
  padding: 20px;
  background-color: #fff;
  overflow: auto;
}
.banner {
  height: 200px;
  background-color: #e5e5e5;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.banner-content img {
  max-height: 100%;
}
.filter {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}
.sort-button {
  margin-left: auto;
}
.course-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.course-item {
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
}
.course-image {
  height: 150px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.course-image img {
  max-height: 100%;
  max-width: 100%;
}
.course-info {
  font-size: 14px;
}
.course-title {
  margin-bottom: 5px;
}
.course-desc {
  color: #666;
}
.pag {
  justify-content: center;
}
</style>