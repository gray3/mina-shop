// pages/user/index.js
Page({

  data: {
    userinfo: {},
    collectNum: 0
  },

  onLoad(){
  wx.showShareMenu({
    complete: (res) => {},
    fail: (res) => {},
    success: (res) => {},
    withShareTicket: true,
    menus: ["shareAppMessage","shareTimeline"]
  })
  },

  onShow: function () {
    const userinfo = wx.getStorageSync('userinfo');
    const collect = wx.getStorageSync('collect');
    this.setData({
      userinfo,
      collectNum: collect.length
    })
  },

  handleAddress(){
    wx.chooseAddress({
      success: (res) => {}
    })
  }
})