<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from './stores/user'

// 获取路由对象
const router = useRouter()
// 获取路由参数
const route = useRoute()

const goList = () => {
  console.log(router)
  console.log(route)
  router.push('/list')
}

const userStore = useUserStore()
</script>
<template>
  <div>我是APP</div>
  <button @click="$router.push('/home')">跳首页</button>
  <button @click="goList">跳列表页</button>
  <div>
    <p>{{ userStore.token }}</p>
    <el-button type="primary" @click="userStore.setToken('slkdfljfelfnfnlenfie')">登录</el-button>
    <el-button @click="userStore.removeToken">退出</el-button>
  </div>
</template>
<style scoped></style>
