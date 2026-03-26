<script setup>
import { ref } from 'vue'
import ChannelSelect from './ChannelSelect.vue'

// 控制抽屉显示隐藏
const visibleDrawer = ref(false)

// 默认数据
const defaultForm = {
  title: '', // 文章标题(1-30个任意字符)
  cate_id: '', // 文章分类id
  content: '', // 文章内容
  cover_img: '', // 文章封面
  state: '' // 文章状态-只能是"已发布"和"草稿"2个字符串
}

// 准备数据
const formModel = ref({ ...defaultForm })

// 组件对外暴露一个方法 open，基于 open 传来的参数，区分 编辑 / 添加
const open = (data) => {
  visibleDrawer.value = true // 显示抽屉

  if (data.id) {
    // 需要基于 data.id 发送请求，获取编辑对应的详情数据，进行回应
    console.log('编辑回显')
  } else {
    formModel.value = { ...defaultForm } // 基于默认数据，重置form数据显示
    console.log('添加')
  }

  console.log(data)
}

defineExpose({
  open
})
</script>

<template>
  <el-drawer
    v-model="visibleDrawer"
    :title="formModel.id ? '编辑文章' : '添加文章'"
    direction="rtl"
    size="50%"
  >
    <!-- 发表文章表单 -->
    <el-form :model="formModel" ref="formRef" label-width="100px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <channel-select
          v-model="formModel.cate_id"
          width="100%"
        ></channel-select>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img"> 文件上传 </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">富文本编辑器</div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">发布</el-button>
        <el-button type="info">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
