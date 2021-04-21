import {request} from "../../request/index.js";
Page({

  data: {
    swiperList:[],
    cateList:[],
    floorList:[]
  },

  onLoad: function (options) {
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
  },

  getSwiperList(){
    request({
      url: '/home/swiperdata',
    }).then(result=>{
      let swiperList = result.data.message;
      swiperList.forEach(v=>v.navigator_url=v.navigator_url.replace(/\/main/, "/index"));
      this.setData({
        swiperList
      })
    })
  },

  getCateList(){
    request({
      url: '/home/catitems',
    }).then(result=>{
      this.setData({
        cateList: result.data.message
      })
    })
  },

  getFloorList(){
    request({
      url: '/home/floordata',
    }).then(result=>{
      let floorList = result.data.message;
      floorList.forEach(v=>{
        v.product_list.forEach(val=>{
          val.navigator_url = val.navigator_url.replace("goods_list?","goods_list/index?");
        })
      })
      this.setData({
        floorList
      })
    })
  }
})