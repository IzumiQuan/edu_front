<script setup>
import { ref, watch } from 'vue';
import { onBeforeMount } from 'vue';
import { query, set, remove } from '../api/activityApi.js';
const props = defineProps({
  id: { type: Number, required: true }
})
let event = ref({});
let searchCondition = ref({
  example: {
    id: props.id
  }
})
onBeforeMount(handleData)
watch(() => props.id), () => {
  handleData()
}
async function handleData() {
  let resp = await query(searchCondition.value)
  event.value = resp.data.records[0]
}
</script>

<template>
  <div class="get-involved-container">
    <!-- 活动信息区域 -->
    <div class="event-info">
      <div class="event-image">
        <div class="image-placeholder">PNG</div>
      </div>
      <div class="event-meta">
        <div class="event-title">
          <p>{{ event.name }}</p>
        </div>
        <div class="event-tags">
          <span v-for="(tag, index) in JSON.parse(event.tag)" :key="index"># {{ tag }}</span>
        </div>
        <div class="event-time">
          <span>{{ new Date(event.startTime).toLocaleString('zh-CN') }} ~ {{ new Date(event.endTime).toLocaleString('zh-CN') }}</span>
        </div>
        <div class="event-participant-count">
          <span>{{ event.attendeeNum }}人已报名</span>
        </div>
        <div class="event-actions">
          <el-button type="primary" size="medium">报名参加</el-button>
        </div>
      </div>
    </div>
    <!-- 活动详情区域 -->
    <div class="event-details">
      <p class="event-description">
        {{ event.intro }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.get-involved-container {
  width: 80%;
  margin: 0 auto;
}
.event-info {
  display: flex;
  margin-bottom: 20px;
}
.event-image {
  width: 40%;
  background-color: #e5e5e5;
  display: flex;
  justify-content: center;
  align-items: center;
}
.image-placeholder {
  width: 80%;
  height: 300px;
  background-color: #d5d5d5;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999;
}
.event-meta {
  width: 60%;
  padding: 20px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.event-title p {
  margin: 0;
  color: #333;
  font-size: 16px;
}
.event-tags span {
  margin-right: 10px;
  color: #666;
  font-size: 14px;
}
.event-time span {
  color: #666;
  font-size: 14px;
}
.event-participant-count span {
  color: #666;
  font-size: 14px;
}
.event-actions {
  margin-top: 20px;
}
.event-details {
  background-color: white;
  height: 40vh;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.event-description {
  line-height: 1.6;
  color: #333;
  font-size: 14px;
}
</style>