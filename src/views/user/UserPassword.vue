<script setup>
import { userUpdatePwdService } from '@/api/user'
import { ref } from 'vue'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

// 1. 表单数据（严格按照你要求的字段）
const pwdForm = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: ''
})

// 表单Ref，用于校验和重置
const pwdFormRef = ref(null)

// 2. 校验规则
const rules = {
  old_pwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { pattern: /^\S{6,15}$/, message: '长度在 6 到 15 个字符', trigger: 'blur' }
  ],
  new_pwd: [
    { required: true, message: '请输入原密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '长度在 6 到 15 个字符',
      trigger: 'blur'
    },
    // 自定义校验：原密码不能和新密码一样
    {
      validator: (rule, value, callback) => {
        if (value && pwdForm.value.old_pwd && value === pwdForm.value.old_pwd) {
          callback(new Error('新密码与原密码不能相同'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  re_pwd: [
    { required: true, message: '请输入确认密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '长度在 6 到 15 个字符',
      trigger: 'blur'
    },
    // 自定义校验：确认密码必须和新密码一致
    {
      validator: (rule, value, callback) => {
        if (value && pwdForm.value.new_pwd !== value) {
          callback(new Error('两次输入的新密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

// 3. 提交修改密码
const handleSubmit = async () => {
  if (!pwdFormRef.value) return

  try {
    // 执行表单校验
    await pwdFormRef.value.validate()
    // 校验通过，在这里调用接口
    console.log('提交的密码数据：', pwdForm.value)
    await userUpdatePwdService(pwdForm.value)
    ElMessage.success('密码修改成功！')

    // 清空登录信息、个人数据、跳转至登录页面
    userStore.removeToken()
    userStore.setUser({})
    router.replace('/login')
  } catch (error) {
    console.error('表单校验失败', error)
  }
}

// 4. 重置表单
const handleReset = () => {
  pwdFormRef.value?.resetFields()
}
</script>
<template>
  <page-container title="重置密码">
    <el-form
      ref="pwdFormRef"
      :model="pwdForm"
      :rules="rules"
      label-width="100px"
    >
      <!-- 1. 原密码 -->
      <el-form-item label="原密码" prop="old_pwd">
        <el-input
          v-model="pwdForm.old_pwd"
          type="password"
          placeholder="请输入原密码"
          show-password
          style="width: 200px"
        />
      </el-form-item>

      <!-- 2. 新密码 -->
      <el-form-item label="新密码" prop="new_pwd">
        <el-input
          v-model="pwdForm.new_pwd"
          type="password"
          placeholder="请输入新密码"
          show-password
          style="width: 200px"
        />
      </el-form-item>

      <!-- 3. 确认密码 -->
      <el-form-item label="确认密码" prop="re_pwd">
        <el-input
          v-model="pwdForm.re_pwd"
          type="password"
          placeholder="请再次输入新密码"
          show-password
          style="width: 200px"
        />
      </el-form-item>

      <!-- 4. 按钮区域 -->
      <el-form-item style="text-align: center">
        <el-button type="primary" @click="handleSubmit">修改密码</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
  </page-container>
</template>
