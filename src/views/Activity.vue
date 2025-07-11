<script setup>
import { query } from '@/api/activityApi';
import ActivityCard from '@/components/ActivityCard.vue';
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
    startTime: new Date(),
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

watch([() => searchCondition.value.example.startTime], ([newVal, oldVal]) => {
  handleData()
})

onBeforeMount(handleData)

async function handleData(){
  let resp = await query(searchCondition.value)
  events.value = resp.data.records
  totalPage.value = resp.data.pages
  searchCondition.value.currentPage = resp.data.current
}

let events = ref([])
function handleClick(id){
  router.push("/activity/" + id)
}
</script>

<template>
  <div class="event-registration-container">
    <!-- 日历部分 -->
    <el-calendar v-model="searchCondition.example.startTime">
      <template #dateCell="{ date, data }">
        <div class="date-cell" :class="{ 'is-selected': data.isSelected }">
          <span class="date-number">{{ data.day.split('-').pop() }}</span>
          <span v-if="data.isSelected" class="selected-dot"></span>
        </div>
      </template>
    </el-calendar>
    <!-- 活动展示部分 -->
    <div class="event-display">
      <ActivityCard v-for="(item, index) in events" :key="index" :activity="item" @click="handleClick(item.id)" class="event-item" />
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
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin: 0 75px;
}
.event-item {
  background-color: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
}
.pag {
  padding: 25px 0;
  justify-content: center;
}
</style>