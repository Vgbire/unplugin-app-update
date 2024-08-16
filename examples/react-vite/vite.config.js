import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import appUpdate from "unplugin-app-update/vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), appUpdate()],
  server: {
    port: 3100,
  },
})
