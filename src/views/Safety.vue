<script setup>
import { ref } from 'vue'
import { ElNotification } from 'element-plus'
import { login, reset } from '@/api/userApi'
let user = ref(JSON.parse(sessionStorage.getItem('user')))
let pwd = ref({
  old: '',
  new: '',
})
async function handleClick() {
  if (pwd.value.old === '' || pwd.value.new === '') {
    ElNotification({
      title: 'Error',
      message: '密码不能为空',
      type: 'error',
    })
    return
  }
  user.value.pwd = pwd.value.old
  let resp = await login(user.value)
  if (resp.code === 200) {
    user.value.pwd = pwd.value.new
    resp = await reset(user.value)
    if (resp.code === 200) {
      ElNotification({
        title: 'Success',
        message: '密码修改成功',
        type: 'success',
      })
      pwd.value.old = ''
      pwd.value.new = ''
    }
  } else {
    ElNotification({
      title: 'Error',
      message: '密码验证失败',
      type: 'error',
    })
  }
}
</script>

<template>
  <div class="container">
    <el-form v-model="pwd" label-width="auto" style="max-width: 500px" class="form">
      <el-form-item label="原密码">
        <el-input v-model="pwd.old" type="password" minlength="7" maxlength="20" clearable show-password />
      </el-form-item>
      <el-form-item label="新密码">
        <el-input v-model="pwd.new" type="password" minlength="7" maxlength="20" clearable show-password />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleClick" class="btn">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  background-color: white;
  width: 75%;
  margin: 10px 5px;
  padding: 25px 50px;
}

.form {
  flex-grow: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.btn {
  background-color: black;
  border: 0px;
}
</style>