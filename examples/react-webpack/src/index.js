import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { AppUpdate } from "unplugin-app-update"

new AppUpdate({ interval: 10000 })

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<div>react + webpack</div>)
