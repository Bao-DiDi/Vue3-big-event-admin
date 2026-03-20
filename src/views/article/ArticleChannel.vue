<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { artGetChannelsService } from '@/api/article'

const channelList = ref([])
const isLoading = ref(false)

const getChannelList = async () => {
  isLoading.value = true
  const res = await artGetChannelsService()
  channelList.value = res.data.data
  isLoading.value = false
}
getChannelList()

const onEditChannel = (row, $index) => {
  console.log('editChannel', row, $index)
}
const onDeleteChannel = (row, $index) => {
  console.log('deleteChannel', row, $index)
}
</script>

<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button type="primary">添加分类</el-button>
    </template>

    <el-table v-loading="isLoading" :data="channelList" style="width: 100%">
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="cate_name" label="分类名称"></el-table-column>
      <el-table-column prop="cate_alias" label="分裂别名"></el-table-column>
      <el-table-column label="操作" width="100">
        <!-- row 就是 channelList 的一项（item），$index 下标 -->
        <template #default="{ row, $index }">
          <el-button type="primary" :icon="Edit" plain circle @click="onEditChannel(row, $index)" />
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
  </page-container>
</template>
<style lang="scss" scoped></style>
