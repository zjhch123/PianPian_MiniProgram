// pages/user/user.js
const api = require('../../api/index.js')
const utils = require('../../utils/util.js')
Page({
  data: {
    host: utils.HOST,
    isFavorite: 0,
    logined: false,
    userInfo: {
      id: 0,
      userType: 0,
      UserBase: {

      },
      WorkExps: [],
      EduExps: [],
    }
  },
  onLoad(option) {
    this.id = option.id
    this.getUserData()
    this.isFavorite()
  },
  getUserData() {
    const userId = this.id
    return api.getUserDetail(userId)
      .then(res => res.data)
      .then(res => {
        const code = res.code
        if (code === 200) {
          this.setData({
            userInfo: res.content
          })
          wx.setNavigationBarTitle({
            title: `${res.content.UserBase.username} 的名片`
          })
        }
      });
  },
  isFavorite() {
    const userId = this.id
    api.isFavorite(userId)
      .then(res => res.data)
      .then(res => {
        if (res.code !== 200) { return }
        this.setData({
          isFavorite: res.content ? 1 : 0,
          logined: true,
        })
      })
  },
  favorite(type) {
    const userId = this.id
    api.setFavorite(userId, type)
      .then(res => res.data)
      .then(res => {
        if (res.code === 200) {
          this.setData({
            isFavorite: type
          })
        }
      })
  },
  setFavorite() {
    this.favorite(1)
  },
  setUnFavorite() {
    this.favorite(0)
  },
  showShare() {
    wx.showShareMenu()
  },
  onShareAppMessage() {
    return {
      title: `这是 ${this.data.userInfo.UserBase.username} 的名片`
    }
  },
  onPullDownRefresh() {
    wx.showLoading({ title: '获取数据', mask: true })
    this.getUserData().then(() => {
      this.isFavorite()
      wx.hideLoading()
      wx.stopPullDownRefresh()
    })
  },
})