import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { AppUpdate } from "unplugin-app-update"

const appUpdate = new AppUpdate({ url: "/config.json", time: 10000 })
appUpdate.check()

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
)
