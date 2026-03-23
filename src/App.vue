<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>
<template>
  <!-- 通过 Config Provider 来配置多语言 -->
  <el-config-provider :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>
<style scoped></style>
