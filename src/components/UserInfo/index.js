import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

export default class UserInfo extends Component {
  
  render() {
    return (
      <View className='c-userInfo'>
        <Text className='u-name'>张佳皓</Text>
        <Text className='u-company'>网易杭州科技有限公司</Text>
        <Text className='u-job'>前端开发工程师</Text>
        <Text className='u-desc'>每天叫醒自己的不是闹钟, 而是梦想。</Text>
      </View>
    )
  }
}