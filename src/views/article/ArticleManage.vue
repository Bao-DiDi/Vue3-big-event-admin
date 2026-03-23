<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelSelect from './components/ChannelSelect.vue'
import { artGetListService } from '@/api/article'
import { fromatTime } from '@/utils/format'

const articleList = ref([]) // 列表数据
const total = ref(0) // 总条数
const isLoading = ref(false)
// 查询参数
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})
const getArticleList = async () => {
  isLoading.value = true
  const res = await artGetListService(params.value)
  articleList.value = res.data.data
  total.value = res.data.total
  isLoading.value = false
}
getArticleList()

// 编辑文章
const onEditArticle = (row) => {
  console.log('编辑', row)
}
// 删除文章
const onDeleteArticle = (row) => {
  console.log('删除', row)
}
// 每页条数变化触发
const handleSizeChange = (size) => {
  params.value.pagenum = 1
  params.value.pagesize = size
  getArticleList()
}
// 当前页面变化触发
const handleCurrentChange = (size) => {
  params.value.pagenum = size
  getArticleList()
}
</script>

<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary">添加文章</el-button>
    </template>

    <!-- 表单区域 -->
    <el-form inline>
      <el-form-item label="文章分类:" style="min-width: 200px">
        <!-- label 展示给用户看的， value 提交给后台的 -->
        <ChannelSelect v-model="params.cate_id"></ChannelSelect>

        <!-- Vue3  => v-model:cid  :cid 和 @update:cid 的简写 -->
        <!-- <ChannelSelect v-model="cateId"></ChannelSelect> -->
      </el-form-item>
      <el-form-item label="发布分类:" style="min-width: 200px">
        <!-- 这里后台标记发布状态，是通过中文标记的，已发布 / 草稿 -->
        <el-select v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格区域 -->
    <el-table :data="articleList" v-loading="isLoading">
      <el-table-column label="文章标题" prop="title">
        <template #default="{ row }">
          <!-- underline 下划线 -->
          <el-link :underline="'never'" type="primary">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发表时间" prop="pub_date">
        <template #default="{ row }">
          {{ fromatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <!-- 利用作用域插槽 row 可以获取当前行的数据 => v-for 遍历 item -->
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            circle
            plain
            type="primary"
            :icon="Edit"
            @click="onEditArticle(row)"
          ></el-button>
          <el-button
            circle
            plain
            type="danger"
            :icon="Delete"
            @click="onDeleteArticle(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <!-- v-model:currentPage 当前页 -->
    <!-- page-size 每页显示条目个数，支持 v-model 双向绑定 -->
    <!-- page-sizes 每页显示个数选择器的选项设置 -->
    <!-- small 是否使用小型分页样式 -->
    <!-- disabled 是否禁用分页 -->
    <!-- background 是否为分页按钮添加背景色 -->
    <!-- total 总条目数 -->
    <!-- size-change pageSize 改变时触发 -->
    <!-- current-change current-change 改变时触发 -->
    <el-pagination
      v-model:currentPage="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 5, 10]"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />
  </page-container>
</template>
<style lang="scss" scoped></style>
