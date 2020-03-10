// pages/mine/passengerList/passengerList.js
var { baseUrl } = {};

Page({
  data: {
    cookie: '',
    disabled: false,
    passengers: []
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
  addPassenger: function (e) {
    console.log('add')
    wx.navigateTo({
      url: '/pages/passenger/addPassenger/addPassenger',
    })
  },
  getPassengers: function () {
    // let temp = [{ id: 14, passengerName: 'Lisa', idNo: '440***********001X', checked: false },
    //   { id: 15, passengerName: 'Lisa', idNo: '440***********001X', checked: false },
    //   { id: 16, passengerName: 'Lisa', idNo: '440***********001X', checked: false }]
    let url = `${baseUrl}/passengers`;
    this.$request(url, {pageNo: 1}).then(res=>{
      if (res.data && res.data.responseCode === "0") {
        let passengers = res.data.data;
        this.setData({
          passengers: passengers
        })
      }
    })
   
  },
  viewPassengerDetail:function(e){
    let id = e.currentTarget.dataset.id;
    let url = '/pages/passenger/addPassenger/addPassenger?id=' + id
    wx.navigateTo({
      url: url
    })
    console.log(url);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.getPassengers();
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
    this.getPassengers();
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