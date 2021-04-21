import {request} from "../../request/index"
Page({

  data: {
    tabs:[
      {
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      }
    ],
    goodList:[]
  },

  totalPages: 1,

  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },

  onLoad: function (options) {
    this.QueryParams.cid = options.cid || "";
    this.QueryParams.query = options.query || "";
    this.getGoodList();
  },

  onReachBottom(){
    if(this.QueryParams.pagenum < this.totalPages){
      this.QueryParams.pagenum++;
      this.getGoodList();
    }else{
      wx.showToast({
        title: '没有下一页数据了',
        icon: 'error'
      })
    }
  },

  getGoodList(){
    request({
      url: "/goods/search",
      data: this.QueryParams,
    }).then(result=>{
      let total = result.data.message.total;
      this.totalPages = Math.ceil(total / this.QueryParams.pagesize);
      this.setData({
        goodList: [...this.data.goodList,...result.data.message.goods]
      })
      wx.stopPullDownRefresh();
    })
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

  // 下拉刷新
  onPullDownRefresh(){
    this.setData({
      goodList:[]
    });
    this.QueryParams.pagenum = 1;
    this.getGoodList();
  }
})