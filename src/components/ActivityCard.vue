<script setup>
const props = defineProps({
  activity: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="activity-card">
    <div class="card-img">
      <!-- 这里可替换为实际活动图片 -->
      <div class="placeholder-img">PNG</div> 
    </div>
    <div class="card-content">
      <p class="activity-title">
        {{ activity.name }}
      </p>
      <div class="tags">
        <span 
          v-for="(tag, index) in JSON.parse(activity.tag)" 
          :key="index" 
          class="tag"
        >
          {{ tag }}
        </span>
      </div>
      <button class="报名-btn" @click="handleClick">报名</button>
    </div>
  </div>
</template>

<style scoped>
.activity-card {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.card-img {
  background-color: #ddd;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  margin-bottom: 12px;
  border-radius: 4px;
}
.placeholder-img {
  font-size: 14px;
}
.card-content {
  display: flex;
  flex-direction: column;
}
.activity-title {
  margin: 0;
  font-size: 14px;
  line-height: 1.4;
  margin-bottom: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  line-clamp: 3;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.tags {
  margin-bottom: 12px;
}
.tag {
  font-size: 12px;
  color: #666;
  background-color: #f5f5f5;
  padding: 4px 8px;
  border-radius: 4px;
  margin-right: 6px;
  margin-bottom: 6px;
  display: inline-block;
}
.报名-btn {
  align-self: flex-end;
  background-color: #666;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
.报名-btn:hover {
  background-color: #555;
}
</style>