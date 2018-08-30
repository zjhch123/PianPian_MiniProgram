import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import { UserCard } from '../../components/Card'

import './index.scss'

class Index extends Component {

  config = {
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <UserCard />
      </View>
    )
  }
}

export default Index
