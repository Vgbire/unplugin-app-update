import { createApp } from "vue"
import "./style.css"
import App from "./App.vue"
import { AppUpdate } from "unplugin-app-update"

const appUpdate = new AppUpdate()
appUpdate.check()

createApp(App).mount("#app")
