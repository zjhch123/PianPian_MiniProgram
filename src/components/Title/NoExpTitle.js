import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './NoExpTitle.scss'

export default class LightTitle extends Component {
  
  static defaultProps = {
    text: ''
  }

  render() {
    const text = this.props.text
    return (
      <View className='c-noExpTitle'>
        <Text className='u-no-exp'>{text}</Text>
      </View>
    )
  }
}