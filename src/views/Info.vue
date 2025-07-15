<script setup>
import { ref } from 'vue'
import { ElNotification } from 'element-plus'
import { reset } from '@/api/userApi'
let user = ref(JSON.parse(sessionStorage.getItem('user')))
let editable = ref(user.value.idCard === null)
let infoVisible = ref(false)
let info = ref({
  id: user.value.id,
  name: user.value.name,
  tel: user.value.tel,
  sex: user.value.sex,
  email: user.value.email,
  company: user.value.company,
})
let identityVisible = ref(false)
let identity = ref({
  id: user.value.id,
  name: user.value.name,
  idCard: user.value.idCard,
})
async function handleInfo() {
  let resp = await reset(info.value)
  if (resp.code === 200) {
    ElNotification({
      title: 'Success',
      message: '修改成功',
      type: 'success',
    })
    user.value = resp.data
    sessionStorage.setItem('user', JSON.stringify(user.value))
    infoVisible.value = false
  } else {
    ElNotification({
      title: 'Error',
      message: resp.msg,
      type: 'error',
    })
  }
}

async function handleIdentity() {
  if (identity.value.idCard === '' || identity.value.name === '') {
    ElNotification({
      title: 'Error',
      message: '身份证号和姓名不能为空',
      type: 'error',
    })
    return
  }

  let resp = await reset(identity.value)
  if (resp.code === 200) {
    ElNotification({
      title: 'Success',
      message: '认证成功',
      type: 'success',
    })
    user.value = resp.data
    sessionStorage.setItem('user', JSON.stringify(user.value))
    identityVisible.value = false
    editable.value = false
  } else {
    ElNotification({
      title: 'Error',
      message: resp.msg,
      type: 'error',
    })
  }
}
</script>

<template>
  <div class="profile-container">
    <div class="profile-header">
      <el-avatar class="avatar" :src="user.avatar"></el-avatar>
      <div class="user-info">
        <h2 class="username">
          {{ user.name }}
          <el-image class="edit-icon"
            src="https://cdn8.axureshop.com/demo2025/2328743/images/%E4%B8%AA%E4%BA%BA%E4%B8%AD%E5%BF%83-%E5%9F%BA%E6%9C%AC%E4%BF%A1%E6%81%AF/u2950.svg"
            :fit="fit" @click="infoVisible = true" />
        </h2>
        <div class="tags">
          <span class="tag">{{ user.role }}</span>
          <span class="tag">{{ user.sex }}</span>
        </div>
      </div>
    </div>

    <table class="info-table">
      <tbody>
        <tr>
          <td class="label">手机号码</td>
          <td>{{ user.tel }}</td>
        </tr>
        <tr>
          <td class="label">身份证</td>
          <td>
            <span v-if="!editable">已认证</span>
            <span v-else>未认证</span>
            <button class="btn" v-if="editable" @click="identityVisible = true">编辑</button>
            <button class="btn" v-else @click="identityVisible = true">查看</button>
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

  <el-dialog v-model="infoVisible" title="编辑资料" width="500" draggable>
    <el-form :model="info" class="form">
      <el-form-item label="姓名">
        <el-input v-model="info.name" type="text" maxlength="5" clearable show-word-limit />
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input v-model="info.tel" type="text" maxlength="11" clearable show-word-limit />
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="info.sex">
          <el-radio value="男">男</el-radio>
          <el-radio value="女">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="info.email" type="text" maxlength="50" clearable show-word-limit />
      </el-form-item>
      <el-form-item label="绑定单位">
        <el-select v-model="info.company" placeholder="请选择" clearable>
          <el-option label="学校" value="学校" />
          <el-option label="公司" value="公司" />
          <el-option label="其他" value="其他" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleInfo">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>

  <el-dialog v-model="identityVisible" width="500">
    <el-form :model="identity" class="form">
      <el-form-item label="身份证号">
        <el-input v-model="identity.idCard" type="text" maxlength="18" clearable show-word-limit
          :disabled="!editable" />
      </el-form-item>
      <el-form-item label="真实姓名">
        <el-input v-model="identity.name" type="text" maxlength="5" clearable show-word-limit :disabled="!editable" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleIdentity" :disabled="!editable">
          提交认证
        </el-button>
        <el-button @click="identityVisible = false">取消认证</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.profile-container {
  background-color: white;
  width: 75%;
  margin: 10px 5px;
  padding: 25px 50px;
}

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
  margin: 0 5px;
}

.btn:hover {
  background-color: #f5f5f5;
}

.form {
  margin: 25px 50px;
}
</style>