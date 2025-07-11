<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

// 状态管理
const isRegisterModalShow = ref(true); // 默认显示报名弹窗
const isConfirmShow = ref(false);
const isSuccess = ref(false);
const router = useRouter();

// 表单数据
const formData = reactive({
  name: '',
  contact: '',
  gender: '男'
});

// 错误信息
const errors = reactive({
  name: '',
  contact: ''
});

// 关闭弹窗
const closeModal = () => {
  isRegisterModalShow.value = false;
};

// 表单验证
const validateForm = () => {
  let isValid = true;
  
  // 重置错误信息
  errors.name = '';
  errors.contact = '';
  
  // 验证姓名
  if (!formData.name.trim()) {
    errors.name = '请输入姓名';
    isValid = false;
  }
  
  // 验证联系方式
  const contactPattern = /^1[3-9]\d{9}$/;
  if (!formData.contact.trim()) {
    errors.contact = '请输入联系方式';
    isValid = false;
  } else if (!contactPattern.test(formData.contact)) {
    errors.contact = '请输入有效的手机号码';
    isValid = false;
  }
  
  return isValid;
};

// 处理提交
const handleSubmit = () => {
  if (validateForm()) {
    isConfirmShow.value = true;
  }
};

// 确认提交
const confirmSubmit = () => {
  // 模拟API调用
  console.log('提交表单数据:', formData);
  router.push('/CertPage'); 
  // 也可按路由名称跳转：router.push({ name: 'Certificate' });
  
  // 显示成功提示
  isConfirmShow.value = false;
  isSuccess.value = true;
  
  // 3秒后自动关闭成功提示
  setTimeout(() => {
    isSuccess.value = false;
    // 重置表单
    formData.name = '';
    formData.contact = '';
  }, 3000);
};

// 关闭成功提示
const closeSuccess = () => {
  isSuccess.value = false;
};
</script>

<template>
  <!-- 报名弹窗 -->
  <Teleport to="body">
    <div class="register-modal" v-show="isRegisterModalShow">
      <div class="modal-content">
        <div class="modal-header">
          <h2>报名</h2>
          <button class="close-btn" @click="closeModal">×</button>
        </div>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label>姓名</label>
            <input 
              type="text" 
              v-model="formData.name" 
              placeholder="请输入姓名"
              :class="{ 'error': errors.name }"
            >
            <div class="error-message" v-if="errors.name">{{ errors.name }}</div>
          </div>
          
          <div class="form-group">
            <label>联系方式</label>
            <input 
              type="tel" 
              v-model="formData.contact" 
              placeholder="请输入联系方式"
              :class="{ 'error': errors.contact }"
            >
            <div class="error-message" v-if="errors.contact">{{ errors.contact }}</div>
          </div>
          
          <div class="form-group gender-group">
            <label>性别</label>
            <label class="radio-label">
              <input 
                type="radio" 
                name="gender" 
                value="男" 
                v-model="formData.gender"
              >
              男
            </label>
            <label class="radio-label">
              <input 
                type="radio" 
                name="gender" 
                value="女" 
                v-model="formData.gender"
              >
              女
            </label>
          </div>
          
          <button type="submit" class="submit-btn">
            确认报名
          </button>
        </form>
      </div>
    </div>
  </Teleport>
  
  <!-- 确认提示弹窗 -->
  <Teleport to="body">
    <div class="confirm-modal" v-show="isConfirmShow">
      <div class="confirm-content">
        <p>确认提交以下信息：</p>
        <ul class="confirm-details">
          <li>姓名：{{ formData.name }}</li>
          <li>联系方式：{{ formData.contact }}</li>
          <li>性别：{{ formData.gender }}</li>
        </ul>
        <div class="btn-group">
          <button class="cancel-btn" @click="isConfirmShow = false">
            返回修改
          </button>
          <button class="confirm-btn" @click="confirmSubmit">
            确定提交
          </button>
        </div>
      </div>
    </div>
  </Teleport>
  
  <!-- 提交成功提示 -->
  <Teleport to="body">
    <div class="success-modal" v-show="isSuccess">
      <div class="success-content">
        <i class="bi bi-check-circle-fill success-icon"></i>
        <p>报名成功！我们将尽快与您联系</p>
        <button class="close-success" @click="closeSuccess">
          关闭
        </button>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
/* 报名弹窗整体样式 */
.register-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  width: 400px;
  max-width: 90%;
  background-color: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  position: relative;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.modal-header h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #999;
  transition: color 0.2s;
}

.close-btn:hover {
  color: #333;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  color: #666;
}

.form-group input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.2s;
}

.form-group input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.form-group input.error {
  border-color: #dc3545;
}

.error-message {
  color: #dc3545;
  font-size: 12px;
  margin-top: 4px;
}

.gender-group {
  display: flex;
  align-items: center;
  gap: 16px;
}

.radio-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.radio-label input {
  margin-right: 6px;
}

.submit-btn {
  width: 100%;
  padding: 10px 16px;
  background-color: #888;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-btn:hover {
  background-color: #888;
}

/* 确认弹窗样式 */
.confirm-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
}

.confirm-content {
  background-color: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 360px;
  max-width: 90%;
}

.confirm-content p {
  margin-top: 0;
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.confirm-details {
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
}

.confirm-details li {
  margin-bottom: 8px;
  font-size: 14px;
  color: #666;
}

.btn-group {
  display: flex;
  gap: 12px;
}

.confirm-btn,
.cancel-btn {
  flex: 1;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.confirm-btn {
  background-color: #007bff;
  color: white;
  border: 1px solid #007bff;
}

.confirm-btn:hover {
  background-color: #0069d9;
}

.cancel-btn {
  background-color: white;
  color: #666;
  border: 1px solid #ddd;
}

.cancel-btn:hover {
  background-color: #f8f9fa;
}

/* 成功提示样式 */
.success-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1002;
}

.success-content {
  background-color: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  text-align: center;
  width: 320px;
  max-width: 90%;
}

.success-icon {
  font-size: 48px;
  color: #28a745;
  margin-bottom: 16px;
}

.success-content p {
  margin: 0 0 20px 0;
  font-size: 16px;
  color: #333;
}

.close-success {
  padding: 8px 16px;
  background-color: #f8f9fa;
  color: #666;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.close-success:hover {
  background-color: #e9ecef;
}
</style>    