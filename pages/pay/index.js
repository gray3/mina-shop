// pages/cart/index.js
Page({

  data: {
    address:{},
    cart:[],
    totalPrice: 0,
    totalNum:0
  },

  onShow(){
    // 获取地址
    const address = wx.getStorageSync('address')
    // 获取购物车数据
    let cart = wx.getStorageSync("cart");
    cart = cart.filter(v=>v.checked);
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v=>{
        totalPrice += v.goods_price * v.num;
        totalNum += v.num;
    })
    this.setData({
      address,
      cart,
      totalPrice,
      totalNum
    })
  },

  Pay(){
    const token = wx.getStorageSync('token');
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index',
      })
      return;
    }
    wx.showModal({
      title: '本小程序为个人练习开发使用，无法实现支付功能，现在是模拟支付',
      success: (res) => {
        if (res.confirm) {
          this.addOrder(1)
        }else if (res.cancel){
          this.addOrder(2)
        }
      }
    })
  },

  addOrder(type){
    const order_price = this.data.totalPrice;
    const order_address = this.data.address.all;
    const cart = this.data.cart;
    let goods = [];
    cart.forEach(v=>goods.push({
      goods_id: v.goods_id,
      goods_number: v.num,
      goods_price: v.goods_price
    }))
    let order = {order_price,order_address,goods};
    order.order_id = Date.now();
    // order.order_date = this.getDate();
    order.order_date = new Date(Date.now()).toLocaleString();
    let orders = wx.getStorageSync('orders') || [];
    order.type = type;
    orders.push(order);
    wx.setStorageSync('orders', orders);
    let newCart = wx.getStorageSync('cart');
    newCart = newCart.filter(v=>!v.checked)
    wx.setStorageSync('cart', newCart)
    wx.navigateTo({
      url: '/pages/order/index?type='+type,
    })
  }
})