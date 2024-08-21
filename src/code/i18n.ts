import i18n from "i18next"

const getLanguage = () => {
  let lng = navigator?.language || "zh_CN"
  if (lng.includes("zh")) {
    return "zh_CN"
  }
  if (lng.includes("en")) {
    return "en_US"
  }
  return "zh_CN"
}

i18n.init({
  lng: getLanguage(),
  resources: {
    zh_CN: {
      translation: {
        updateModelTitle: "检测到内容更新，是否刷新页面？",
        updateModelContent: "系统发版，刷新获取最新内容",
        comfirm: "确认",
        cancel: "取消",
      },
    },
    en_US: {
      translation: {
        updateModelTitle:
          "Detected content update, do you want to refresh the page?",
        updateModelContent:
          "System release, refresh to obtain the latest content",
        comfirm: "Comfirm",
        cancel: "Cancel",
      },
    },
  },
})

export default i18n
