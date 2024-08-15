import { createUnplugin } from "unplugin"
import { writeFileSync, mkdirSync } from "node:fs"
import path from "node:path"

const unplugin = createUnplugin((filePath: string) => {
  return {
    name: "unplugin-app-update",

    vite: {},

    webpack(compiler) {
      // 只在生产模式下生成文件
      if (compiler.options.mode !== "production") {
        return
      }
      compiler.hooks.afterEmit.tap(
        "unplugin-app-update",
        (compilation: any) => {
          const configPath = path.join(
            compiler.options.output.path as string,
            filePath
          )
          // 确保目录存在
          mkdirSync(path.dirname(configPath), { recursive: true })
          writeFileSync(
            configPath,
            JSON.stringify(
              {
                hash: compilation.hash,
              },
              null,
              2
            )
          )
        }
      )
    },
  }
})
export default unplugin
