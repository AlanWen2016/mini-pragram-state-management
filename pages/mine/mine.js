// pages/mine/mine.js
var { baseUrl } = {};
var getStorageInfo  = function(){};
var requestUtil = function(){};
const bindStatusMap = {'0': '待验证', '1': '已验证', '2': '已绑定', '3': '已解绑'} 
Page({
  data: {
    userInfo: {
      name: '一帐通账号',
      statusText: '未登录',
      portrait: '',
    },
    login12306Info: { name: '' },
    showLoginBtn: true, // 小程序登陆按钮
    bind12306Status: 0, // 0 待验证， 1已验证 2 已绑定 3已解绑
    bind12306StatusText: '待验证'
  },
  viewContacts: function(){
    if(!this.data.bind12306Status){
      wx.showToast({
        title: '请先绑定12306账号',
        icon: 'none',
        duration: 1000
      })
    }
    wx.navigateTo({
       url: "/pages/mine/passengerList/passengerList",
     })
  },
  loginMiniProgram(){
    let that = this;
    requestUtil.loginMiniProgram().then((code)=>{
      try{
        wx.showToast({
          title: code,
          icon: 'none'
        })
      }catch(e){}
      this.setData({
        userInfo: {
          statusText: '已登陆',
          name: code
        },
        showLoginBtn: false
      })
      // TEST
      requestUtil.loginOneConnect(code, that.getBind12306Status);
    });
  },
  bind12306Account: function(){
    wx.getStorage({
      key: 'oneConnectCode',
      fail: function(res) {
        wx.showToast({
          title: '请登陆一帐通'
        })
      },
      success(){
        wx.navigateTo({
          url: '/pages/bindAccount/bindAccount',
        })
      }
    })
  },
  getBind12306Status: function(){
    let url = `${baseUrl}/account/status`;
    this.$request(url).then(res=>{
      if (res.data.responseCode == '0') {
        let status = res.data.data;
        let bindStatusText = bindStatusMap[status] || '';
        let booleanStatus = status === '2'
        this.setData({
          bind12306Status: status,
          bindStatusText
        })
        wx.setStorage({
          key: 'bind12306Status',
          data: booleanStatus,
        })
      }
    })
  },
  loadPageInfo: function(){
    let that = this;
    wx.getStorage({
      key: 'login12306Info',
      success: function (res) {
        let login12306Info = res.data ? JSON.parse(res.data) : {}
        let bind12306Status = login12306Info.name ? true : false
        that.setData({
          login12306Info: login12306Info,
          bind12306Status,
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    // 检查小程序登陆态
    wx.getStorage({
      key: 'oneConnectCode',
      success: function (res) { // 已登陆
        that.setData({
          userInfo: { name: res.data, statusText: '已登陆' },
          showLoginBtn: false
        })
        that.loadPageInfo();
      },
      fail(){ // 未登录
        // 检查12306绑定
        that.getBind12306Status();
        that.loadPageInfo();
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getBind12306Status();
    this.loadPageInfo();  

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})