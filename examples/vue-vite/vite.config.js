import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import appUpdate from "unplugin-app-update/vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), appUpdate()],
  server: { port: 3200 },
})
