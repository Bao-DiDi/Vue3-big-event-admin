import { dayjs } from 'element-plus'

export const fromatTime = (time) => dayjs(time).format('YYYY年MM月DD日')
