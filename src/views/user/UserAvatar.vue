<script setup>
import { ref } from 'vue'
import { Plus, Upload } from '@element-plus/icons-vue'
// 基于 store 数据，初始化 imageUrl 初始值
import { useUserStore } from '@/stores'
import { userUpdateAvatarService } from '@/api/user'
const userStroe = useUserStore()
const imageUrl = ref(userStroe.user.user_pic)
const uploadRef = ref()

const onSelectFile = (uploadFile) => {
  // imageUrl.value = URL.createObjectURL(uploadFile.raw)

  // 基于 FileReader 读取图片做预览
  const reader = new FileReader()
  reader.readAsDataURL(uploadFile.raw)
  reader.onload = () => {
    // base64
    imageUrl.value = reader.result
  }
}

// 上传用户头像
const onUploadAvatar = async () => {
  // 发送请求：更新头像
  await userUpdateAvatarService(imageUrl.value)
  // userStroe 重新渲染
  await userStroe.getUser()
  ElMessage.success('更新成功')
}
</script>

<template>
  <page-container title="更换头像">
    <el-upload
      ref="uploadRef"
      :auto-upload="false"
      class="avatar-uploader"
      :show-file-list="false"
      :on-change="onSelectFile"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
    <br />
    <el-button
      type="primary"
      :icon="Plus"
      size="large"
      @click="uploadRef.$el.querySelector('input').click()"
      >选择图片</el-button
    >
    <el-button
      type="success"
      :icon="Upload"
      size="large"
      @click="onUploadAvatar"
      >上传头像</el-button
    >
  </page-container>
</template>
<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 278px;
      height: 278px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 278px;
      height: 278px;
      text-align: center;
    }
  }
}
</style>
