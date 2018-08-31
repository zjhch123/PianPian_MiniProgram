import Taro, { Component } from '@tarojs/taro'
import { View, Navigator, Text } from '@tarojs/components'
import Card from './Card.js'
import { SmallHeader } from '../UserHeader'
import './UserCard.scss'

export default class UserCard extends Component {

  render() {
    const imagePath = this.props.imagePath
    return (
      <Navigator url='/pages/user/user?id=1' className='c-user-card'>
        <Card imagePath={imagePath} />
        <View className='u-content'>
          <SmallHeader className='u-header' />
          <View className='u-info'>
            <Text className='name'>张佳皓</Text>
            <Text className='job'>张佳皓</Text>
            <Text className='company'>张佳皓</Text>
          </View>
        </View>
      </Navigator>
    )
  }
}