<script setup>
import { ref, onBeforeMount } from 'vue'
import { ElNotification } from 'element-plus'
import { query } from '../api/activityApi.js'
import request from '@/utils/request.js'
const props = defineProps({
  id: { type: Number, required: true }
})
let event = ref({})
let searchCondition = ref({
  example: {
    id: props.id
  }
})
let form = ref({
  name: '',
  tel: '',
  sex: '男',
})
let showForm = ref(false)
onBeforeMount(handleData)
async function handleData() {
  let resp = await query(searchCondition.value)
  event.value = resp.data.records[0]
}

function handleClick() {
  showForm.value = true
}

async function handleSubmit() {
  form.value.activity = event.value.name
  form.value.activityDate = event.value.startTime
  let resp = await request.post("enroll/add", form.value)
  if (resp.code == 200) {
    ElNotification({
      title: 'Success',
      message: '报名成功',
      type: 'success',
    })
  } else {
    ElNotification({
      title: 'Error',
      message: '无法连接服务器',
      type: 'error',
    })
  }
  form.value.name = ''
  form.value.tel = ''
  showForm.value = false
}
</script>

<template>
  <div class="get-involved-container">
    <!-- 活动信息区域 -->
    <div class="event-info">
      <div class="event-image">
        <el-image :src="event.img" fit="cover" class="image" />
      </div>
      <div class="event-meta">
        <div class="event-title">
          <p>{{ event.name }}</p>
        </div>
        <div class="event-tags">
          <span v-for="(tag, index) in JSON.parse(event.tag)" :key="index"># {{ tag }}</span>
        </div>
        <div class="event-time">
          <span>{{ new Date(event.startTime).toLocaleString('zh-CN') }} ~ {{ new
            Date(event.endTime).toLocaleString('zh-CN') }}</span>
        </div>
        <div class="event-participant-count">
          <span>{{ event.attendeeNum }}人已报名</span>
        </div>
        <div class="event-actions">
          <el-button type="primary" size="medium" @click="handleClick">报名参加</el-button>
        </div>
      </div>
    </div>
    <!-- 活动详情区域 -->
    <el-card class="event-details">
      <p class="event-description">
        {{ event.intro }}
      </p>
    </el-card>
  </div>
  <el-dialog v-model="showForm" title="报名" width="450px" draggable>
    <el-form v-model="form" label-width="auto" style="max-width: 450px" class="form">
      <el-form-item label="姓名">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="form.tel" />
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.sex">
          <el-radio value="男">男</el-radio>
          <el-radio value="女">女</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer" style="display: flex;">
        <el-button type="primary" @click="handleSubmit" class="btn">
          报名
        </el-button>
      </div>
    </template>
  </el-dialog>
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

.image {
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
  background-color: white;
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
  background-color: white;
  height: 40vh;
  padding: 20px;
  border-radius: 8px;
}

.event-description {
  line-height: 1.6;
  color: #333;
  font-size: 14px;
}

.form {
  margin: 25px 50px;
}

.btn {
  flex: 0 0 200px;
  margin: 0 auto;
  background-color: black;
  border: 0px;
}
</style>