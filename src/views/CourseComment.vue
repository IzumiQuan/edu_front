<script setup>
import { ref } from 'vue';

// 模拟课程标签数据
const courseTags = ref(['课程标签', '课程标签', '课程标签']);
// 模拟用户留言数据
const comments = ref([
  {
    userAvatar: 'https://via.placeholder.com/50', // 占位头像链接
    userName: '用户名称',
    rating: 5,
    date: '2025-07-12 12:35:36',
    content: '这是用户的一条评论，老师讲的好好啊'
  },
  {
    userAvatar: 'https://via.placeholder.com/50',
    userName: '用户名称',
    rating: 5,
    date: '2025-07-09 13:13:02',
    content: '这是用户的一条评论，老师讲的好好啊'
  }
]);
</script>

<template>
  <div class="course-details-score">
    <!-- 课程信息区域 -->
    <div class="course-info">
      <div class="course-image">
        <div class="image-placeholder">PNG</div>
      </div>
      <div class="course-meta">
        <div class="course-title">
          <p>课程名称</p>
        </div>
        <div class="course-tags">
          <span v-for="(tag, index) in courseTags" :key="index"># {{ tag }}</span>
        </div>
        <div class="course-price">
          <span>¥4.99</span>
        </div>
        <div class="course-student-count">
          <span>205已加入学习</span>
        </div>
        <div class="course-actions">
          <el-button type="primary" size="medium">免费试听</el-button>
        </div>
      </div>
    </div>
    <!-- 留言评分区域 -->
    <div class="course-comments">
      <div class="comment" v-for="(comment, index) in comments" :key="index">
        <div class="comment-header">
          <img :src="comment.userAvatar" alt="用户头像" class="user-avatar" />
          <div class="user-info">
            <span class="user-name">{{ comment.userName }}</span>
            <span class="user-rating">
              <el-rate :value="comment.rating" disabled />
            </span>
          </div>
          <span class="comment-date">{{ comment.date }}</span>
        </div>
        <div class="comment-content">
          <p>{{ comment.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.course-details-score {
  width: 80%;
  margin: 0 auto;
}
.course-info {
  display: flex;
  margin-bottom: 20px;
}
.course-image {
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
.course-meta {
  width: 60%;
  padding: 20px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.course-title p {
  margin: 0;
  color: #333;
  font-size: 16px;
}
.course-tags span {
  margin-right: 10px;
  color: #666;
  font-size: 14px;
}
.course-price span {
  color: #999;
  font-size: 20px;
}
.course-student-count span {
  color: #666;
  font-size: 14px;
}
.course-actions {
  margin-top: 20px;
}
.course-comments {
  background-color: #fff;
  padding: 20px;
}
.comment {
  border-bottom: 1px solid #eaeaea;
  padding-bottom: 20px;
  margin-bottom: 20px;
}
.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ccc;
}
.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}
.user-name {
  color: #333;
  font-size: 14px;
}
.user-rating {
  color: #f5a623;
}
.comment-date {
  color: #999;
  font-size: 12px;
}
.comment-content p {
  margin: 0;
  color: #333;
  font-size: 14px;
}
</style>