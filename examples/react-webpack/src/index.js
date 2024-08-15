import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { AppUpdate } from "unplugin-app-update"

const appUpdate = new AppUpdate({ url: "/config.json", time: 10000 })
appUpdate.check()

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<div>react + webpack</div>)
