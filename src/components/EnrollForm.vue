<script setup>
import { ref } from 'vue'
let user = ref({
    name: '',
    tel: '',
    sex: '',
})
function handleClick() { 

}
</script>

<template>
    <el-form v-model="user" label-width="auto" style="max-width: 450px" class="form">
        <el-form-item label="姓名"> 
            <el-input v-model="user.name" />
        </el-form-item>
        <el-form-item label="联系方式"> 
            <el-input v-model="user.tel" />
        </el-form-item>
        <el-form-item label="性别">
            <el-radio-group v-model="user.sex">
                <el-radio value="男">男</el-radio>
                <el-radio value="女">女</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleClick">报名</el-button>
        </el-form-item>
    </el-form>
</template>

<style scoped>
.form {
    margin: 25px 50px;
}

</style>