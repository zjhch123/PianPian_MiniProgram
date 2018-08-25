// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    editBase: false
  },
  showEditBase() {
    this.setData({
      editBase: true,
    });
  }
})