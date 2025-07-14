<script setup>
import { ref, onBeforeMount } from 'vue';
import { ElNotification } from 'element-plus'
import { query as queryCourse } from '../api/courseApi.js'
import { query as queryMarking, add as addMarking } from '../api/markingApi.js'
const props = defineProps({
  id: { type: Number, required: true }
})
const colors = ref(['#99A9BF', '#F7BA2A', '#FF9900'])
const downloadAttachment = (attachment) => {
  window.open(attachment.downloadUrl, '_blank')
}

let user = ref(JSON.parse(sessionStorage.getItem('user')))
let activeName = ref('first')
let dialogVisible = ref(false)
let form = ref({
  name: user.value.name,
  point: 0,
  content: '',
  avatar: user.value.avatar,
})

let scCourse = ref({
  example: {
    id: props.id,
  }
})
let scMarking = ref({
  example: {
    id: null,
  }
});
let courseInfo = ref({})
let markingInfo = ref([])
async function handleData(sc) {
  let resp = await queryCourse(sc.value)
  courseInfo.value = resp.data.records[0]
}
async function handleMarking(sc) {
  let resp = await queryMarking(sc.value)
  markingInfo.value = resp.data.records
}
async function handleSubmit() {
  try {
    let resp = await addMarking(form.value)
    if (resp.code == 200) {
      ElNotification({
        title: 'Success',
        message: '评论发布成功',
        type: 'success',
      })
      handleMarking(scMarking.value)
      form.point = 0
      form.content = ''
      dialogVisible.value = false
    } else {
      ElNotification({
        title: 'Error',
        message: resp.msg,
        type: 'error',
      })
    }
  } catch (e) {
    ElNotification({
      title: 'Error',
      message: '无法连接服务器',
      type: 'error',
    })
  }
}
async function share() {
  try {
    await navigator.clipboard.writeText(window.location.href)
  } catch (e) {
    ElNotification({
      title: 'Error',
      message: '复制到剪贴板失败',
      type: 'error',
    })
    return
  }
  ElNotification({
    title: 'Success',
    message: '已复制到剪贴板',
    type: 'success',
  })
}
function handleClick() {
  
}
onBeforeMount(() => {
  handleData(scCourse)
  handleMarking(scMarking)
})
const attachments = ref([
  {
    name: '附件名称',
    formatSize: 'PDF/206M',
    downloadUrl: 'https://example.com/attachment1.pdf'
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
])
</script>

<template>
  <div class="course-details-score">
    <!-- 课程信息区域 -->
    <div class="course-info">
      <div class="course-image">
        <el-image :src="courseInfo.img" fit="cover" class="image" />
      </div>
      <div class="course-meta">
        <div class="course-title">
          <p>{{ courseInfo.name }}</p>
        </div>
        <div class="course-tags">
          <span v-for="(item, index) in courseInfo.tag ? JSON.parse(courseInfo.tag) : []" :key="index"># {{ item
          }}</span>
        </div>
        <div class="course-price">
          <span>￥{{ courseInfo.price }}</span>
        </div>
        <div class="course-student-count">
          <span>{{ courseInfo.classHour }}学时 {{ courseInfo.learnerNum }}人已加入学习</span>
        </div>
        <div class="course-actions">
          <el-button type="primary" size="medium" class="btn" @click="handleClick">开始学习</el-button>
          <el-button type="primary" size="medium" class="btn" v-if="courseInfo.examId !== null">开始考试</el-button>
          <div class="link">
            <el-link @click="dialogVisible = true"><el-image
                src="https://cdn8.axureshop.com/demo2025/2328743/images/%E8%AF%BE%E7%A8%8B%E8%AF%A6%E6%83%85/u431.svg"
                alt="评论" class="link" />评论</el-link>
            <el-link @click="share"><el-image
                src="https://cdn8.axureshop.com/demo2025/2328743/images/%E8%AF%BE%E7%A8%8B%E8%AF%A6%E6%83%85/u330.svg"
                alt="分享" class="link" />分享</el-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
    <el-tab-pane label="课程简介" name="first">
      <div>{{ courseInfo.intro }}</div>
    </el-tab-pane>
    <el-tab-pane label="留言评分" name="second">
      <div class="course-comments">
        <div class="comment" v-for="(comment, index) in markingInfo" :key="index">
          <div class="comment-header">
            <img :src="comment.avatar" alt="用户头像" class="user-avatar" />
            <div class="user-info">
              <span class="user-name">{{ comment.name }}</span>
              <span class="user-rating">
                <el-rate v-model="comment.point" disabled show-score text-color="#ff9900" score-template="{value}">
                </el-rate>
              </span>
            </div>
            <span class="comment-date">{{ new Date(comment.date ).toLocaleString('zh-CN') }}</span>
          </div>
          <div class="comment-content">
            <p>{{ comment.content }}</p>
          </div>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="附件下载" name="third">
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
    </el-tab-pane>
  </el-tabs>
  <el-dialog v-model="dialogVisible" width="350">
    <el-form :model="form">
      <el-form-item label="评分">
        <el-rate v-model="form.point" :colors="colors" clearable />
      </el-form-item>
      <el-form-item label="评论" label-position="top">
        <el-input v-model="form.content" type="textarea" maxlength="150" placeholder="请输入内容" clearable show-word-limit
          :autosize="{ minRows: 5, maxRows: 5 }" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer" style="display: flex;">
        <el-button type="primary" @click="handleSubmit" class="btn">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.item {
  display: flex;
  width: 200px;
  margin-left: 100px;
}

.tag {
  flex: 1;
  font-size: 14px;
  user-select: none;
}

.course-details-score {
  width: 80%;
  margin: 0 auto;
}

.course-info {
  display: flex;
  border-bottom: 2px solid rgba(240, 240, 240, 1);
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
  background-color: white;
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
  display: flex;
  gap: 10px;
}

.btn {
  background-color: rgba(100, 100, 100, 1);
  border: 0;
}

.link {
  margin-left: auto;
  display: flex;
  gap: 10px;
}

.link-icon {
  height: 16px;
  width: 16px;
}

.tag:hover {
  cursor: pointer;
  text-decoration: underline black;
  opacity: 0.5;
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

.course-details-download {
  width: 80%;
  margin: 0 auto;
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

.tabs {
  width: 80%;
  margin: 0 auto;
  background-color: white;
  min-height: 50vh;
}

.btn {
  margin: 0px auto;
  flex: 0 0 100px;
  background-color: black;
  border: 0px;
}
</style>