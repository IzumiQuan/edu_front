<script setup>
import { ref } from 'vue'
import { ElNotification } from 'element-plus'
import { add } from '../api/commentApi'
let form = ref({
  name: '',
  tel: '',
  content: '',
})
async function handleClick() {
  try {
    let resp = await add(form.value)
    if (resp.code == 200) {
      ElNotification({
        title: 'Success',
        message: '反馈成功',
        type: 'success',
      })
    } else {
      ElNotification({
        title: 'Error',
        message: resp.msg,
        type: 'error',
      })
    }
  } catch (e) {
    ElNotification({
      title: 'Error',
      message: e,
      type: 'error',
    })
  }
}
</script>

<template>
  <div class="container">
    <el-form v-model="form" label-width="auto" style="max-width: 500px" class="form">
      <el-form-item label="您的名字">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="form.tel" />
      </el-form-item>
      <el-form-item label="问题">
        <el-input v-model="form.content" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleClick" class="btn">提交</el-button>
      </el-form-item>
    </el-form>
    <el-popover placement="bottom" title="拨号联系" :width="200" trigger="hover" content="+12312341234">
      <template #reference>
        <div class="circle">
          拨号<br>联系
        </div>
      </template>
    </el-popover>
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