import Taro, { Component } from '@tarojs/taro'
import { View, Navigator, Text } from '@tarojs/components'
import Card from './Card.js'
import { SmallHeader } from '../UserHeader'
import './UserCard.scss'

export default class UserCard extends Component {

  static defaultProps = {
    user: {
      username: '新用户',
      job: '',
      company: '',
    }
  }

  render() {
    const {
      userId,
      username,
      job,
      company,
      header,
      card
    } = this.props.user
    return (
      <Navigator 
        url={`/pages/user/user?id=${userId}`} 
        className='c-user-card'
        hoverClass='user-card-hover'
        hoverStartTime='0'
        hoverStayTime='0'
      >
        <Card imagePath={card}>
          <View className='u-content'>
            <SmallHeader className='u-header' headerPath={header} />
            <View className='u-info'>
              <Text className='name'>{username || '新用户'}</Text>
              <Text className='job'>{job || ''}</Text>
              <Text className='company'>{company || ''}</Text>
            </View>
          </View>
        </Card>
      </Navigator>
    )
  }
}