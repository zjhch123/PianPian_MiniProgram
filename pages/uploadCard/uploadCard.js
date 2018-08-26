import WeCropper from '../../we-cropper/we-cropper.min.js'

const device = wx.getSystemInfoSync() // 获取设备信息
const width = device.windowWidth // 示例为一个与屏幕等宽的正方形裁剪框
const height = device.windowHeight

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cropperOpt: {
      id: 'cropper',
      width,  // 画布宽度
      height, // 画布高度
      scale: 2.5, // 最大缩放倍数
      zoom: 8, // 缩放系数
      cut: {
        x: 0, // 裁剪框x轴起点
        y: (height - 220) / 2, // 裁剪框y轴期起点
        width: width, // 裁剪框宽度
        height: (width / 3.22) // 裁剪框高度
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
    console.log(src)
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
  getCropperImage() {
    this.wecropper.getCropperImage((src) => {
      if (src) {
        wx.previewImage({
          current: '', // 当前显示图片的http链接
          urls: [src] // 需要预览的图片http链接列表
        })
      } else {
        console.log('获取图片地址失败，请稍后重试')
      }
    })
  }
})