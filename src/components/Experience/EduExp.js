import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './EduExp.scss'

export default class EduExp extends Component {
  render() {
    return (
      <View className='c-eduExp'>
        <View className='u-school'>
          杭州电子科技大学
        </View>
        <View className='u-content'>
          学士 - 计算机科学与技术
        </View>
        <View className='u-date'>
          2018 年 8 月 - 至今
        </View>
      </View>
    )
  }
}