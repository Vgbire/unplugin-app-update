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
appUpdate.stop()
// Re request
appUpdate.check()
```

### Options
| name | type | description | default |
| ---| ---| --- | --- |
| url | string | The URL of the config file | `config.json`|
| interval | number | The interval of request | `30000` |
| locate | zh_CN \| en_US | Internationalization | `Default language of browser` |
