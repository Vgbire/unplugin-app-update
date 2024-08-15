import type { Plugin } from "vite"
import unplugin from "."

export default unplugin.vite as (options?: any) => Plugin
