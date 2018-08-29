// pages/search/search.js

const api = require('../../api/index.js')

Page({
  data: {
    persons: [
    ],
    q: '',
    page: 1,
    totalPage: 1,
  },

  onLoad: function (options) {
    this.getData()
  },
  getData() {
    return api.getRecommend()
      .then(res => res.data)
      .then(res => {
        if (res.code === 200) {
          this.setData({
            persons: res.content.list,
            page: 1,
            totalPage:  1,
            q: '',
          })
        }
      })
  },
  confirmHandler(e) {
    const condition = e.detail.value
    this.setData({
      page: 1,
      totalPage: 1,
      persons: [],
      q: condition
    })
    if (condition.trim() === '') {
      this.getData()
      return
    }
    this.search(condition, 1);
  },
  search(condition, page) {
    api.search(condition, page)
      .then(res => res.data)
      .then(res => {
        if (res.code !== 200) { return }
        const list = res.content.list
        const totalPage = res.content.totalPage
        this.setData({
          persons: this.data.persons.concat(list),
          totalPage,
          page,
        })
      })
  },
  onShareAppMessage: function () {
  
  },
  onPullDownRefresh() {
    wx.showLoading({ title: '获取数据', mask: true })
    this.getData().then(() => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
    })
  },
  onReachBottom() {
    if (this.data.q === '') { return }
    if (this.data.page === this.data.totalPage) { return }
    const condition = this.data.q
    const nextPage = this.data.page + 1
    this.search(condition, nextPage)
  }
})