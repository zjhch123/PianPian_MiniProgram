import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

export default class TabNav extends Component {
  
  constructor() {
    this.state = {
      isIPX: false,
    }
    this.bottom = '68rpx'
  }

  componentDidMount() {
    Taro.getSystemInfo({
      success: (res) => {
        const model = res.model
        if (/iphone x/i.test(model)) {
          this.setState({
            isIPX: true
          })
        }
      }
    })
  }

  goHome() {
    Taro.reLaunch({
      url: '/pages/index/index'
    })
  }

  render() {
    const isIPX = this.state.isIPX
    return (
      <View className='c-tabNav' style={{paddingBottom: isIPX ? this.bottom : 0}}>
        <View className='m-tabNav' onClick={this.goHome.bind(this)} style={{paddingBottom: isIPX ? this.bottom : 0}}>
          <Text className='u-text'>进入片片小程序 &gt;</Text>
        </View>
      </View>
    )
  }
}