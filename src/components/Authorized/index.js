import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import NoLogin from '../NoLogin'

@connect(({ user }) => ({
  isLogin: user.isLogin
}))
export default class Authorized extends Component {

  static defaultProps = {
    isLogin: false
  }

  render() {
    return (
      <View className='c-authorized'>
      {
        !!this.props.isLogin ? 
          this.props.children : 
          <NoLogin />
      }
      </View>
    )
  }
}