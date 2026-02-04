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
</template>
<style scoped></style>
