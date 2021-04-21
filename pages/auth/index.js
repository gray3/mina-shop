Page({

  data: {

  },

  handleGetUserInfo(e){
    const {encryptedData,rawData,iv,signature} = e.detail;
    const loginData = {encryptedData,rawData,iv,signature};
    wx.login({
      timeout: 10000, 
      success: (res) => {
        const {code} = res;
        const token = encryptedData+rawData+iv+signature+code;
        wx.setStorageSync('token', token)
        wx.navigateBack({
          delta: 1
        })
      }
    })
  }
})