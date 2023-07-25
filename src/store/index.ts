import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createUnistorage } from 'pinia-plugin-unistorage'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate).use(createUnistorage())

export default pinia
