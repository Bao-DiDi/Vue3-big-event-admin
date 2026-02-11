import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

// Pinia独立维护
const pinia = createPinia()
pinia.use(persist)

export default pinia

// 统一管理，按需导入，按需导出
// import { useUserStore } from './modules/user'
// import { useCountStore } from './modules/count'
// export { useUserStore, useCountStore }

// 简写
export * from './modules/user'
export * from './modules/count'
