import Taro, { Component } from '@tarojs/taro'
import { View, Navigator, Text } from '@tarojs/components'
import Card from './Card.js'
import { SmallHeader } from '../UserHeader'
import './UserCard.scss'

export default class UserCard extends Component {

  static defaultProps = {
    animate: false,
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

    let animateStyle = ''
    if (!!this.props.animate) {
      const delay = +this.props.delay || 0
      animateStyle = {
        animation: 'rightIn .4s',
        animationFillMode: 'both',
        animationDelay: delay / 10 + 's'
      }
    }

    return (
      <Navigator
        url={`/pages/user/user?id=${userId}`} 
        className='c-user-card'
        style={animateStyle}
        hoverClass='user-card-hover'
        hoverStartTime='0'
        hoverStayTime='0'
      >
        <Card imagePath={card}>
          <View className='u-content'>
            <SmallHeader className='u-header' headerPath={header}  />
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