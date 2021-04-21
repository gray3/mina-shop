// pages/order/index.js
Page({

  data: {
    tabs:[
      {
        id: 0,
        value: "全部",
        isActive: true
      },
      {
        id: 1,
        value: "待付款",
        isActive: false
      },
      {
        id: 2,
        value: "待发货",
        isActive: false
      },
      {
        id: 3,
        value: "退款/退货",
        isActive: false
      }
    ],
    orders:[]
  },

  onShow(){
    let pages =  getCurrentPages();
    let currentPage = pages[pages.length - 1];
    const {type} = currentPage.options;
    this.getOrders(type);
    this.changeTitleByIndex(type-1);
  },

  changeTitleByIndex(index){
    let {tabs} = this.data;
    tabs.forEach((v,i)=>{
      i===index?v.isActive=true:v.isActive=false;
    })
    this.setData({
      tabs
    })
  },

  handleTapChange(e){
    const {index} = e.detail;
    this.changeTitleByIndex(index);
    this.getOrders(index+1);
  },

  getOrders(type){
    let orders = wx.getStorageSync('orders') || [];
    orders = orders.filter(v=>{
      return v.type==type;
    });
    this.setData({
      orders
    })
  }
})