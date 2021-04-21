// components/Upimg/Upimg.js
Component({
  properties: {
    src: {
      type: String,
      value: ""
    },
    index: {
      type: String,
      value: ""
    }
  },

  methods: {
    deleteImg(){
      let {index} = this.data;
      this.triggerEvent("deleteImg",{index})
    }
  }
})
