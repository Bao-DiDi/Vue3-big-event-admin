<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { artDeleteChannelService, artGetChannelsService } from '@/api/article'
import ChannelEdit from './components/ChannelEdit.vue'

const channelList = ref([])
const isLoading = ref(false)
const dialog = ref()

const getChannelList = async () => {
  isLoading.value = true
  const res = await artGetChannelsService()
  channelList.value = res.data.data
  isLoading.value = false
}
getChannelList()

const onDeleteChannel = async (row) => {
  await ElMessageBox.confirm(
    `你确认要删除[${row.cate_name}]分类吗？`,
    '温馨提示',
    {
      type: 'waring',
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    }
  )
  await artDeleteChannelService(row.id)
  ElMessage.success('删除成功')
  getChannelList()
}
const onEditChannel = (row) => {
  dialog.value.open(row)
}
const onAddChannel = () => {
  dialog.value.open({})
}
// 提交成功，监听回传事件
const onSuccess = () => {
  getChannelList()
}
</script>

<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button type="primary" @click="onAddChannel">添加分类</el-button>
    </template>

    <el-table v-loading="isLoading" :data="channelList" style="width: 100%">
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="cate_name" label="分类名称"></el-table-column>
      <el-table-column prop="cate_alias" label="分裂别名"></el-table-column>
      <el-table-column label="操作" width="100">
        <!-- row 就是 channelList 的一项（item），$index 下标 -->
        <template #default="{ row, $index }">
          <el-button
            type="primary"
            :icon="Edit"
            plain
            circle
            @click="onEditChannel(row, $index)"
          />
          <el-button
            type="danger"
            :icon="Delete"
            plain
            circle
            @click="onDeleteChannel(row, $index)"
          />
        </template>
      </el-table-column>

      <template #empty>
        <el-empty description="没有数据"></el-empty>
      </template>
    </el-table>

    <channel-edit ref="dialog" @success="onSuccess"></channel-edit>
  </page-container>
</template>
<style lang="scss" scoped></style>
