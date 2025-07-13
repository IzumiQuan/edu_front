<script setup>
import { ref } from 'vue';

// 评分
const rating = ref(0);
// 评论内容
const comment = ref('');

// 提交评论方法
const submitComment = () => {
  // 这里添加提交评论的逻辑，比如发送到后端接口
  console.log('提交的评分为：', rating.value);
  console.log('提交的评论为：', comment.value);
  // 实际应用中，需要使用axios等工具发送数据到后端
  // 发送成功后可以清空输入框和评分
  rating.value = 0;
  comment.value = '';
}
</script>


<template>
  <div class="comments-container">
    <div class="rating-section">
      <span class="rating-label">打分</span>
      <el-rate v-model="rating" :disabled="false" :texts="['★', '★★', '★★★', '★★★★', '★★★★★']"></el-rate>
    </div>
    <div class="comment-section">
      <span class="comment-label">评论</span>
      <el-input type="textarea" v-model="comment" placeholder="请输入" :rows="5"></el-input>
    </div>
    <div class="submit-button">
      <el-button type="primary" :disabled="!rating ||!comment" @click="submitComment">确定</el-button>
    </div>
  </div>
</template>

<style scoped>
.comments-container {
  width: 300px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.rating-section {
  margin-bottom: 20px;
}
.rating-label {
  display: inline-block;
  margin-right: 10px;
  color: #333;
  font-size: 16px;
}
.comment-section {
  margin-bottom: 20px;
}
.comment-label {
  display: inline-block;
  margin-right: 10px;
  color: #333;
  font-size: 16px;
}
.submit-button {
  text-align: center;
}
</style>