<script setup>
import { query } from '@/api/activityApi';
import router from '@/router';
import { ref, watch } from 'vue';
import { onBeforeMount } from 'vue';

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
function handleActivity(activity) { 
  router.push("/activity/" + activity.id)
}

// 选中的日期
const selectedDate = ref(new Date());
// 模拟活动数据
const events = ref([
  {
    title: '活动主题',
    image: 'event-image-1.png'
  },
  {
    title: '活动主题',
    image: 'event-image-2.png'
  },
  {
    title: '活动主题',
    image: 'event-image-3.png'
  },
  {
    title: '活动主题',
    image: 'event-image-4.png'
  }
]);
</script>

<template>
  <div class="event-registration-container">
    <!-- 日历部分 -->
    <el-calendar v-model="selectedDate">
      <template #dateCell="{ date, data }">
        <div class="date-cell" :class="{ 'is-selected': data.isSelected }">
          <span class="date-number">{{ data.day.split('-').pop() }}</span>
          <span v-if="data.isSelected" class="selected-dot"></span>
        </div>
      </template>
    </el-calendar>
    <!-- 活动展示部分 -->
    <div class="event-display">
      <div class="event-item" v-for="(event, index) in events" :key="index">
        <div class="event-image">
          <div class="image-placeholder">PNG</div>
        </div>
        <div class="event-description">
          <p>{{ event.title }}</p>
        </div>
      </div>
    </div>
    <el-pagination background class="pag"
        layout="prev, pager, next" 
        :total="totalPage * searchCondition.pageSize"
        v-model:current-page="searchCondition.currentPage"
      />
  </div>
</template>

<style scoped>
.event-registration-container {
  width: 80%;
  margin: 0 auto;
}
.el-calendar {
  margin-bottom: 20px;
}
.date-cell {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 40px;
  height: 40px;
}
.is-selected {
  border: 1px solid #409eff;
  border-radius: 4px;
}
.date-number {
  color: #666;
}
.selected-dot {
  width: 8px;
  height: 8px;
  background-color: #409eff;
  border-radius: 50%;
  margin-top: 5px;
}
.event-display {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.event-item {
  width: calc(25% - 15px);
  background-color: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
}
.event-image {
  height: 200px;
  background-color: #d5d5d5;
  display: flex;
  justify-content: center;
  align-items: center;
}
.image-placeholder {
  width: 80%;
  height: 80%;
  color: #999;
}
.event-description {
  padding: 10px;
  text-align: center;
}
.pag {
  padding: 25px 0;
  justify-content: center;
}
</style>