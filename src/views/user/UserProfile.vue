<script setup>
import { userUpdateInfoService } from '@/api/user'
import PageContainer from '@/components/PageContainer.vue'
import { useUserStore } from '@/stores'
import { ref } from 'vue'

const {
  user: { id, email, nickname, username },
  getUser
} = useUserStore()
const isLoading = ref(false)
// 表单 ref（用于校验）
const formRef = ref(null)
// 表单数据
const form = ref({
  id,
  username, // 登录名（禁用）
  nickname, // 昵称
  email // 邮箱
})

// 校验规则
const rules = {
  nickname: [
    { required: true, message: '请输入用户昵称', trigger: 'blur' },
    {
      pattern: /^\S{2,10}$/,
      message: '昵称长度在 2 到 10 个字符',
      trigger: 'blur'
    }
  ],
  email: [
    { required: true, message: '请输入用户邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ]
}

// 提交表单
const submitForm = async () => {
  // 先校验
  const valid = await formRef.value?.validate()
  if (!valid) return
  isLoading.value = true
  // 校验通过 → 执行提交逻辑
  await userUpdateInfoService(form.value)
  isLoading.value = false
  getUser() // 刷新登录用户信息
  ElMessage.success('修改成功！')
}
</script>

<template>
  <page-container title="基本资料" v-loading="isLoading">
    <!-- 用户信息修改表单 -->
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
      <!-- 1. 登录名称（禁用） -->
      <el-form-item label="登录名称" prop="username">
        <el-input
          v-model="form.username"
          disabled
          placeholder="请输入登录名称"
        />
      </el-form-item>

      <!-- 2. 用户昵称 -->
      <el-form-item label="用户昵称" prop="nickname">
        <el-input v-model="form.nickname" placeholder="请输入用户昵称" />
      </el-form-item>

      <!-- 3. 用户邮箱 -->
      <el-form-item label="用户邮箱" prop="email">
        <el-input v-model="form.email" placeholder="请输入用户邮箱" />
      </el-form-item>

      <!-- 4. 提交按钮 -->
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交修改</el-button>
      </el-form-item>
    </el-form>
  </page-container>
</template>
