// Plugins
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import { resolve } from 'path'
// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss',
      },
    }),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  server: {
    host:'localhost',
    port: 3000,
    proxy: {
      "^[hws].*/ws/.*": {
        target: "http://localhost:8080", // 后台接口
        changeOrigin: true,
        secure: false, // 如果是https接口，需要配置这个参数
        ws: true, //websocket支持
        // rewrite: (path) => path.replace(/^\/ws/, ""),
      },
      "/ws": {
        target: "http://localhost:8080", // 后台接口
        changeOrigin: true,
        secure: false, // 如果是https接口，需要配置这个参数
        ws: true, //websocket支持
        // rewrite: (path) => path.replace(/^\/ws/, ""),
      },
  }
}
})
