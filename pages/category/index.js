import {request} from "../../request/index.js";

Page({

  data: {
    leftMenuList:[],
    rightContent:[],
    currentIndex:0,
    scrollTop:0
  },

  Cates: [],

  onLoad: function (options) {
    const Cates = wx.getStorageSync('cates')
    if(!Cates){
      this.getCates();
    }else{
      if(Date.now()-Cates.time>1000*10){
        this.getCates();
      }else{
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map(v=>v.cat_name);
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },

  getCates(){
    request({
      url: "/categories"
    }).then(result=>{
      this.Cates = result.data.message;
      wx.setStorageSync('cates', {time:Date.now(),data:this.Cates});
      let leftMenuList = this.Cates.map(v=>v.cat_name);
      let rightContent = this.Cates[0].children;
      this.setData({
        leftMenuList,
        rightContent
      })
    })
  },
  handleTap(e){
    const {index} = e.currentTarget.dataset;
    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop:0
    })
  }
})