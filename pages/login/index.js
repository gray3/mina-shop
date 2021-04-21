// pages/login/index.js
Page({

  data: {

  },

  getUserInfo(e){
    const {userInfo} = e.detail;
    wx.setStorageSync('userinfo', userInfo);
    wx.navigateBack({
      delta: 1
    });
  }
})