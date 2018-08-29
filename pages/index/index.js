//index.js
const api = require('../../api/index.js')
Page({
  data: {
    persons: [],
    page: 1,
    totalPage: 1,
    noLogin: false,
  },
  onLoad() {
    this.launch()
  },
  onShow() {
    const needRefresh = wx.getStorageSync('needRefresh')
    if (needRefresh) {
      this.launch()
      wx.removeStorageSync('needRefresh')
    }
  },
  launch() {
    return this.getData(1, true)
  },
  login() {
    wx.setStorageSync('needRefresh', '1')
    wx.showLoading({ title: "正在登录", mask: true })
    wx.login({
      success: (res) => {
        const code = res.code
        api.login(code).then(res => {
          wx.hideLoading()
          if (res.data.code !== 200) { return }
          const session = res.data.content;
          wx.setStorageSync('session', session);
          this.launch();
        }).catch(() => {
          wx.hideLoading()
        })
      }
    })
  },
  getData(page, empty = false) {
    return api.getFavorite(page)
      .then(res => res.data)
      .then(res => {
        if (res.code === 401) {
          this.setData({ noLogin: true })
          return
        }
        this.setData({
          noLogin: false,
          persons: empty ? res.content.list : this.data.persons.concat(res.content.list),
          totalPage: res.content.totalPage,
          page,
        })
      })
  },
  onPullDownRefresh() {
    wx.showLoading({ title: '获取数据', mask: true })
    this.launch().then(() => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
    })
  },
  onReachBottom() {
    if (this.data.page === this.data.totalPage) { return }
    const nextPage = this.data.page + 1
    this.getData(nextPage)
  }
});
