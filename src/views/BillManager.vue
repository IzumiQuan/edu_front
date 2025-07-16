<script setup>
import { ref, onBeforeMount } from 'vue'
import { ElNotification } from 'element-plus'
import request from '@/utils/request.js'
let sc = ref({
  example: {
    status: ''
  }
})
let bill = ref([])
let list = ref([])
async function getbill(sc) {
  let resp = await request.post("/bill/query", sc.value)
  bill.value = resp.data.records
}

async function handleBill() {
  let total = list.value.length
  let count = 0
  for (let item of list.value) {
    item.status = '已开发票'
    let resp = await request.post("/bill/reset", item)
    if (resp.code == 200) {
      count++
    }
  }
  ElNotification({
    title: 'Info',
    message: '开票成功：' + count + ' 失败：' + (total - count),
    type: 'info',
  })
  getbill(sc)
}

onBeforeMount(() => {
  getbill(sc)
})

// 定义标签页选项
const tabs = ['可开发票', '已开发票']

// 当前选中的标签页
const currentTab = ref('可开发票')

// 切换标签页的函数
const changeTab = (tab) => {
  currentTab.value = tab
}
</script>

<template>
  <div class="tab-container">
    <!-- 标签页导航 -->
    <div class="tab-nav">
      <span v-for="(tab, index) in tabs" :key="index" :class="['tab-item', { active: currentTab === tab }]"
        @click="changeTab(tab)">
        {{ tab }}
      </span>
    </div>
    <div class="tab-content">
      <el-checkbox-group v-model="list">
        <div v-for="(bill, index) in bill" :key="index">
          <div v-if="bill.status === currentTab" class="order-container">
            <div class="check-box">
              <el-checkbox :value="bill">
                <div class="course-name">{{ bill.billName }}</div>
              </el-checkbox>
            </div>
            <div class="time-info">
              <div>{{ bill.date }}</div>
              <span>￥{{ bill.price }}</span>
            </div>
          </div>
        </div>
      </el-checkbox-group>
      <div class="button-type" v-if="currentTab === '可开发票'"><el-button style="margin-left: auto;" type="primary"
          @click="handleBill">申请开票</el-button></div>
    </div>
  </div>
</template>

<style scoped>
.tab-container {
  background-color: white;
  width: 75%;
  margin: 10px 5px;
  padding: 25px 50px;
  display: flex;
  flex-direction: column;
}

.tab-nav {
  display: flex;
  border-bottom: 1px solid #ddd;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

.tab-item {
  padding: 10px 20px;
  cursor: pointer;
  margin-bottom: -1px;
}


.tab-item.active {
  border-bottom: 2px solid black;
  font-weight: bold;
}

.tab-content {
  padding: 20px 0;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

.order-container {
  padding: 20px;
  border: 1px solid #eaeaea;
  display: grid;
  grid-template-columns: 1fr auto;
  /* 两列：左侧内容 + 右侧时间 */
  grid-template-rows: auto auto auto;
  /* 三行 */
  gap: 10px;
  margin-bottom: 15px;
  width: 100%;
  box-sizing: border-box;
}

/* 状态文本样式 */
.status {
  font-weight: bold;
  padding: 2px 8px;
  border-radius: 4px;
}



/* 课程名称占据整行 */
.course-name {
  grid-column: 1 / 3;
  grid-row: 2 / 3;
  font-weight: 500;
  padding: 5px 0;
}

/* 时间信息放在右侧 */
.time-info {
  grid-column: 1 / 3;
  grid-row: 3 / 4;
  text-align: left;
  color: #000000;
  font-size: 13px;
  line-height: 1.5;
}

.button-type {
  display: flex;
}

.check-box {
  display: flex;
}
</style>
