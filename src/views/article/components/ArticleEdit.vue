<script setup>
import { ref } from 'vue'
// 控制抽屉显示隐藏
const visibleDrawer = ref(false)

const open = (data) => {
  visibleDrawer.value = true // 显示抽屉
  console.log(data)
}

defineExpose({
  open
})
</script>

<template>
  <el-drawer
    v-model="visibleDrawer"
    title="我是标题"
    direction="rtl"
    size="50%"
  >
    <span>内容部分</span>
  </el-drawer>
</template>
