import {request} from "../../request/index"
Page({

  data: {
    good: {},
    isCollect: false
  },

  good:{},

  onShow(){
    let pages =  getCurrentPages();
    let currentPage = pages[pages.length - 1];
    let options = currentPage.options;
    const {goods_id} = options;
    this.getGoodDetail(goods_id);
  },

  getGoodDetail(goods_id){
    request({
      url: "/goods/detail",
      data: {
        goods_id
      }
    }).then(result=>{
      const good = result.data.message;
      this.good = good;
      let collect = wx.getStorageSync('collect') || [];
      let isCollect = collect.some(v=>v.goods_id===this.good.goods_id);
      this.setData({
        good:{
          goods_name:good.goods_name,
          goods_price:good.goods_price,
          goods_introduce:good.goods_introduce,
          pics:good.pics
        },
        isCollect
      })
    })
  },

  handleImage(e){
    const urls = this.good.pics.map(v=>v.pics_mid);
    let current = e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls
    })
  },

  handleCartAdd(){
    let cart = wx.getStorageSync('cart')||[];
    let index = cart.findIndex(v=>v.goods_id===this.good.goods_id);
    if(index === -1){
      this.good.num = 1;
      this.good.checked = true;
      cart.push(this.good);
    }else{
      cart[index].num++
    }
    wx.setStorageSync("cart", cart);
    wx.showToast({
      title: '加入成功',
      mask: true
    })
  },

  handleCollect(){
    let isCollect = false;
    let collect = wx.getStorageSync('collect') || [];
    let index = collect.findIndex(v=>v.goods_id===this.good.goods_id);
    if(index===-1){
      collect.push(this.good);
      isCollect = true;
      wx.showToast({
        title: '收藏成功',
      })
    }else{
      collect.splice(index,1);
      isCollect = false;
      wx.showToast({
        title: '取消收藏成功',
      })
    }
    wx.setStorageSync('collect', collect);
    this.setData({
      isCollect
    })
  },

  handleBuy(){
    let cart = wx.getStorageSync('cart')||[];
    let index = cart.findIndex(v=>v.goods_id===this.good.goods_id);
    if(index === -1){
      this.good.num = 1;
      this.good.checked = true;
      cart.push(this.good);
    }else{
      cart[index].num++
    }
    wx.setStorageSync("cart", cart);
    wx.reLaunch({
      url: '/pages/cart/index',
    })
  }
})