import {request} from "../../request/index";
Page({

  data: {
    ishidden:true,
    goods: [],
    inputValue: ""
  },

  TimeId: -1,

  handleInput(e){
    const {value} = e.detail;
    if(!value.trim()){
      this.setData({
        ishidden: true,
        goods: []
      })
      return;
    }
    this.setData({
      ishidden: false
    })
    clearTimeout(this.TimeId);
    this.TimeId = setTimeout(()=>{
      this.qsearch(value);
    },1000);
  },

  qsearch(query){
    request({
      url: "/goods/qsearch",
      data: {query}
    }).then(res => {
      this.setData({
        goods: res.data.message
      })
    })
  },

  handlecancel(e){
    this.setData({
      ishidden: true,
      goods: [],
      inputValue: ""
    })
  }
})