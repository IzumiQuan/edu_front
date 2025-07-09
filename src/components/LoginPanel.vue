<script setup>
import { ref } from 'vue'
import { login, remove, set, query } from '../api/userApi'
import router from '@/router'
import { ElNotification } from 'element-plus'
let user = ref({
    tel: '',
    pwd: '',
})
let checked = ref(false)
let data = ref({})
let code = ref({})
let msg = ref({})
async function handleLogin() {
    if(!checked.value){
        ElNotification({
            title: 'Error',
            message: '请先勾选用户协议',
            type: 'error',
        })
    }else if(user.value.tel === '' || user.value.pwd === ''){
        ElNotification({
            title: 'Error',
            message: '用户名或密码不能为空',
            type: 'error',
        })
    }else{
        let resp = await login(user.value)
        
        code = resp.code
        if(code == 200){
            data = resp.data
            if(data !== null){
                router.push("/class")//跳转页面
            }else{
                ElNotification({
                    title: 'Success',
                    message: '注册成功',
                    type: 'success',
                })
            }
        }else{
            msg = resp.msg
            ElNotification({
                    title: 'Error',
                    message: msg,
                    type: 'error',
            })
        }
    }
}
</script>

<template> 
    <div class="panel">
        <div class="box">
            <el-avatar icon="el-icon-user" class="avatar" />
            <el-input placeholder="请输入手机号" v-model="user.tel" clearable class="input" />
            <el-input placeholder="请输入密码" v-model="user.pwd" type="password" clearable show-password class="input" />
            <el-checkbox label="同意用户协议" v-model="checked" class="checkbox" />
            <el-button color="black" size="large" @click.prevent="handleLogin" class="btn" >登录</el-button>
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
.avatar {
    align-self: center;
    margin: 25px 0;
    width: 100px;
    height: 100px;
}
.input {
    height: 50px;
    margin: 10px 0;
}
.checkbox {
    margin: 10px 0;
}
.button {
    margin: 10px 0;
}
</style>