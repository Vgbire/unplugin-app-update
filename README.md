# Introduction
- App deployment user notification
- When deploying the project, generate a JSON file containing a hash. When the project starts, request the file and notify the user if there are any changes
- Support webpack, vite
- Unrestricted framework, React, Vue, Angular can all be used

## Install

```js
// npm
npm i unplugin-app-update -S
// pnpm
pnpm i unplugin-app-update -S
// yarn
yarn add unplugin-app-update
```

## Usage

The introduced plugin is used to generate a config. json file after construction, supporting custom file paths and default to the dist directory

### Webpack

```js
// webpack.config.js
const appUpdate = require("unplugin-app-update/webpack")

module.exports = {
  /* ... */
  plugins: [
    appUpdate('/path/to/config.json'),
  ],
}
```

### Vite

```js
// vite.config.ts
import appUpdate from "unplugin-app-update/vite"

export default defineConfig({
  plugins: [
    // default to the dist directory
    appUpdate(),
  ],
})
```

### entry
```js
// main.js or index.js
import { AppUpdate } from "unplugin-app-update"
const appUpdate = new AppUpdate({ /* Options */ })

// If you want to stop the request, use stop()
// appUpdate.stop()
// Re request
// appUpdate.check()

// Event: update, notUpdate
const update = ()=>{
  console.log("Update")
}
// custom popup reminders here
appUpdate.on("update", update)
appUpdate.on("notUpdate", ()=>{
  console.log("Not Update")
})
// Remove event
appUpdate.off("update", update)
```

### Options
| name | type | description | default |
| ---| ---| --- | --- |
| url | String | The URL of the config file | `config.json`|
| interval | Number | The interval of request | `30000` |
| locate | `zh_CN` \| `en_US` | Internationalization | `Default language of browser` |
| custom | Boolean | Set to true to remove default popup reminders, and then add an update event to customize the popup | `false` |

### Note
When developing locally, it is necessary to place a config.json file in the public directory<br>
manually change the hash value to simulate project construction<br>
If webpack or vite adjusts the public directory, you should new AppUpdate ({url:'your/custome/path'})
```js
// /public/config.json
{
  hash: "123456"
}
```

404 Error<br>
During production and local development, it is common to encounter a 404 error where config. json cannot be found<br>
```js
// webpack.config.js or vite.config.ts
{
  output: {
    // Modified the access path after construction
    publicPath: "/",
  }
}
```
