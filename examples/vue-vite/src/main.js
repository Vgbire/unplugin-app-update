import { createApp } from "vue"
import "./style.css"
import App from "./App.vue"
import { AppUpdate } from "unplugin-app-update"

const appUpdate = new AppUpdate({ interval: 10000, custom: true })
appUpdate.on("update", () => {
  console.log(112112)
})

createApp(App).mount("#app")
