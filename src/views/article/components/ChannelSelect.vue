<script setup>
import { ref } from 'vue'
import { artGetChannelsService } from '@/api/article'

defineProps({
  modelValue: {
    type: [Number, String]
  }
})

const emit = defineEmits(['input:modelValue'])

const channelList = ref([])
const getChannelList = async () => {
  const res = await artGetChannelsService()
  channelList.value = res.data.data
}
getChannelList()
</script>

<template>
  <!-- 当前为自定义组件，所以 -->
  <!-- 把 select 的 v-Model 拆分成 :modelValue、@update:modelValue -->
  <!-- :modelValue 绑定 props 中的参数 modelValue -->
  <!-- @update:modelValue 触发外部绑定事件 update:modelValue -->
  <!-- 外部调用时，可写成 v-model -->
  <el-select
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
  >
    <el-option
      v-for="channel in channelList"
      :key="channel.id"
      :label="channel.cate_name"
      :value="channel.id"
    ></el-option>
    <el-option label="体育" value="137"></el-option>
  </el-select>
</template>
