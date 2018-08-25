// pages/user/user.js
Page({
  data: {
  
  },
  onLoad(option) {
    console.log(option.id)
    wx.setNavigationBarTitle({
      title: '张佳皓 的名片'
    })

  }
})