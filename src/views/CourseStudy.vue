<script setup>
import { ref, onMounted } from "vue";
import CourseCard from "../components/CourseCard.vue";
import { query as queryCourse } from "../api/courseApi.js";
import{  query as queryComment } from "../api/markingApi.js" ;
import router from "@/router";
let activeTab = ref("comments");
let dialogVisible = ref(false)
let sc=ref({
    pageSize:4,
})
let user=ref(JSON.parse(sessionStorage.getItem("user")))
const checkvip=user.value.vipEndTime?true:false
let courses=ref([]) 
let comments=ref([])
function goToPurchase() {

  router.push('/purchase')
}
 async function handleCourse(sc){
    let resp=await queryCourse(sc.value)
    courses.value=resp.data.records
}
async function getComment(sc) {
    let resp=await queryComment(sc.value)
    comments.value=resp.data.records
    
}

onMounted(()=>{
     if (!checkvip) {
    dialogVisible.value = true
  }
    handleCourse(sc)
    getComment({})
})
</script>

<template>
  <div class="main-container">
    <!-- 左侧：视频播放区 -->
    <div class="video-area">
      <video ref="videoPlayer" controls>
        <source src="https://vip.zykbf.com/?url=https://cdn1.vip-yzzyonline.com/20231007/1894_5757d2a3/index.m3u8" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <!-- 提示框 -->
      <el-dialog v-model="dialogVisible" title="提示" width="20%">
        <span>此课程为付费课程，请购买课程后继续学习</span>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消学习</el-button>
            <el-button type="primary" @click="goToPurchase">前往购买</el-button>
          </span>
        </template>
      </el-dialog>
    </div>

    <!-- 右侧：推荐课程区 -->
    <div class="recommend-area">
      <h3>推荐相似课程</h3>
      <div class="recommend-grid">
        <CourseCard v-for="course in courses" :key="course.id" :course="course" />
      </div>
    </div>

    <!-- 底部：评论区 -->
    <div class="comment-area">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="留言评分" name="comments">
          <div class="course-comments">
            <div class="comment" v-for="(comment, index) in comments" :key="index">
              <div class="comment-header">
                <img :src="comment.avatar" alt="用户头像" class="user-avatar" />
                <div class="user-info">
                  <span class="user-name">{{ comment.name }}</span>
                  <span class="user-rating">
                    <el-rate v-model="comment.point" disabled show-score text-color="#ff9900" score-template="{value}">
                    </el-rate>
                  </span>
                </div>
                <span class="comment-date">{{ new Date(comment.date).toLocaleString('zh-CN') }}</span>
              </div>
              <div class="comment-content">
                <p>{{ comment.content }}</p>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;
  padding: 16px;
}

.video-area {
  background-color: #f5f5f5;
  padding: 16px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* 视频内容顶部对齐 */
  min-height: fit-content;     /* 不撑开多余高度 */
}

.recommend-area {
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  height: 61vh; /* 填满高度 */
}

.comment-area {
  grid-column: 1 / span 2; /* 横跨两列，占满整行 */
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
}

/* 视频播放器样式 */
video {
  width: 100%;
  height: auto;
}

/* 推荐课程卡片样式 */
.course-card {
  margin-bottom: 16px;
  height: auto ;
}

/* 评论区样式 */
.comment-item {
  margin-bottom: 16px;
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
}
.recommend-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  height: 100%;
  overflow-y: auto;
  flex: 1;
}
.course-comments {
  background-color: white;
  padding: 20px;
}

.comment {
  border-bottom: 1px solid #eaeaea;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 15px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ccc;
}

.user-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.user-info .user-name {
  margin-bottom: 5px;
}

.user-rating {
  color: #f5a623;
}

.comment-date {
  margin-left: auto;
}

.comment-content p {
  margin: 0;
  color: #333;
  font-size: 14px;
}



</style>