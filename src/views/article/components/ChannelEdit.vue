<script setup>
import { ref } from 'vue'
const dialogVisible = ref(false)

// 组件对外暴露一个方法 open，基于 open 传来的参数，区分添加还是编辑
// open({}) => 表单无需渲染，说明是添加
// open({ id, cate_name, ... }) => 表单需要渲染，说明是编辑
// open 调用后，可以打开弹窗

const open = (row) => {
  console.log(row)
  dialogVisible.value = true
}

// 向外暴露方法
defineExpose({
  open
})
</script>

<template>
  <el-dialog v-model="dialogVisible" title="添加弹层" width="30%">
    <span>这是一段消息内容</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
