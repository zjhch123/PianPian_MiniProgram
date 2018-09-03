import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { isLogin, isNotLogin, getMyInfo } from '../../actions/user'
import api from '../../api'

import './index.scss'

@connect(({ user }) => ({
  user
}), (dispatch) => ({
  isLogin() {
    dispatch(isLogin())
    dispatch(getMyInfo())
  },
  isNotLogin() {
    dispatch(isNotLogin())
  }
}))
export default class NoLogin extends Component {

  async getUserInfo() {
    const result = await Taro.login()
    const code = result.code
    const sessionObject = await api.login(code)
    const session = sessionObject.data.content
    await Taro.setStorage({ key: 'session', data: session })
    this.props.isLogin()
  }

  render() {
    return (
      <View className='c-noLogin'>
        <Text className='u-tlt'>您还未登录, 立即登录查看更多信息</Text>
        <Button 
          size='mini'
          className='u-login-btn'
          type='primary' 
          onClick={this.getUserInfo.bind(this)}
        >登录</Button>
      </View>
    )
  }
}