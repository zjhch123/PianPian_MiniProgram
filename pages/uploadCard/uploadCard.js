import WeCropper from '../../we-cropper/we-cropper.min.js'
const api = require('../../api/index.js');


const device = wx.getSystemInfoSync() 
const width = device.windowWidth 
const height = device.windowHeight

Page({

  data: {
    cropperOpt: {
      id: 'cropper',
      width,  // 画布宽度
      height, // 画布高度
      scale: 2.5, // 最大缩放倍数
      zoom: 10, // 缩放系数
      cut: {
        x: (width - 355) / 2, // 裁剪框x轴起点
        y: (height - 110) / 2, // 裁剪框y轴期起点
        width: 355, // 裁剪框宽度
        height: 110 // 裁剪框高度
      }
    }
  },
  onLoad: function (options) {
    const { cropperOpt } = this.data
    const src = decodeURIComponent(options.path)
    new WeCropper({
      ...cropperOpt,
      src,
    })
  },
  touchStart(e) {
    this.wecropper.touchStart(e)
  },
  touchMove(e) {
    this.wecropper.touchMove(e)
  },
  touchEnd(e) {
    this.wecropper.touchEnd(e)
  },
  throttle (delay, action) {
    let last = 0
    return (e) => {
      let curr = +new Date()
      if (curr - last > delay) {
        action(e)
        last = curr
      }
    }
  },
  getCropperImage() {
    this.wecropper.getCropperImage((src) => {
      if (src) {
        wx.showLoading({ title: '上传中', mask: true })
        api.uploadCard(src)
          .then(res => {
            wx.hideLoading()
            return JSON.parse(res.data)
          })
          .then(res => {
            switch (res.code) {
              case 200:
                wx.showToast({title: '设置成功', mask: true})
                wx.setStorageSync('needRefresh', '1')
                setTimeout(() => {
                  wx.navigateBack()
                }, 600);
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
      } else {
        console.log('获取图片地址失败，请稍后重试')
      }
    })
  }
})