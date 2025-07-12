<script setup>
import { ref } from 'vue'

let user = ref(JSON.parse(sessionStorage.getItem('user')))

const isEditModalOpen = ref(false)
const currentEditField = ref('')
const editValue = ref('')

const openEditModal = (field) => {
  currentEditField.value = field
  editValue.value = userInfo.value[field]
  isEditModalOpen.value = true
}

const closeEditModal = () => {
  isEditModalOpen.value = false
}

const saveEdit = () => {
  // 这里可以添加表单验证逻辑
  userInfo.value[currentEditField.value] = editValue.value
  closeEditModal()

  // 模拟保存到服务器
  console.log(`保存 ${currentEditField.value}:`, editValue.value)
}

const viewIdCard = () => {
  
}

</script>

<template>
  <div class="profile-container">
    <!-- 头像及基本信息区域 -->
    <div class="profile-header">
      <el-avatar class="avatar" :src="user.avatar"></el-avatar>
      <div class="user-info">
        <h2 class="username">
          {{ user.name }}
          <el-image class="edit-icon"
            src="https://cdn8.axureshop.com/demo2025/2328743/images/%E4%B8%AA%E4%BA%BA%E4%B8%AD%E5%BF%83-%E5%9F%BA%E6%9C%AC%E4%BF%A1%E6%81%AF/u2950.svg"
            :fit="fit" />
        </h2>
        <div class="tags">
          <span class="tag">{{ user.role }}</span>
          <span class="tag">{{ user.sex }}</span>
        </div>
      </div>
    </div>

    <!-- 信息列表区域 -->
    <table class="info-table">
      <tbody>
        <tr>
          <td class="label">手机号码</td>
          <td>{{ user.tel }}</td>
        </tr>
        <tr>
          <td class="label">身份证</td>
          <td>
            <span v-if="user.idCard !== ''">已认证</span>
            <span v-else>未认证</span>
            <button class="btn" @click="openEditModal('idCard')">编辑</button>
            <button class="btn" @click="viewIdCard">查看</button>
          </td>
        </tr>
        <tr>
          <td class="label">邮箱</td>
          <td>{{ user.email }}</td>
        </tr>
        <tr>
          <td class="label">工作单位</td>
          <td>{{ user.company }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- 编辑弹窗 -->
  <div v-if="isEditModalOpen" class="edit-modal">
    <div class="modal-content">
      <h3>{{ currentEditField === 'username' ? '修改用户名' : '修改身份证' }}</h3>
      <input v-model="editValue" :placeholder="currentEditField === 'username' ? '请输入用户名' : '请输入身份证号'"
        class="input-field">
      <div class="modal-actions">
        <button class="btn cancel-btn" @click="closeEditModal">取消</button>
        <button class="btn save-btn" @click="saveEdit">保存</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  color: #333;
  padding: 20px;
}

/* 整体容器样式 */
.profile-container {
  background-color: white;
  width: 75%;
  margin: 10px 5px;
  padding: 25px 50px;
}

/* 头像及顶部信息区域 */
.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.avatar {
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  margin-right: 15px;
}

.user-info .username {
  font-size: 22px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
}

.edit-icon {
  font-size: 16px;
  margin-left: 5px;
  cursor: pointer;
  color: #999;
}

.tags {
  display: flex;
  gap: 8px;
}

.tag {
  background-color: #f0f0f0;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
}

/* 信息表格样式 */
.info-table {
  width: 100%;
  border-collapse: collapse;
}

.info-table tr {
  border: 1px solid rgba(240, 240, 240, 1);
}

.info-table td {
  padding: 12px 0;
}

.label {
  width: 80px;
  color: #666;
}

.btn {
  background-color: white;
  border: 1px solid #ccc;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 5px;
}

.btn:hover {
  background-color: #f5f5f5;
}

/* 编辑弹窗样式 */
.edit-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
}

.modal-content h3 {
  margin-bottom: 15px;
}

.input-field {
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
}

.cancel-btn {
  margin-right: 10px;
}

.save-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
}
</style>