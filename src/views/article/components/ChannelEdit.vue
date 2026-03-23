<script setup>
import { ref } from 'vue'
const dialogVisible = ref(false)
const fromModel = ref({
  cate_name: '',
  cate_alias: ''
})
const rules = {
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名称必须是 1-10 位的非空字符',
      trigger: 'blur'
    }
  ],
  cate_alias: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '分类别名必须是 1-15 位的字母或数字',
      trigger: 'blur'
    }
  ]
}

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
    <el-form
      :model="fromModel"
      :rules="rules"
      label-width="100px"
      style="padding-right: 30px"
    >
      <el-form-item label="分类名称" prop="cate_name">
        <el-input
          v-model="fromModel.cate_name"
          placeholder="请输入分类名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input
          v-model="fromModel.cate_alias"
          placeholder="请输入分类别名"
        ></el-input>
      </el-form-item>
    </el-form>
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
