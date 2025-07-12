<template>
  <div class="container">
    <div class="content">
      <form @submit.prevent="savePassword">
        <div class="form-group">
          <label>新密码</label>
          <input type="password" v-model="newPassword" required />
        </div>
        <div class="form-group">
          <label>再次输入</label>
          <input type="password" v-model="confirmPassword" required />
        </div>
        <button type="submit">保存</button>
      </form>
    </div>
  </div>
</template>

<script>

</script>

<style scoped>
.container {
  display: flex;
  background-color: white;
  width: 75%;
  margin: 10px 5px;
  padding: 25px 50px;
}

.content {
  flex-grow: 1;
  padding: 20px;
}

.form-group {
  margin-bottom: 16px;
}

label {
  display: inline-block;
  width: 80px;
  text-align: right;
  margin-right: 8px;
}

input {
  width: 300px;
  padding: 6px;
  box-sizing: border-box;
}

button {
  padding: 6px 12px;
  background-color: #000;
  color: #fff;
  border: none;
  cursor: pointer;
}
</style>