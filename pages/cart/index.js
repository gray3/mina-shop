// pages/cart/index.js
Page({

  data: {
    address:{},
    cart:[],
    allChecked: false,
    totalPrice: 0,
    totalNum:0
  },

  onShow(){
    // 获取地址
    const address = wx.getStorageSync('address')
    // 获取购物车数据
    const cart = wx.getStorageSync("cart") || [];
    this.setCart(cart);
    this.setData({
      address
    })
  },

  handleAddress(e){
    wx.chooseAddress({
      success: (result) => {
        let address = result;
        address.all = address.provinceName+address.cityName+address.detailInfo;
        wx.setStorageSync('address', address);
      }
    });
  },

  handleChange(e){
    const goods_id = e.currentTarget.dataset.id;
    let {cart} = this.data;
    let index = cart.findIndex(v=>v.goods_id===goods_id);
    cart[index].checked = !cart[index].checked;
    this.setCart(cart);
  },

  setCart(cart){
    let allChecked = true;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v=>{
      if(v.checked){
        totalPrice += v.goods_price * v.num;
        totalNum += v.num;
      }else{
        allChecked = false;
      }
    })
    allChecked = cart.length?allChecked:false;
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    })
    wx.setStorageSync('cart', cart);
  },

  changeAll(){
    let {cart,allChecked} = this.data;
    allChecked = !allChecked;
    cart.forEach(v=>{
      v.checked = allChecked
    })
    this.setCart(cart);
  },

  setNum(e){
    const {id,operation} = e.currentTarget.dataset;
    let {cart} = this.data;
    let index = cart.findIndex(v=>v.goods_id === id)
    if(cart[index].num === 1 && operation === -1){
      wx.showModal({
        title: "提示",
        content: "是否要删除？",
        success: res => {
          if (res.confirm) {
            cart.splice(index,1);
            this.setCart(cart);
          }
        }
      })
    }else{
      cart[index].num += operation;
      this.setCart(cart);
    }
  },

  handlePay(e){
    const {address,totalNum} = this.data;
    if(!address.userName){
      wx.showToast({
        title: '请选择收货地址',
        icon: "error"
      })
    }else if(totalNum === 0){
      wx.showToast({
        title: '请选择商品',
        icon: "error"
      })
    }else{
      wx.navigateTo({
        url: '/pages/pay/index',
      })
    }
  }
})