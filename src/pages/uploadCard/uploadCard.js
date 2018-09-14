import Taro, { Component } from '@tarojs/taro'
import { View, Canvas } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import WeCropper from '../../utils//we-cropper.min.js'
import api from '../../api'
import { getMyInfo } from '../../actions/user'
import './index.scss'

@connect(({ user }) => ({
  user
}), (dispatch) => ({
  getMyInfo() {
    dispatch(getMyInfo())
  }
}))
class Search extends Component {

  constructor() {
    this.device = Taro.getSystemInfoSync() 
    this.width = this.device.windowWidth 
    this.height = this.device.windowHeight - 75;

    this.state = {
      cropperOpt: {
        id: 'cropper',
        width: this.width,  // 画布宽度
        height: this.height, // 画布高度
        scale: 2.5, // 最大缩放倍数
        zoom: 8, // 缩放系数
        cut: {
          x: (this.width - 355) / 2, // 裁剪框x轴起点
          y: (this.height - 110) / 2, // 裁剪框y轴期起点
          width: 355, // 裁剪框宽度
          height: 110 // 裁剪框高度
        }
      }
    }
  }

  componentDidMount() {
    const { cropperOpt } = this.state
    const src = decodeURIComponent(this.$router.params.path)
    this.wecropper = new WeCropper({
      ...cropperOpt,
      src,
    })
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  touchStart(e) {
    this.wecropper.touchStart(e)
  }

  touchMove(e) {
    this.wecropper.touchMove(e)
  }

  touchEnd(e) {
    this.wecropper.touchEnd(e)
  }

  upload() {
    console.log(1)
    this.wecropper.getCropperImage(async (src) => {
      if (src) {
        Taro.showLoading({ title: '上传中', mask: true })
        const res = await api.uploadCard(src)
            Taro.hideLoading()
        const data = JSON.parse(res.data)
        switch (data.code) {
          case 200:
            Taro.showToast({title: '设置成功', mask: true})
            this.props.getMyInfo()
            setTimeout(() => {
              Taro.navigateBack()
            }, 600);
            break
          case 504:
            Taro.showToast({ title: '图片太大, 请更换', icon: 'none' })
            break
          default:
            Taro.showToast({ title: '上传失败, 请检查', icon: 'none' })
            break
        }
      } else {
        console.log('获取图片地址失败，请稍后重试')
      }
    })
  }

  render () {
    return (
      <View className='p-upload'>
        <View className='m-cropper'>
          <Canvas
            className='cropper'
            disableScroll='true'
            onTouchstart={this.touchStart.bind(this)}
            onTouchmove={this.touchMove.bind(this)}
            onTouchend={this.touchEnd.bind(this)}
            style={{width: `${this.width}px`, height:`${this.height}px`, backgroundColor: 'rgba(0, 0, 0, 0.8)'}}
            canvasId='cropper'
          />
        </View>
        <View className='cropper-buttons'>
          <View
            className='getCropperImage'
            onClick={this.upload.bind(this)}
          >
            确认裁剪
          </View>
        </View>
      </View>
    )
  }
}

export default Search
