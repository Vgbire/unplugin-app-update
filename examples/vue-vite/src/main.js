import { createApp } from "vue"
import "./style.css"
import App from "./App.vue"
import { AppUpdate } from "unplugin-app-update"

new AppUpdate({ interval: 10000 })

createApp(App).mount("#app")
