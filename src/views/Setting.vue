<script setup>
import { ref } from 'vue';
import { ElNotification } from 'element-plus'
import { remove } from '@/api/userApi';
import router from '@/router';

let user = ref(JSON.parse(sessionStorage.getItem('user')))

const settingItems = ref([
  { label: '协议规则' },
  { label: '隐私政策' },
  { label: '平台规则' }
]);

async function handleClick() {
  let resp = await remove(user.value.id)
  if (resp.code === 200) {
    localStorage.removeItem('user')
    ElNotification({
      title: 'Info',
      message: '账号注销成功',
      type: 'info',
    })
    router.push('/login')
  }
}
</script>

<template>
  <div class="setting-container">
    <div class="setting-item" v-for="(item, index) in settingItems" :key="index">
      {{ item.label }}
      <span class="arrow">></span>
    </div>
    <div style="flex: 1;margin: 25px 0;"><el-button class="delete-btn" @click="handleClick" type="danger">注销</el-button>
    </div>
  </div>
</template>

<style scoped>
.setting-container {
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 75%;
  margin: 10px 5px;
  padding: 25px 50px;
}

.setting-item {
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

.arrow {
  font-size: 16px;
  color: #999;
}

.delete-btn {
  color: white;
  border: none;
  cursor: pointer;

}
</style>