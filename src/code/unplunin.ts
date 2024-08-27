import { createUnplugin } from "unplugin"
import { writeFileSync, mkdirSync } from "node:fs"
import path from "node:path"

const uuid = (): string => {
  let d: number = Date.now()

  const d2: number =
    (performance && performance.now && performance.now() * 1000) || 0

  return "ddxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    (c: string) => {
      let r: number = Math.random() * 16

      if (d > 0) {
        r = (d + r) % 16 | 0
        d = Math.floor(d / 16)
      } else {
        r = (d2 + r) % 16 | 0
        d = Math.floor(d2 / 16)
      }

      const v: number = c === "x" ? r : (r & 0x3) | 0x8
      return v.toString(16)
    }
  )
}

const generateConfig = (configPath: string, hash: string) => {
  // 确保目录存在
  mkdirSync(path.dirname(configPath), { recursive: true })
  writeFileSync(
    configPath,
    JSON.stringify(
      {
        hash,
      },
      null,
      2
    )
  )
}

export default createUnplugin((filePath: string = "config.json") => {
  let viteOutDir = "dist"
  return {
    name: "unplugin-app-update",

    vite: {
      configResolved(config) {
        viteOutDir = config.build.outDir
      },
      closeBundle() {
        const configPath = path.join(process.cwd(), viteOutDir, filePath)
        generateConfig(configPath, uuid())
      },
    },

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
          generateConfig(configPath, compilation.hash)
        }
      )
    },
  }
})
