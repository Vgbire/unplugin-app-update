import type { Options } from "tsup"

export const tsup: Options = {
  entry: ["src/*.ts"],
  format: ["cjs", "esm"],
  dts: true,
  splitting: true,
  cjsInterop: true,
  clean: true,
  shims: false,
}
