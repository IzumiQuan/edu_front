<template>
  <div class="container">
    <div class="form-container">
      <div class="form-item">
        <label>您的名字：</label>
        <input placeholder="请输入您的姓名">
      </div>
      <div class="form-item">
        <label>联系方式：</label>
        <input placeholder="请输入手机号或其他联系方式">
      </div>
      <div class="form-item">
        <label>问题：</label>
        <input placeholder="请简要描述您的问题">
      </div>
      <button>提交</button>

      <el-popover placement="bottom" title="拨号联系" :width="200" trigger="hover"
        content="+12312341234">
        <template #reference>
          <div class="circle">
            拨号<br>联系
          </div>
        </template>
      </el-popover>
    </div>
  </div>
</template>

<script>

</script>

<style scoped>
.container {
  display: flex;
  background-color: white;
  width: 75%;
  margin: 10px 5px;
  padding: 25px 50px;
}

.aside-wrapper {
  width: 200px;
  border-right: 2px solid #ccc;
  padding: 10px;
  background-color: #f9f9f9;
}

.form-container {
  flex-grow: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* 左对齐 */
}

.form-item {
  margin-bottom: 16px;
  display: flex;
  flex-direction: row;
  /* 水平排列 */
  align-items: center;
  /* 垂直居中对齐 */
  width: 100%;
  /* 使 .form-item 容器充满父容器 */
}

label {
  display: inline-block;
  width: 80px;
  text-align: right;
  margin-right: 8px;
  flex-shrink: 0;
  /* 防止 label 缩小 */
}

input {
  flex: 0 0 500px;
  padding: 6px;
  box-sizing: border-box;
}

button {
  width: 80px;
  padding: 6px 12px;
  margin-top: 20px;
}

.dialog {
  position: fixed;
  top: 50px;
  right: 50px;
  background: #fff;
  border: 1px solid #ccc;
  padding: 20px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  z-index: 100;
}

.circle {
  position: absolute;
  top: 125px;
  right: 125px;
  width: 50px;
  height: 50px;
  color: black;
  font-size: 13px;
  line-height: 25px;
  text-align: center;
  border-radius: 50%;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
}
</style>