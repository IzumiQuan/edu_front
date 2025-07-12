<script setup>
import { ref ,onBeforeMount} from 'vue';
import request from '@/utils/request';

const downloadAttachment = (attachment) => {
  window.open(attachment.downloadUrl, '_blank');
};

const activeName = ref('first');

const handleClick = (tab, event) => {
  console.log(tab, event);
};
let searchconditio1=ref({
  example:{
    name:"课程名称1"
  }
});
let searchcondition2=ref({
  example:{
    name:""
  }
});
let courseinfo=ref({})
let commentinfo=ref([])

async function queryclassinfo(searchcondition){
  let resp=await request.post("/api/course/query",searchcondition.value)
  courseinfo.value=resp.data.records[0]
}
async function querycomment(searchcondition){
  let resp=await request.post("/api/marking/query",searchcondition2.value)
  commentinfo.value=resp.data.records


}
onBeforeMount(()=>{
  queryclassinfo(searchconditio1)
  querycomment(searchcondition2)

})
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

</script>

<template>
  <div  class="course-details-score">
    <!-- 课程信息区域 -->
    <div class="course-info">
      <div class="course-image">
        <div class="image-placeholder">PNG</div>
      </div>                                                                                                                                                                                                                                                    
      <div class="course-meta">
        <div class="course-title">
          <p>课程名称:{{ courseinfo.name }}</p>
        </div>
        <div class="course-tags">
          <span v-for="(a, index) in courseinfo.tag ? JSON.parse(courseinfo.tag) : []" :key="index"># {{ a }}</span>
        </div>
        <div class="course-price">
          <span>价格为{{ courseinfo.price }}$</span>
        </div>

        <div class="course-student-count">
          <span>205已加入学习(查询人数接口)</span>
        </div>
        <div class="course-actions">
          <el-button type="primary" size="medium">开始学习</el-button>
        </div>
      </div>
    </div>
  </div>
  <el-tabs  v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="课程简介" name="first">
      <div>{{ courseinfo.intro }}</div>
    </el-tab-pane>
<el-tab-pane label="留言评分" name="second">
  <div class="course-comments">
    <div class="comment" v-for="(comment, index) in commentinfo" :key="index">
      <div class="comment-header">
        <img :src="comment.userAvatar" alt="用户头像" class="user-avatar" />
        <div class="user-info">
          <span class="user-name">{{ comment.name }}</span>
          <span class="user-rating">
            <el-rate
              v-model="comment.point"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            >
            </el-rate>
          </span>
        </div>
        <span class="comment-date">{{ comment.date }}</span>
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

</template>

<style scoped>
.item{
    display: flex;
    width: 200px;
    margin-left: 100px;

}
.tag{
    flex:1;
    font-size: 14px;
    user-select: none;

}
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
.tag:hover{
    cursor: pointer;
    text-decoration: underline black;
    opacity: 0.5;
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
        align-items: center; /* 垂直居中 */
        gap: 15px; /* 各元素之间的间隔 */
   }
.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ccc;
}
   .user-info {
        flex: 1; /* 占据剩余空间 */
        display: flex;
        flex-direction: column; /* 内部元素垂直排列 */
        justify-content: center; /* 垂直居中 */
   }
   .user-info .user-name {
        margin-bottom: 5px; /* 用户名和评分之间加点间距 */
   }
.user-rating {
  color: #f5a623;
}
   .comment-date {
        /* 日期放在最右边，我们可以使用margin-left:auto来推过去 */
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