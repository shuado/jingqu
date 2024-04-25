import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 持久化存储
const store = createPinia()
store.use(piniaPluginPersistedstate)

export default store
