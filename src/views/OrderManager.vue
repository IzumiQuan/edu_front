<script setup>
import { ref, onBeforeMount } from 'vue'
import { ElNotification } from 'element-plus'
import request from '@/utils/request.js';

async function getOrder(sc) {
  let res = await request.post("/order/query", sc.value)
  orders.value = res.data.records
}
async function handleCancel(order) {
  order.status = '已取消'
  let resp = await request.post("/order/reset", order)
  if (resp.code === 200) {
    getOrder(sc)
    ElNotification({
      title: 'Success',
      message: '订单已取消',
      type: 'success',
    })
  }
}
async function handlePay(order) {
  order.status = '已完成'
  let resp = await request.post("/order/reset", order)
  if (resp.code === 200) {
    getOrder(sc)
    ElNotification({
      title: 'Success',
      message: '订单已完成',
      type: 'success',
    })
  }
}

onBeforeMount(() => {
  getOrder(sc)

})
let sc = ref({
  example: {
    name: "",
  }
})
let orders = ref([])

// 定义标签页选项
const tabs = ['全部', '待支付', '已完成', '已取消'];

// 当前选中的标签页
const currentTab = ref('全部');

// 切换标签页的函数
const changeTab = (tab) => {
  currentTab.value = tab;
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
      <div v-for="(order, index) in orders" :key="index">
        <div class="order-container" v-if="currentTab === '全部' || currentTab === order.status">
          <div class="order-info">
            <div class="order-id">订单编号：{{ order.code }}</div>
            <div class="status">{{ order.status }}</div>
          </div>
          <div class="course-name">{{ order.className }}</div>
          <div class="time-info">
            <div>生成时间：{{ new Date(order.createDate).toLocaleString('zh-CN') }}</div>
            <div>支付时间：{{ order.payDate ? new Date(order.payDate).toLocaleString('zh-CN') : '—' }}</div>
          </div>
          <div class="button-container" v-if="order.status === '待支付'">
            <el-button type="default" @click="handleCancel(order)">取消</el-button>
            <el-button type="primary" @click="handlePay(order)">支付</el-button>
          </div>
        </div>
      </div>
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
  grid-template-rows: auto auto auto;
  gap: 10px;
  margin-bottom: 15px;
  width: 100%;
  box-sizing: border-box;
}

.order-info {
  grid-column: 1 / 3;
  grid-row: 1 / 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status {
  font-weight: bold;
  padding: 2px 8px;
  border-radius: 4px;
}

.course-name {
  grid-column: 1 / 3;
  grid-row: 2 / 3;
  font-weight: 500;
  padding: 5px 0;
}

.time-info {
  grid-column: 1 / 3;
  grid-row: 3 / 4;
  text-align: left;
  color: #666;
  font-size: 13px;
  line-height: 1.5;
}

.button-container {
  grid-column: 2/ 2;
  grid-row: 3 / 4;
  display: flex;
  justify-content: flex-start;
  gap: 10px;
}
</style>