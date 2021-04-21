// pages/feedback/index.js
Page({

  data: {
    tabs:[
      {
        id: 0,
        value: "体验问题",
        isActive: true
      },
      {
        id: 1,
        value: "商品、商家投诉",
        isActive: false
      }
    ],
    chooseImg: [],
    textValue: "",
    problemKind: [
      {
        id: 0,
        value: "功能建议",
        isActive: false
      },
      {
        id: 1,
        value: "购买遇到问题",
        isActive: false
      },
      {
        id: 2,
        value: "性能问题",
        isActive: false
      },
      {
        id: 3,
        value: "其他",
        isActive: false
      }
    ]
  },

  handleTapChange(e){
    const {index} = e.detail;
    let {tabs} = this.data;
    tabs.forEach((v,i)=>{
      i===index?v.isActive=true:v.isActive=false;
    })
    this.setData({
      tabs
    })
  },

  hangleChooesImg(){
    wx.chooseImage({
      success: (res) =>{
        this.setData({
          chooseImg: [...this.data.chooseImg,...res.tempFilePaths]
        })
      }
    })
  },

  handledeleteImg(e){
    const {index} = e.detail;
    let {chooseImg} = this.data;
    chooseImg.splice(index,1);
    this.setData({
      chooseImg
    })
  },

  handlleInput(e){
    this.setData({
      textValue: e.detail.value
    })
  },
  handleBtn(){
    const {textValue} = this.data;
    if(!textValue.trim()){
      wx.showToast({
        title: '输入不合法',
        icon: 'error',
        mask: true
      })
      return;
    }
    wx.showLoading({
      title: '上传中',
      mask: true,
    })
    this.setData({
      chooseImg:[],
      textValue:""
    });
    wx.hideLoading();
    wx.navigateBack({
      delta: 1
    })
  },

  changeProblem(e){
    const {index} = e.currentTarget.dataset;
    let {problemKind} = this.data;
    problemKind.forEach((v,i)=>{
      i===index?v.isActive=true:v.isActive=false;
    })
    this.setData({
      problemKind
    })
  }
})