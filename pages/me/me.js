// pages/me/me.js
const utils = require('../../utils/util.js');
const api = require('../../api/index.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logined: false,
    editBase: false,
    editJob: false,
    editEdu: false,
    dateLimit: "0000-00-00",
    userInfo: {
      id: 0,
      userType: 0,
      UserBase: {

      },
      WorkExps: [],
      EduExps: [],
    },
    degree: [
      "学士",
      "硕士",
      "博士",
    ],
    editBaseModal: {
      username: '',
      company: '',
      job: '',
      desc: '',
    },
    editJobModal: {
      id: -1,
      company: '',
      job: '',
      startTime: '',
      endTime: '',
      checkbox: false
    },
    editEduModal: {
      school: '',
      major: '',
      degree: '',
      startTime: '',
      endTime: '',
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
    this.launch()
  },
  launch() {
    wx.getStorage({
      key: 'session',
      success: () => {
        this.getUserInfo();
      },
      fail: () => {
        this.setData({
          logined: false
        })
      }
    })
  },
  showEditBase() {
    const userBase = this.data.userInfo.UserBase
    this.setData({
      editBase: true,
      editBaseModal: {
        username: userBase.username || '',
        company: userBase.company || '',
        job: userBase.job || '',
        desc: userBase.desc || '',
      }
    });
  },
  showEditJob(e) {
    const index = e.target.dataset.id
    const job = this.data.userInfo.WorkExps[index]
    this.setData({
      editJob: true,
      editJobModal: {
        ...job,
        startTime: job.startTime.replace(/\s|月/g, '').replace('年', '-'),
        endTime: job.endTime.replace(/\s|月/g, '').replace('年', '-'),
        checkbox: job.endTime === '至今'
      }
    });
  },
  showAddJob() {
    this.setData({
      editJob: true,
      editJobModal: {
        id: -1,
        company: '',
        job: '',
        startTime: '',
        endTime: '',
        checkbox: false
      }
    });
  },
  showEditEdu() {
    this.setData({
      editEdu: true,
    });
  },
  jobCheckboxChange(val) {
    let data = false
    if (val.detail.value.length > 0) {
      data = true
    }
    this.setData({
      editJobModal: {
        ...this.data.editJobModal,
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
      editEduModal: {
        ...this.data.editEduModal,
        checkbox: data,
      }
    })
  },
  onEditBaseSubmit(e) {
    wx.showLoading({title: '提交中', mask: true })
    api.editUserBase({
      ...this.data.editBaseModal,
      id: this.data.userInfo.id
    }).then(res => {
      wx.hideLoading()
      if (res.data.code === 200) {
        wx.showToast({ title: '修改成功', icon: 'success' })
        this.setData({
          'userInfo.UserBase': {
            ...this.data.userInfo.UserBase,
            ...this.data.editBaseModal,
          }
        })
      } else {
        wx.showToast({ title: '修改失败, 请检查', icon: 'none' })
      }
      this.setData({
        editBase: false,
      })
    })
  },
  onEditJobSubmit() {
    wx.showLoading({ title: '提交中', mask: true })
    api.editJob(this.data.editJobModal)
      .then(res => {
        wx.hideLoading()
        if (res.data.code === 200) {
          wx.showToast({ title: '修改成功', icon: 'success' })
          this.getUserInfo()
        } else {
          wx.showToast({ title: '修改失败, 请检查', icon: 'none' })
        }
        this.setData({
          editJob: false
        })
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
  },
  login() {
    wx.showLoading({
      title: "正在登录",
      mask: true,
    })
    wx.login({
      success: (res) => {
        const code = res.code
        api.login(code).then(res => {
          const session = res.data.content;
          wx.setStorageSync('session', session);
          this.getUserInfo();
        }).catch(() => {
          wx.hideLoading()
        })
      }
    })
  },
  getUserInfo() {
    wx.showLoading({
      title: '获取数据',
      mask: true,
    })
    api.getMyInfo().then(res => {
      wx.hideLoading()
      const code = res.data.code
      switch (code) {
        case 200:
          this.setData({
            userInfo: res.data.content,
            logined: true,
          })
          break;
        case 401:
          this.setData({
            logined: false,
          })
          break;
      }
    }).catch(() => {
      wx.hideLoading()
    })
  },
  inputValueChange(e) {
    const targetKey = e.target.dataset.set
    const value = e.detail.value
    this.setData({
      [targetKey]: value
    })
  }
})