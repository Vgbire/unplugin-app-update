import { Modal } from "antd"
import i18n from "./i18n"

type AnyMethod = (...args: any[]) => any
type UpdateStatus = "notUpdate" | "update"

interface IConfig {
  hash?: string
}

interface AppUpdateOptions {
  url?: string
  interval?: number
  locate?: "zh_CN" | "en_US"
  custom?: boolean
}

export class AppUpdate {
  // 第一次获取的配置
  oldConfig: IConfig
  // 新获取的配置
  newConfig: IConfig
  url: string
  interval: number
  // 定时器返回值
  timer: number
  callbacks: { update?: AnyMethod[]; notUpdate?: AnyMethod[] } // 保存回调
  modal: any

  constructor({
    url = "config.json",
    interval = 30000,
    locate,
    custom = false,
  }: AppUpdateOptions = {}) {
    if (locate) {
      i18n.changeLanguage(locate)
    }
    this.url = url
    this.oldConfig = {}
    this.newConfig = {}
    this.callbacks = {}
    this.interval = interval
    this.timer = 0
    this.init()
    if (!custom) {
      this.on("update", () => {
        if (!this.modal) {
          this.modal = Modal.confirm({
            title: i18n.t("updateModelTitle"),
            content: i18n.t("updateModelContent"),
            style: {
              top: 200,
            },
            okText: i18n.t("comfirm"),
            cancelText: i18n.t("cancel"),
            onOk: () => {
              window.location.reload()
            },
            onCancel: () => {
              this.modal = null
            },
          })
        }
      })
    }
    this.check()
  }

  async init() {
    this.oldConfig = await this.getConfig()
  }

  async getConfig() {
    const config = await fetch(this.url, {
      headers: { "Cache-Control": "max-age=0" },
    }).then((res) => res.text()) //读取index hash
    return JSON.parse(config)
  }

  // 停止检查
  stop() {
    clearInterval(this.timer)
  }

  // 自定义更新、未更新回调
  on(key: UpdateStatus, callback: AnyMethod) {
    ;(this.callbacks[key] || (this.callbacks[key] = [])).push(callback)
  }

  off(key: UpdateStatus, callback: AnyMethod) {
    const index = (this.callbacks[key] || (this.callbacks[key] = [])).findIndex(
      (item) => item === callback
    )
    if (index !== -1) {
      this.callbacks[key].splice(index, 1)
    }
  }

  dispatch(key: UpdateStatus) {
    this.callbacks[key]?.forEach((callback: AnyMethod) => {
      callback()
    })
  }

  compare() {
    if (this.newConfig.hash === this.oldConfig.hash) {
      this.dispatch("notUpdate")
    } else {
      this.oldConfig = this.newConfig
      this.newConfig = {}
      this.dispatch("update")
    }
  }

  // 开始检查
  check() {
    this.stop()
    this.timer = setInterval(async () => {
      this.newConfig = await this.getConfig()
      this.compare()
    }, this.interval) as unknown as number
  }
}
