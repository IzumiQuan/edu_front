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
      <div v-if="currentTab === '全部'">
        <div v-for="(order, index) in orders1" :key="index" class="order-container">
          <div class="order-info">
            <div class="order-id">订单编号：{{ order.code }}</div>
            <div class="status">{{ order.status }}</div>
          </div>
          <div class="course-name">{{ order.className }}</div>

          <div class="time-info">
            <div>生成时间：{{ order.createDate }}</div>
            <div>支付时间：{{ order.payDate || '—' }}</div>
          </div>
          <div class="button-container">
            <el-button type="default" @click="handleCancel(order)">取消</el-button>
            <el-button type="primary" @click="handlePay(order)">支付</el-button>
          </div>
        </div>
      </div>


      <div v-if="currentTab === '待支付'">
        <div v-for="(order, index) in orders2" :key="index" class="order-container">
          <div class="order-info">
            <div class="order-id">订单编号：{{ order.code }}</div>
            <div class="status">{{ order.status }}</div>
          </div>
          <div class="course-name">{{ order.className }}</div>

          <div class="time-info">
            <div>生成时间：{{ order.createDate }}</div>
            <div>支付时间：{{ order.payDate || '—' }}</div>
          </div>
          <div class="button-container">
            <el-button type="default" @click="handleCancel(order)">取消</el-button>
            <el-button type="primary" @click="handlePay(order)">支付</el-button>
          </div>
        </div>
      </div>

      <div v-if="currentTab === '已完成'">
        <div v-for="(order, index) in orders3" :key="index" class="order-container">
          <div class="order-info">
            <div class="order-id">订单编号：{{ order.code }}</div>
            <div class="status">{{ order.status }}</div>
          </div>
          <div class="course-name">{{ order.className }}</div>

          <div class="time-info">
            <div>生成时间：{{ order.createDate }}</div>
            <div>支付时间：{{ order.payDate || '—' }}</div>
          </div>
          <div class="button-container">
            <el-button type="default" @click="handleCancel(order)">取消</el-button>
            <el-button type="primary" @click="handlePay(order)">支付</el-button>
          </div>
        </div>
      </div>




      <div v-if="currentTab === '已取消'">
        <div v-for="(order, index) in orders4" :key="index" class="order-container">
          <!-- 订单编号 -->
          <div class="order-info">
            <div class="order-id">订单编号：{{ order.code }}</div>
            <div class="status">{{ order.status }}</div>
          </div>

          <!-- 课程名称 -->
          <div class="course-name">
            {{ order.className }}
          </div>

          <!-- 时间信息 -->
          <div class="time-info">
            <div>生成时间：{{ order.createDate }}</div>
            <div>支付时间：{{ order.payDate || '—' }}</div>
          </div>

          <!-- 按钮区域 -->
          <div class="button-container">
            <el-button type="default" @click="handleCancel(order)">取消</el-button>
            <el-button type="primary" @click="handlePay(order)">支付</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>



</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import request from '@/utils/request.js';

async function getorder1(sc) {
  let res = await request.post("/order/query", sc.value)
  orders1.value = res.data.records
}
async function getorder2(sc) {
  let res = await request.post("/order/query", sc.value)
  orders2.value = res.data.records
}
async function getorder3(sc) {
  let res = await request.post("/order/query", sc.value)
  orders3.value = res.data.records
}
async function getorder4(sc) {
  let res = await request.post("/order/query", sc.value)
  orders4.value = res.data.records
}

onBeforeMount(() => {
  getorder1(sc1)
  getorder2(sc2)
  getorder3(sc3)
  getorder4(sc4)
})
let sc1 = ref({
  example: {
    name: "高松灯",
  }
})
let sc2 = ref({
  example: {
    name: "高松灯",
    status: "待支付"
  }
})
let sc3 = ref({
  example: {
    name: "高松灯",
    status: "已完成"
  }
})
let sc4 = ref({
  example: {
    name: "高松灯",
    status: "已取消"
  }
})
let orders1 = ref([])
let orders2 = ref([])
let orders3 = ref([])
let orders4 = ref([])
// 定义标签页选项
const tabs = ['全部', '待支付', '已完成', '已取消'];

// 当前选中的标签页
const currentTab = ref('全部');

// 切换标签页的函数
const changeTab = (tab) => {
  currentTab.value = tab;
};
</script>

<style scoped>
.tab-container {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.tab-nav {
  display: flex;
  border-bottom: 1px solid #ddd;
  /* 确保导航栏固定宽度 */
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
  grid-template-columns: 1fr auto; /* 两列：左侧内容 + 右侧时间 */
  grid-template-rows: auto auto auto; /* 三行 */
  gap: 10px;
  margin-bottom: 15px;
  width: 100%;
  box-sizing: border-box;
}

/* 订单编号和状态在同一行 */
.order-info {
  grid-column: 1 / 3; /* 跨两列 */
  grid-row: 1 / 2;
  display: flex;
  justify-content: space-between;
  align-items: center; /* 垂直居中 */
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
  color: #666;
  font-size: 13px;
  line-height: 1.5;
}

/* 按钮容器在左侧 */
.button-container {
  grid-column: 2/ 2;
  grid-row: 3 / 4;
  display: flex;
  justify-content: flex-start;
  gap: 10px;
}
</style>