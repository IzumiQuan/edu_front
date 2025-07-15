<script setup>
import { ref } from 'vue'
import { ElNotification } from 'element-plus'
import { regist, login, getAvatar } from '../api/userApi'
import router from '@/router'
sessionStorage.clear()
let user = ref({
    tel: '',
    pwd: '',
    avatar: ''
})
let checked = ref(false)
let msg = ref({})

function validateValue() {
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
    if (validateValue()) {
        try {
            let resp = await regist(user.value)
            if (resp.success === true) {
                ElNotification({
                    title: 'Success',
                    message: '注册成功',
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
                message: '无法连接服务器',
                type: 'error',
            })
        }
    }
}

async function handleLogin() {
    if (validateValue()) {
        try {
            let resp = await login(user.value)
            if (resp.success === true) {
                sessionStorage.setItem('user', JSON.stringify(resp.data))
                router.push("/course")//跳转页面
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
async function handleGetAvatar() {
    if (user.value.tel !== '') {
        let resp = await getAvatar(user.value)
        user.value.avatar = resp.data.avatar
    }
}
</script>

<template>
    <div class="panel">
        <div class="box">
            <el-avatar icon="el-icon-user" :src="user.avatar" class="avatar" />
            <el-input placeholder="请输入手机号" v-model="user.tel" @blur="handleGetAvatar" maxlength="11" show-word-limit
                clearable class="input" />
            <el-input placeholder="请输入密码" v-model="user.pwd" type="password" maxlength="20" clearable show-password
                class="input" />
            <el-checkbox label="同意用户协议" v-model="checked" class="checkbox" />
            <el-buttton-group class="group">
                <el-button type="primary" color="black" size="large" @click.prevent="handleLogin"
                    class="btn">登录</el-button>
                <el-button type="primary" color="black" size="large" @click.prevent="handleRegist"
                    class="btn">注册</el-button>
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