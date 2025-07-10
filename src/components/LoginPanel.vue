<script setup>
import { ref } from 'vue'
import { regist, login, getAvatar, remove, set, query } from '../api/userApi'
import router from '@/router'
import { ElNotification } from 'element-plus'
let user = ref({
    tel: '',
    pwd: '',
})
let checked = ref(false)
let msg = ref({})
let avatar = ref({})

function checkValue() {
    if (!checked.value) {
        ElNotification({
            title: 'Error',
            message: '请先勾选用户协议',
            type: 'error',
        })
        return false
    } else if (user.value.tel === '' || user.value.pwd === '') {
        ElNotification({
            title: 'Error',
            message: '手机号或密码不能为空',
            type: 'error',
        })
        return false
    } else {
        return true
    }
}

async function handleRegist() {
    if (checkValue()) {
        try {
            let resp = await regist(user.value)
            if (resp.success === true) {
                ElNotification({
                    title: 'Success',
                    message: '注册成功',
                    type: 'success',
                })
            } else {
                msg = resp.msg
                ElNotification({
                    title: 'Error',
                    message: msg,
                    type: 'error',
                })
            }
        } catch (e) {
            ElNotification({
                title: 'Error',
                message: '无法连接服务器',
                type: 'error',
            })
        }
    }
}

async function handleLogin() {
    if (checkValue()) {
        try {
            let resp = await login(user.value)
            if (resp.success === true) {
                router.push("/class")//跳转页面
            } else {
                msg = resp.msg
                ElNotification({
                    title: 'Error',
                    message: msg,
                    type: 'error',
                })
            }
        } catch (e) {
            ElNotification({
                title: 'Error',
                message: '无法连接服务器',
                type: 'error',
            })
        }
    }
}
async function handleGetAvatar(){
    if(user.value.tel !== ''){
        let resp = await getAvatar(user.value)
        avatar.value = resp.data.avatar
    }
}
</script>

<template>
    <div class="panel">
        <div class="box">
            <el-avatar icon="el-icon-user" :src="avatar" class="avatar" />
            <el-input placeholder="请输入手机号" v-model="user.tel" @blur="handleGetAvatar" clearable class="input" />
            <el-input placeholder="请输入密码" v-model="user.pwd" type="password" clearable show-password class="input" />
            <el-checkbox label="同意用户协议" v-model="checked" class="checkbox" />
            <el-buttton-group class="group">
                <el-button type="primary" color="black" size="large" @click.prevent="handleLogin" class="btn">登录</el-button>
                <el-button type="primary" color="black" size="large" @click.prevent="handleRegist" class="btn">注册</el-button>
            </el-buttton-group>
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
.group {
    margin: 10px 0;
    width: 300px;
    display: flex;
}
.btn {
    flex: 1;
}
</style>