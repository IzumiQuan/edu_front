<script setup>
import { ref } from 'vue';

// 课程信息
const coursePrice = ref(299.00);
const courseHours = ref(12);
// 剩余学时
const remainingCredits = ref(16);
// 选择的支付方式
const selectedPaymentMethod = ref('');

// 关闭购买窗口方法
const closePurchase = () => {
  // 这里添加关闭窗口的逻辑，比如设置一个控制显示的变量为false
  console.log('关闭购买课程窗口');
};

// 处理支付方法
const handlePayment = () => {
  if (selectedPaymentMethod.value === 'credit') {
    console.log('使用学时支付');
    // 这里添加学时支付的具体逻辑，如与后端交互
  } else if (selectedPaymentMethod.value === 'wechat') {
    console.log('使用微信支付');
    // 这里添加微信支付的具体逻辑，如跳转至微信支付页面
  }
};
</script>

<template>
  <div class="purchase-course-container">
    <div class="course-header">
      <span class="title">购买课程</span>
      <el-button type="text" @click="closePurchase" class="close-button">
        <el-icon><Close /></el-icon>
      </el-button>
    </div>
    <div class="course-info">
      <div class="course-image">
        <div class="image-placeholder"></div>
      </div>
      <div class="course-details">
        <p class="course-name">课程名称课程名称课程名称课程名称课程名称课程名称</p>
        <div class="course-price">
          <span class="price">¥{{ coursePrice }}</span>
          <span class="hours">{{ courseHours }}学时</span>
        </div>
      </div>
    </div>
    <div class="payment-method">
      <span class="method-title">支付方式</span>
      <el-radio-group v-model="selectedPaymentMethod">
        <el-radio label="credit">学时支付(剩余学时{{ remainingCredits }})</el-radio>
      </el-radio-group>
    </div>
    <div class="qr-code">
      <img src="../assets/logo.svg" alt="支付二维码" class="qr-code-image">
      <span class="notification">1</span>
    </div>
    <div class="payment-button">
      <el-button type="primary" :disabled="!selectedPaymentMethod" @click="handlePayment">立即支付</el-button>
    </div>
  </div>
</template>

<style scoped>
.purchase-course-container {
  width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.course-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.title {
  font-size: 18px;
  font-weight: bold;
}
.close-button {
  font-size: 20px;
}
.course-info {
  display: flex;
  margin-bottom: 20px;
}
.course-image {
  width: 100px;
  height: 100px;
  background-color: #e5e5e5;
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.image-placeholder {
  width: 80%;
  height: 80%;
  background-color: #d5d5d5;
}
.course-details {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.course-name {
  font-size: 16px;
  margin-bottom: 10px;
}
.course-price {
  display: flex;
  align-items: center;
}
.price {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-right: 10px;
}
.hours {
  font-size: 14px;
  color: #666;
}
.payment-method {
  margin-bottom: 20px;
}
.method-title {
  font-size: 16px;
  margin-bottom: 10px;
}
.qr-code {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
.qr-code-image {
  width: 150px;
  height: 150px;
}
.notification {
  position: relative;
  top: -10px;
  right: -10px;
  background-color: #ff5722;
  color: #fff;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
}
.payment-button {
  text-align: center;
}
</style>