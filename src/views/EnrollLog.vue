<script setup>

</script>

<template>
<div class="container">
    <div class="item">
        <div class="left">
            <div style="margin: 15px 0;">活动名称</div>
            <div>活动时间</div>
            <div>报名时间</div>
        </div>
        <div class="right">
            <div>已报名</div>
        </div>
    </div>
</div>
</template>

<style scoped>
.container {
  background-color: white;
  width: 75%;
  margin: 10px 5px;
  padding: 25px 50px;
  display: flex;
  flex-direction: column;
}
.item {
    flex: 0 0 100px;
    padding: 15px;
    font-size: 13px;
    border-bottom: 1px solid rgba(230, 230, 230, 1);
    display: flex;
    flex-direction: row;
    align-items: center;
}
.left {
    flex: 0 0 200px;
}
.right {
    margin-left: auto;
}
</style>