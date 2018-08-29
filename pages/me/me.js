// pages/me/me.js
const utils = require('../../utils/util.js');
const api = require('../../api/index.js');
Page({

  data: {
    logined: false,
    editBase: false,
    editWorkExp: false,
    editEduExp: false,
    dateLimit: "0000-00-00",
    host: utils.HOST,
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
    editWorkExpModal: {
      id: -1,
      company: '',
      job: '',
      startTime: '',
      endTime: '',
      checkbox: false
    },
    editEduExpModal: {
      id: -1,
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
  onShow() {
    const needRefresh = wx.getStorageSync('needRefresh')
    if (needRefresh) {
      this.launch()
      wx.removeStorageSync('needRefresh')
    }
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
  chooseHeaderImage() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      success: (file) => {
        wx.showLoading({ title: '上传中...', mask: true })
        api.uploadHeader(file.tempFilePaths[0])
          .then(res => {
            wx.hideLoading()
            return JSON.parse(res.data)
          })
          .then(res => {
            switch (res.code) {
              case 200:
                this.setData({
                  'userInfo.UserBase.header': res.content
                })
                break
              case 504:
                wx.showToast({ title: '图片太大, 请更换', icon: 'none' })
                break
              default:
                wx.showToast({ title: '上传失败, 请检查', icon: 'none' })
                break
            }
          })
          .catch(e => {
            wx.hideLoading()
            wx.showToast({ title: '上传失败, 请检查', icon: 'none' })
          })
      }
    })
  },
  chooseCardImage() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      success: (res) => {
        const tempFilePath = res.tempFilePaths[0]
        wx.navigateTo({
          url: `/pages/uploadCard/uploadCard?path=${encodeURIComponent(tempFilePath)}`
        })
      }
    })
  },
  login() {
    wx.setStorageSync('needRefresh', '1')
    wx.showLoading({ title: "正在登录", mask: true })
    wx.login({
      success: (res) => {
        const code = res.code
        api.login(code).then(res => {
          wx.hideLoading()
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
    wx.showLoading({ title: '获取数据', mask: true })
    return api.getMyInfo().then(res => {
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
      this.setData({
        logined: false
      })
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
  showEditWorkExp(e) {
    const index = e.target.dataset.id
    const workExp = this.data.userInfo.WorkExps[index]
    this.setData({
      editWorkExp: true,
      editWorkExpModal: {
        ...workExp,
        startTime: workExp.startTime.replace(/\s|月/g, '').replace('年', '-'),
        endTime: workExp.endTime.replace(/\s|月/g, '').replace('年', '-'),
        checkbox: workExp.endTime === '至今'
      }
    });
  },
  showAddWorkExp() {
    this.setData({
      editWorkExp: true,
      editWorkExpModal: {
        id: -1,
        company: '',
        job: '',
        startTime: '',
        endTime: '',
        checkbox: false
      }
    });
  },
  showEditEduExp(e) {
    const index = e.target.dataset.id
    const eduExp = this.data.userInfo.EduExps[index]
    this.setData({
      editEduExp: true,
      editEduExpModal: {
        ...eduExp,
        startTime: eduExp.startTime.replace(/\s|月/g, '').replace('年', '-'),
        endTime: eduExp.endTime.replace(/\s|月/g, '').replace('年', '-'),
        checkbox: eduExp.endTime === '至今'
      }
    });
  },
  showAddEduExp() {
    this.setData({
      editEduExp: true,
      editEduExpModal: {
        id: -1,
        school: '',
        major: '',
        degree: '',
        startTime: '',
        endTime: '',
        checkbox: false
      }
    });
  },
  workExpModalCheckboxChange(val) {
    let data = false
    if (val.detail.value.length > 0) {
      data = true
    }
    this.setData({
      editWorkExpModal: {
        ...this.data.editWorkExpModal,
        checkbox: data,
      }
    })
  },
  eduExpCheckboxChange(val) {
    let data = false
    if (val.detail.value.length > 0) {
      data = true
    }
    this.setData({
      editEduExpModal: {
        ...this.data.editEduExpModal,
        checkbox: data,
      }
    })
  },
  deleteExp(expType) {
    expType = expType[0].toUpperCase() + expType.slice(1)
    const modalName = `edit${expType}Exp`
    const apiName = `delete${expType}Exp`
    const deleteId = this.data[`edit${expType}ExpModal`].id
    wx.showLoading({ title: '删除中', mask: true })
    api[apiName](deleteId)
      .then(res => {
        wx.hideLoading()
        if (res.data.code === 200) {
          wx.showToast({ title: '删除成功', icon: 'success' })
          this.getUserInfo()
        } else {
          wx.showToast({ title: '删除失败, 请检查', icon: 'none' })
        }
        this.setData({
          [modalName]: false
        })
      }).catch(() => {
        wx.showToast({ title: '删除失败, 请检查', icon: 'none' })
      })
  },
  editExp(expType) {
    expType = expType[0].toUpperCase() + expType.slice(1)
    const modalName = `edit${expType}Exp`
    const apiName = `edit${expType}Exp`
    const editExp = this.data[`edit${expType}ExpModal`]
    wx.showLoading({ title: '提交中', mask: true })
    api[apiName](editExp).then((res) => {
      wx.hideLoading()
      if (res.data.code === 200) {
        wx.showToast({ title: '操作成功', icon: 'success' })
        this.getUserInfo()
      } else {
        wx.showToast({ title: '操作失败, 请检查', icon: 'none' })
      }
      this.setData({
        [modalName]: false
      })
    }).catch(() => {
      wx.showToast({ title: '操作失败, 请检查', icon: 'none' })
    })
  },
  onEditBaseSubmit() {
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
    }).catch(() => {
      wx.showToast({ title: '修改失败, 请检查', icon: 'none' })
    })
  },
  onEditWorkExpSubmit() {
    this.editExp('Work')
  },
  deleteWorkExp() {
    this.deleteExp('Work')
  },
  onEditEduExpSubmit() {
    this.editExp('Edu')
  },
  deleteEduExp() {
    this.deleteExp('Edu')
  },

  onPullDownRefresh() {
    this.getUserInfo().then(() => {
      wx.stopPullDownRefresh()
    })
  },
  inputValueChange(e) {
    const targetKey = e.target.dataset.set
    const value = e.detail.value
    this.setData({
      [targetKey]: value
    })
  },
  degreeValueChange(e) {
    const targetKey = e.target.dataset.set
    const value = e.detail.value
    this.setData({
      [targetKey]: this.data.degree[value]
    })
  }
})