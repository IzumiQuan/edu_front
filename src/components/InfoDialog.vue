<script setup>
import { ref } from 'vue'
let form = ref({
  name: '',
  phone: '',
  email:'',
  region: '',
  gender: '男'
})
</script>

<template>
  <div class="panel">
    <div class="header">
      <h2 class="title">编辑资料</h2>
      <el-button icon="el-icon-close" circle @click="handleClose"><el-icon><circle-close-filled /></el-icon></el-button>
    </div>
    <div class="box">
    <el-form :model="form" label-width="auto" style="max-width: 600px">
    <el-form-item label="姓名">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="电话号码">
      <el-input v-model="form.phone" />
    </el-form-item>
    <el-form-item label="性别">
        <el-radio-group v-model="form.gender">
          <el-radio label="男">男</el-radio>
          <el-radio label="女">女</el-radio>
        </el-radio-group>
      </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="form.email" />
    </el-form-item>
    <el-form-item label="绑定单位">
      <el-select v-model="form.region" placeholder="please select your zone">
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" /> 
      </el-select>
    </el-form-item>
  </el-form>
  </div>
</div>
</template>

<style scoped>
.panel { 
    width: 500px;
    text-align: left;
    background-color: white;
    border: 1px solid white;
    border-radius: 10px;
}
.box {
    margin: 100px;
    width: 300px;
    display: flex;
    flex-direction: column;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid #eee;
}
.title {
  font-size: 16px;
  margin: 0;
}
</style>
