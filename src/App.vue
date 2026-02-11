<script setup>
import { useRoute, useRouter } from 'vue-router'

// 获取路由对象
const router = useRouter()
// 获取路由参数
const route = useRoute()

const goList = () => {
  console.log(router)
  console.log(route)
  router.push('/list')
}
</script>
<template>
  <div>我是APP</div>
  <button @click="$router.push('/home')">跳首页</button>
  <button @click="goList">跳列表页</button>
  <div>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
  </div>
</template>
<style scoped></style>
