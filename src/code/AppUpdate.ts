import { Modal } from "antd"
import i18n from "./i18n"

type AnyMethod = (...args: any[]) => any
type UpdateStatus = "notUpdate" | "update"

interface IConfig {
  hash?: string
}

interface AppUpdateOptions {
  url?: string
  time?: number
  locate?: "zh_CN" | "en_US"
}

export class AppUpdate {
  // 第一次获取的配置
  oldConfig: IConfig
  // 新获取的配置
  newConfig: IConfig
  url: string
  intervalTime: number
  // 定时器返回值
  timer: number
  callbacks: { update?: AnyMethod[]; notUpdate?: AnyMethod[] } // 保存回调
  modal: any

  constructor({
    url = "config.json",
    time = 30000,
    locate,
  }: AppUpdateOptions = {}) {
    if (locate) {
      i18n.changeLanguage(locate)
    }
    this.url = url
    this.oldConfig = {}
    this.newConfig = {}
    this.callbacks = {}
    this.intervalTime = time
    this.timer = 0
    this.init()
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
    return this
  }

  dispatch(key: UpdateStatus) {
    this.callbacks[key]?.forEach((callback: AnyMethod) => {
      callback()
    })
  }

  // 如果新旧 length 一样无更新，否则为已更新
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
    if (!this.callbacks?.update?.length) {
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
    this.timer = setInterval(async () => {
      this.newConfig = await this.getConfig()
      this.compare()
    }, this.intervalTime) as unknown as number
  }
}
