// pages/me/me.js
const utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    editBase: false,
    editJob: false,
    editEdu: false,
    dateLimit: "0000-00-00",
    degree: [
      "学士",
      // "第二学士",
      "硕士",
      "博士",
    ],
    JobModal: {
      checkbox: false
    },
    EduModal: {
      checkbox: false
    }
  },
  onLoad() {
    const now = new Date()
    const year = now.getFullYear()
    const month = ('00' + (now.getMonth() + 1)).slice(-2)
    this.setData({
      'dateLimit': `${year}-${month}-01`
    })
  },
  showEditBase() {
    this.setData({
      editBase: true,
    });
  },
  showEditJob() {
    this.setData({
      editJob: true,
    });
  },
  showEditEdu() {
    this.setData({
      editEdu: true,
    });
  },
  onEditBaseSubmit() {
    this.setData({
      editBase: false,
    })
  },
  jobCheckboxChange(val) {
    let data = false
    if (val.detail.value.length > 0) {
      data = true
    }
    this.setData({
      JobModal: {
        checkbox: data,
      }
    })
  },
  eduCheckboxChange(val) {
    let data = false
    if (val.detail.value.length > 0) {
      data = true
    }
    this.setData({
      EduModal: {
        checkbox: data,
      }
    })
  },
  onEditJobSubmit() {
    console.log(this.data.JobModal)
    this.setData({
      editJob: false
    })
  },
  chooseHeaderImage() {
    wx.chooseImage({
      count: 1,
      sizeType: 'compressed',
      success: (res) => {
        console.log(res)
      }
    })
  },
  chooseCardImage() {
    wx.chooseImage({
      count: 1,
      sizeType: 'compressed',
      success: (res) => {
        const tempFilePath = res.tempFilePaths[0]
        wx.navigateTo({
          url: `/pages/uploadCard/uploadCard?path=${encodeURIComponent(tempFilePath)}`
        })
      }
    })
  }
})