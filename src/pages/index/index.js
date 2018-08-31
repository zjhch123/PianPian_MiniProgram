import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { Title } from '../../components/Title'
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
      <View className='p-index g-padding-container'>
        <Title text='收藏' />
        <View className='m-list'>
          {
            [1,2,3,4,5].map(i => <UserCard key={i} />)
          }
        </View>
      </View>
    )
  }
}

export default Index
