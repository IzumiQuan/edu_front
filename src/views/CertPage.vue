<template>
  <div class="certificate-page">
    <h2>参会证明</h2>
    <div class="certificate-image">
      <!-- 这里用占位的灰色区域模拟图片，实际可替换成真实图片路径 -->
      <div class="placeholder" /> 
      <p>PNG</p>
    </div>
    <button class="download-btn">下载</button>
  </div>
</template>

<script setup>
// 可在此添加页面逻辑，比如下载功能的实现等
</script>

<style scoped>
.certificate-page {
  text-align: center;
  padding: 20px;
}
.certificate-image {
  width: 400px;
  height: 500px;
  background-color: #d9d9d9;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #666;
}
.placeholder {
  width: 80%;
  height: 80%;
  background-color: #ccc;
  margin-bottom: 10px;
}
.download-btn {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.download-btn:hover {
  background-color: #0056b3;
}
</style>