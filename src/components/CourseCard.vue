<script setup>
const props = defineProps({
  course: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="course-card">
    <div class="card-img">
      <div class="placeholder-img">PNG</div> 
    </div>
    <div class="card-content">
      <p class="course-title">
        {{ course.name }}
      </p>
      <div class="info">
        <div 
          v-for="(tag, index) in JSON.parse(course.tag)" 
          :key="index" 
          class="tag"
        >
          #{{ tag }}
        </div>
        <div class="price">￥{{ course.price.toFixed(2) }}</div>
      </div>
      <div class="info">
        <div class="tag">{{ course.classHour }}学时</div>
        <button class="purchase-btn">购买课程</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.course-card {
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
.course-title {
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
  display: flex;
  flex-direction: row;
}
.tag {
  font-size: 10px;
  color: #666;
  padding: 4px;
  margin-right: 6px;
  margin-bottom: 6px;
  flex: 1;
}
.price {
  color: #666;
  font-size: 18px;
  flex: 0 0 100px;
  text-align: right;
}
.purchase-btn {
  align-self: flex-end;
  background-color: #666;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
.purchase-btn:hover {
  background-color: #555;
}
</style>