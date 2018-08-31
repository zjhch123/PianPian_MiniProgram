import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './WorkExp.scss'

export default class WorkExp extends Component {
  render() {
    return (
      <View className='c-workExp'>
        <View className='u-company'>
          网易杭州科技有限公司
        </View>
        <View className='u-job'>
          前端开发工程师
        </View>
        <View className='u-date'>
          2018 年 8 月 - 至今
        </View>
      </View>
    )
  }
}