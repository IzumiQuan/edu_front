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
      <el-image :src="activity.img" fit="cover" style="width: 100%; height: 100%;" />
    </div>
    <div class="card-content">
      <p class="activity-title">
        {{ activity.name }}
      </p>
      <div class="info">
        <span v-for="(tag, index) in JSON.parse(activity.tag)" :key="index" class="tag">
          #{{ tag }}
        </span>
      </div>
      <button class="enroll-btn">报名</button>
    </div>
  </div>
</template>

<style scoped>
.activity-card {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

.info {
  margin-bottom: 6px;
}

.tag {
  font-size: 10px;
  color: #666;
  padding: 4px;
  margin-right: 6px;
  margin-bottom: 6px;
}

.enroll-btn {
  align-self: flex-end;
  background-color: #666;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.enroll-btn:hover {
  background-color: #555;
}
</style>