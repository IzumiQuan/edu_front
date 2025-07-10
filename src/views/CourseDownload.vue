<script setup>
import { ref } from 'vue';

// 模拟课程标签数据
const courseTags = ref(['课程标签', '课程标签', '课程标签']);
// 模拟附件数据
const attachments = ref([
  {
    name: '附件名称',
    formatSize: 'PDF/206M',
    downloadUrl: 'https://example.com/attachment1.pdf' // 实际应替换为真实下载链接
  },
  {
    name: '附件名称',
    formatSize: 'PDF/176M',
    downloadUrl: 'https://example.com/attachment2.pdf'
  },
  {
    name: '附件名称',
    formatSize: 'PDF/87M',
    downloadUrl: 'https://example.com/attachment3.pdf'
  }
]);

const downloadAttachment = (attachment) => {
  // 实际应用中应处理文件下载逻辑，这里简单示例
  window.open(attachment.downloadUrl, '_blank');
};
</script>

<template>
  <div class="course-details-download">
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
        <div class="course-student-count">
          <span>245已加入学习</span>
        </div>
        <div class="course-actions">
          <el-button type="primary" size="medium">开始学习</el-button>
        </div>
        <div class="course-interaction">
          <el-icon class="comment-icon"></el-icon>
          <span>评论</span>
          <el-icon class="share-icon"></el-icon>
          <span>分享</span>
        </div>
      </div>
    </div>
    <!-- 附件下载区域 -->
    <div class="course-attachments">
      <el-table :data="attachments" border>
        <el-table-column prop="name" label="文件名称" />
        <el-table-column prop="formatSize" label="格式大小" />
        <el-table-column label="下载操作">
          <template #default="scope">
            <el-button type="text" @click="downloadAttachment(scope.row)">下载链接</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style scoped>
.course-details-download {
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
.course-student-count span {
  color: #666;
  font-size: 14px;
}
.course-actions {
  margin-top: 20px;
}
.course-interaction {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}
.comment-icon,
.share-icon {
  font-size: 18px;
  color: #666;
}
.course-attachments {
  background-color: #fff;
  padding: 20px;
}
</style>