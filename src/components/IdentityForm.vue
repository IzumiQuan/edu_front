<script setup>

</script>

<template>
  <div class="id-card-auth-page">
    <div class="auth-container">
      <div class="auth-header">
        <h3 class="header-title">实名认证</h3>
        <p class="header-subtitle">请填写真实有效的身份信息</p>
      </div>
      
      <div class="auth-form">
        <el-form label-width="100px">
          <el-form-item label="身份证号">
            <el-input placeholder="请输入18位身份证号码" size="large"></el-input>
          </el-form-item>
          
          <el-form-item label="真实姓名">
            <el-input placeholder="请输入与身份证一致的姓名" size="large"></el-input>
          </el-form-item>
          
          <el-form-item>
            <div class="button-group">
              <el-button type="primary" size="large" style="width: 100%">提交认证</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
      
      <div class="auth-footer">
        <p class="footer-text">
          <el-icon><Information /></el-icon>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.id-card-auth-page {
  background-color: #f5f7fa;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.auth-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 450px;
  padding: 30px 40px;
}

.auth-header {
  text-align: center;
  margin-bottom: 30px;
}

.header-title {
  font-size: 20px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 8px;
}

.header-subtitle {
  font-size: 14px;
  color: #909399;
}
</style>