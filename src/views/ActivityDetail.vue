<script setup>
import { ref } from 'vue';

// 模拟活动标签数据
const eventTags = ref(['活动标签', '活动标签', '活动标签']);
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
          <p>活动名称</p>
        </div>
        <div class="event-tags">
          <span v-for="(tag, index) in eventTags" :key="index"># {{ tag }}</span>
        </div>
        <div class="event-time">
          <span>2025-06-03 13:20:06 ~ 2026-06-03 13:20:06</span>
        </div>
        <div class="event-participant-count">
          <span>205已报名</span>
        </div>
        <div class="event-actions">
          <el-button type="primary" size="medium">报名参加</el-button>
        </div>
      </div>
    </div>
    <!-- 活动详情区域 -->
    <div class="event-details">
      <p class="event-description">
        活动详情，富文本Lenean euismod bibenduaes pulve montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.活动详情，富文本Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.活动详情，富文本Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.活动详情，富文本Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.
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
  background-color: #f9f9f9;
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
  background-color: #fff;
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