<script setup>
import { ref, watch } from 'vue';
import { onBeforeMount } from 'vue';
import { query } from '@/api/courseApi';
import router from '@/router';
import CourseCard from '@/components/CourseCard.vue';

const props = defineProps({
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
  sort: 'asc',
})

watch(() => props.keyword,
  (newKeyword) => {
    searchCondition.value.example.name = newKeyword
    handleData()
  }
)

watch([() => searchCondition.value.currentPage], ([newVal, oldVal]) => {
  handleData()
})

onBeforeMount(handleData)

async function handleData(){
  let resp = await query(searchCondition.value)
  courses.value = resp.data.records
  totalPage.value = resp.data.pages
  searchCondition.value.currentPage = resp.data.current
}
function handleCourse(course) { 
  router.push("/course/" + course.id)
}
function handleSort(){
  if(searchCondition.value.sort=== "asc"){
    searchCondition.value.sort = "desc"
  }else if(searchCondition.value.sort === "desc"){
    searchCondition.value.sort= "asc"
  }
  handleData()
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
        <el-image src="https://cdn8.axureshop.com/wp-content/uploads/2025/06/110646-111057790415-722x361.png" alt="Banner" fit="cover" class="banner-content"/>
      </div>
      <!-- 专业方向和学时筛选区域 -->
      <div class="filter">
        <div>
          <div class="filter-item">
            <div class="title">专业方向</div>
            <el-checkbox-group type="text" v-model="searchCondition.list">
              <el-checkbox-button v-for="(direction, index) in subjects" :key="index" :value="direction" @change="handleData">{{ direction }}</el-checkbox-button>
            </el-checkbox-group>
          </div>
          <div class="filter-item"> 
            <div class="title">学时</div>
            <el-checkbox-group type="text" v-model="searchCondition.range">
              <el-checkbox-button v-for="(hours, index) in classHour" :key="index" :value="hours" @change="handleData">{{ hours }}学时</el-checkbox-button>
            </el-checkbox-group>
          </div>
        </div>
        <div>
          <el-button type="text" size="small" class="sort-button" @click="handleSort">
            发布时间<el-icon><ArrowUp v-if="searchCondition.sort==='asc'"/><ArrowDown v-else-if="searchCondition.sort==='desc'"/></el-icon>
          </el-button>
        </div>
      </div>
      <!-- 课程列表区域 -->
      <div class="course-list" v-loading="courses.length === 0">
        <CourseCard v-for="(item, index) in courses" :key="index" :course="item" @click="handleCourse(item)" class="course-item" />
      </div>
      <el-pagination background class="pag"
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
.main {
  flex: 1;
  padding: 20px;
  background-color: rgba(240, 240, 240, 1);
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
.banner-content {
  max-height: 100%;
}
.filter {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
  padding: 20px;
  align-items: center;
  background-color: white;
}
.filter-item { 
  display: flex;
  margin: 10px 0;
}
.filter-item .title{ 
  font-size: 14px;
  flex: 0 0 75px;
  align-self: center;
}
.sort-button {
  flex: 0 0 200px;
  margin-left: 100vh;
}
.course-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin: 0 100px;
}
.course-item {
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}
.pag {
  padding: 25px 0;
  justify-content: center;
}
</style>