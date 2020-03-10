//app.js
import store from './utils/store/index.js'
App({
  // 展示成功弹窗（toast）
  showSuccess(title, hideLoading) {
    if (hideLoading) wx.hideLoading();
    wx.showToast({ title, mask: true, duration: 500, icon: 'success' });
  },

  // 展示失败弹窗（modal）
  showError(title, content, hideLoading) {
    if (hideLoading) wx.hideLoading();
    wx.showModal({ title, content, showCancel: false });
  },

  // 增强Page能力，小程序不支持prototype的形式拓展能力
  enhancePage() {
    const oPage = Page;
    Page = config => oPage(Object.assign(config, {
      $store: store,
      $showSuccess: this.showSuccess,
      $showError: this.showError
    }));
  },
  onLaunch: function () {
    this.enhancePage();
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})