<script setup>
// 取消学习方法
const cancelStudy = () => {
  // 这里可以添加取消学习后的具体逻辑，比如返回上一页等
  console.log('用户选择取消学习');
};

// 前往购买方法
const goToPurchase = () => {
  // 这里可以添加前往购买页面的具体逻辑，比如路由跳转等
  console.log('用户选择前往购买');
};
</script>

<template>
  <div class="prompt-container">
    <div class="prompt-box">
      <h3 class="prompt-title">提示</h3>
      <p class="prompt-content">此课程为付费课程，请购买课程后继续学习</p>
      <div class="prompt-actions">
        <el-button type="primary" @click="cancelStudy">取消学习</el-button>
        <el-button type="primary" @click="goToPurchase">前往购买</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.prompt-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f9f9f9;
}
.prompt-box {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}
.prompt-title {
  margin: 0 0 20px 0;
  font-size: 18px;
  color: #333;
}
.prompt-content {
  margin-bottom: 20px;
  font-size: 16px;
  color: #666;
}
.prompt-actions {
  display: flex;
  justify-content: space-around;
}
</style>