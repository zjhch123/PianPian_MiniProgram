import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './SubTitle.scss'

export default class SubTitle extends Component {
  
  static defaultProps = {
    text: ''
  }

  render() {
    const text = this.props.text
    return (
      <View className='c-subTlt'>
        <Text className='u-tlt'>{text}</Text>
      </View>
    )
  }
}