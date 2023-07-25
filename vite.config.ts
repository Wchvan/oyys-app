import path from 'path'
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    AutoImport({
      imports: ['vue', 'uni-app'],
      dts: './auto-imports.d.ts', // 安装好依赖后，重新运行编译即可自动在根目录下生成此声明文件
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '~`': path.resolve(__dirname, '/'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/vars.scss";`,
      },
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/mini': {
        target: 'http://162.14.79.224/',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/mini/, '/mini'),
      },
    },
  },
})
